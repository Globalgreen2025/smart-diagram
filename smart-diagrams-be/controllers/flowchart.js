const asyncHandler = require("express-async-handler");
const FlowChart = require("../models/flowchart");
const axios = require("axios");
require("dotenv").config();

// Function to transcribe audio using an external Whisper API
const transcribeAudio = async (audioBuffer, huggingToken) => {
  try {
    // Sending the audio buffer to the API for transcription
    const response = await axios.post(
      process.env.WHISPER_API_URL,
      audioBuffer,
      {
        headers: {
          Authorization: `Bearer ${huggingToken}`,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    // Return transcribed text if request is successful
    if (response.status === 200) {
      return response.data.text || "Transcription not available.";
    } else {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error transcribing audio:", error.message);
    throw error;
  }
};

const cleanMermaidChart = (apiResponse) => {
  console.log("Input to cleanMermaidChart:", apiResponse);

  if (!apiResponse) {
    console.log("No API response received");
    return "No valid MermaidJS chart found.";
  }

  let chart = apiResponse;

  // If it's an object, try to extract text
  if (typeof apiResponse === "object") {
    chart = JSON.stringify(apiResponse);
  }

  console.log("Chart before extraction:", chart);

  // Try to extract mermaid code from various patterns
  const mermaidPattern = /```mermaid\s*([\s\S]*?)\s*```/;
  const codePattern = /```(?:\w+)?\s*([\s\S]*?)\s*```/;

  let match = chart.match(mermaidPattern) || chart.match(codePattern);

  if (match && match[1]) {
    const cleaned = match[1].trim();
    console.log("Extracted Mermaid chart:", cleaned);
    return cleaned;
  }

  // If no code blocks found, check if it contains mermaid syntax
  if (
    chart.includes("graph") ||
    chart.includes("flowchart") ||
    chart.includes("-->") ||
    chart.includes("subgraph")
  ) {
    console.log("Found Mermaid syntax in response");
    return chart.trim();
  }

  console.log("No Mermaid chart found in response");
  return "No valid MermaidJS chart found.";
};

const handleCreateFlowChart = asyncHandler(async (req, res) => {
  try {
    const { title, selectInputMethod, aiModel, textOrMermaid, mermaidFile } =
      req.body;

    const user_id = req.user._id;
    let file = null;
    let textData = "";

    // Check if files were uploaded
    if (req.files && req.files.file && req.files.file[0]) {
      file = req.files.file[0];
    }

    // Determine input source (your existing code)
    if (textOrMermaid) {
      textData = textOrMermaid;
    } else if (file) {
      if (file.mimetype.startsWith("audio/")) {
        textData = await transcribeAudio(
          file.buffer,
          process.env.SMART_DIAGRAMS_API_KEY
        );
      } else if (
        file.mimetype.startsWith("text/") ||
        file.mimetype === "application/octet-stream" ||
        file.mimetype.startsWith("image/")
      ) {
        textData = file.buffer.toString("utf-8");
        if (file.mimetype.startsWith("image/")) {
          textData = "Analyze this image for flowchart data.";
        }
      } else {
        return res.status(400).json({ message: "Unsupported file type." });
      }
    } else {
      return res.status(400).json({ message: "No input provided." });
    }

    // Use DeepSeek API instead of Hugging Face
    const deepSeekPayload = {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert at creating MermaidJS flowcharts. 
                     Return ONLY the MermaidJS code without any explanations, 
                     comments, or additional text. Use proper MermaidJS syntax 
                     with graph TD or flowchart TD. Include all major processes 
                     and decision points. Use subgraphs for different components. 
                     Make it detailed but clean and readable.`,
        },
        {
          role: "user",
          content: `Create a comprehensive MermaidJS flowchart based on: ${textData.substring(
            0,
            3000
          )}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 2000,
    };

    console.log("Sending to DeepSeek API...");

    // Call DeepSeek API
    const apiResponse = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      deepSeekPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.SMART_DIAGRAMS_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 45000,
      }
    );

    console.log("DeepSeek API Response status:", apiResponse.status);

    // Extract the generated text from DeepSeek response
    let generatedText = apiResponse.data.choices[0].message.content;
    console.log("Generated text from DeepSeek:", generatedText);

    // Clean and extract MermaidJS code
    const mermaidChart = cleanMermaidChart(generatedText);
    console.log("Final Mermaid chart:", mermaidChart);

    // Create and save flowchart (your existing code)
    const flowChart = new FlowChart({
      title,
      selectInputMethod,
      aiModel,
      textOrMermaid,
      mermaidFile,
      mermaidString: mermaidChart,
      user_id,
    });

    await flowChart.save();

    res.status(201).json({
      status: 201,
      message: "FlowChart created successfully",
      flowChart: flowChart,
    });
  } catch (error) {
    console.error("Error creating FlowChart:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to create FlowChart",
      error: error.message,
    });
  }
});

// Controller to fetch all FlowCharts for the logged-in user
const handleGetAllFlowCharts = asyncHandler(async (req, res) => {
  try {
    const flowCharts = await FlowChart.find({ user_id: req.user._id })
      .populate("user_id") // Populate user details
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      status: 200,
      message: "FlowCharts fetched successfully",
      data: flowCharts,
    });
  } catch (error) {
    console.error("Error fetching FlowCharts:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch FlowCharts",
      error: error.message,
    });
  }
});

// Controller to fetch a specific FlowChart by ID
const handleGetFlowChartById = asyncHandler(async (req, res) => {
  try {
    const flowChart = await FlowChart.findById(req.params.id).populate(
      "user_id"
    );

    if (!flowChart) {
      return res.status(404).json({
        status: 404,
        message: "FlowChart not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "FlowChart fetched successfully",
      data: flowChart,
    });
  } catch (error) {
    console.error("Error fetching FlowChart by ID:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch FlowChart",
      error: error.message,
    });
  }
});

// Controller to update a FlowChart by ID
const handleUpdateFlowChartById = asyncHandler(async (req, res) => {
  try {
    const { mermaidString } = req.body;

    if (!mermaidString) {
      return res.status(400).json({
        status: 400,
        message: "mermaidString field is required to update.",
      });
    }

    const flowChart = await FlowChart.findByIdAndUpdate(
      req.params.id,
      { mermaidString },
      { new: true }
    );

    if (!flowChart) {
      return res.status(404).json({
        status: 404,
        message: "FlowChart not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "FlowChart updated successfully",
      data: flowChart,
    });
  } catch (error) {
    console.error("Error updating FlowChart:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to update FlowChart",
      error: error.message,
    });
  }
});

// Controller to delete a FlowChart by ID
const handleDeleteFlowChartById = asyncHandler(async (req, res) => {
  try {
    const flowChart = await FlowChart.findByIdAndDelete(req.params.id);

    if (!flowChart) {
      return res.status(404).json({
        status: 404,
        message: "FlowChart not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "FlowChart deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting FlowChart:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to delete FlowChart",
      error: error.message,
    });
  }
});

module.exports = {
  handleCreateFlowChart,
  handleGetAllFlowCharts,
  handleGetFlowChartById,
  handleUpdateFlowChartById,
  handleDeleteFlowChartById,
};
