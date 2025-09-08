import { toBase64 } from "js-base64";
import { saveAs } from "file-saver";

// Function to format data as pretty JSON string
export const formatJSON = (data) => {
  return JSON.stringify(data, undefined, 2);
};

// Function to export SVG to either base64 or blob format
export const svgToExport = async (isSvg, contentType, dataType = "base64") => {
  return new Promise((resolve, reject) => {
    const svg = document.querySelector("#container svg");
    if (!svg) {
      return reject(new Error("SVG element not found"));
    }

    const box = svg.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = box.width;
    canvas.height = box.height;

    const context = canvas.getContext("2d");
    if (!context) {
      return reject(new Error("Canvas context could not be created"));
    }

    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const svgUrl = getBase64Svg(svg, canvas.width, canvas.height);
    if (isSvg) {
      resolve(svgUrl);
    } else {
      const image = new Image();
      image.addEventListener("load", () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (dataType === "base64") {
          const url = canvas.toDataURL(contentType);
          resolve(url);
        } else {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Blob creation failed"));
            }
          }, contentType);
        }
      });
      image.src = svgUrl;
    }
  });
};

// Function to get a base64 string of the SVG
export const getBase64Svg = (svg, width, height) => {
  if (height) svg.setAttribute("height", `${height}px`);
  if (width) svg.setAttribute("width", `${width}px`);

  const svgString = svg.outerHTML
    .replaceAll("<br>", "<br/>")
    .replaceAll(/<img([^>]*)>/g, (_, g) => `<img ${g} />`);

  return `data:image/svg+xml;base64,${toBase64(svgString)}`;
};

// Function to download the diagram as PNG
export const downloadImgAsPng = async () => {
  try {
    const pngUrl = await svgToExport(false);
    saveAs(pngUrl, "mermaid-diagram.png");
  } catch (error) {
    console.error("Failed to download PNG:", error);
  }
};

// Function to download the diagram as SVG
export const downloadImgAsSvg = async () => {
  try {
    const svgUrl = await svgToExport(true);
    saveAs(svgUrl, "mermaid-diagram.svg");
  } catch (error) {
    console.error("Failed to download SVG:", error);
  }
};

// Function to download JSON as a file
export const downloadJson = (json) => {
  const jsonUrl = `data:application/json;base64,${toBase64(json)}`;
  saveAs(jsonUrl, "mermaid-diagram.json");
};

// Function to import a JSON file
export const importJson = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const result = event.target.result;
            resolve(result);
          }
        };
        reader.onerror = () => {
          reject(new Error("File reading failed"));
        };
        reader.readAsText(file);
        fileInput.remove();
      } else {
        reject(new Error("No file selected"));
      }
    });

    fileInput.click();
  });
};

// Function to calculate time difference from a given date
export const calculateTimeDifference = (createdDate) => {
  const [day, month, year] = createdDate.split("/").map(Number);

  if (day && month && year) {
    const created = new Date(year, month - 1, day);
    const now = new Date();

    const differenceInMillis = now.getTime() - created.getTime();
    const differenceInDays = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return "created today";
    } else if (differenceInDays < 30) {
      return `created ${differenceInDays} day${differenceInDays > 1 || differenceInDays === 0 ? `s` : ``} ago `;
    } else if (differenceInDays < 365) {
      const months = Math.floor(differenceInDays / 30);
      return `created ${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(differenceInDays / 365);
      return `created ${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }
};

// Function to parse a mermaid string by removing extra quotes and escape characters
export const parseMermaidString = (input) => {
  if (input.startsWith('"') && input.endsWith('"')) {
    input = input.slice(1, -1);
  }

  const output = input.replace(/\\n/g, "\n");
  return output;
};
