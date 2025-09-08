// Importing dynamic component loading for client-side only rendering
import dynamic from "next/dynamic";

// Importing Material-UI components
import {
  Box,
  IconButton,
  Tooltip,
  Collapse,
  useTheme,
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Tabs,
  Menu,
  MenuItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// Importing icons
import { IoMdMove } from "react-icons/io";
import { MdTextFields } from "react-icons/md"; // Font size icon
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Collapse Icons
import FullScreen from "./FullScreen";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// React hooks and state management
import { useContext, useEffect, useState } from "react";
import { useStore } from "@/store";

// Additional icons
import AddIcon from "@mui/icons-material/Add";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";

// Importing themes
import { themes } from "@/layout/Sidebar";

// More icons and shapes for the editor
import InfoIcon from "@mui/icons-material/Info";
import Tab from "@mui/material/Tab";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";

// Importing shape assets
import Rectangle from "@/asset/editor/shapes/Rectangle.svg";
import Braces from "@/asset/editor/shapes/Braces.svg";
import Card from "@/asset/editor/shapes/Card.svg";
import Circle from "@/asset/editor/shapes/Circle.svg";
import Collate_Action from "@/asset/editor/shapes/Collate Action.svg";
import Comment_Right from "@/asset/editor/shapes/Comment Right.svg";
import Comment from "@/asset/editor/shapes/Comment.svg";
import Cylinder from "@/asset/editor/shapes/Cylinder.svg";
import Database from "@/asset/editor/shapes/Database.svg";
import Decision from "@/asset/editor/shapes/Decision.svg";
import Delay from "@/asset/editor/shapes/Delay.svg";
import Diamond from "@/asset/editor/shapes/Diamond.svg";
import Direct_Access_Storage from "@/asset/editor/shapes/Direct Access Storage.svg";
import Disk_Storage from "@/asset/editor/shapes/Disk Storage.svg";
import Display from "@/asset/editor/shapes/Display.svg";
import Divied_Process from "@/asset/editor/shapes/Divied Process.svg";
import Document from "@/asset/editor/shapes/Document.svg";
import Dubble_Circle from "@/asset/editor/shapes/Dubble Circle.svg";
import Event from "@/asset/editor/shapes/Event.svg";
import Extractions_Process from "@/asset/editor/shapes/Extractions Process.svg";
import Filled_Circles from "@/asset/editor/shapes/Filled Circles.svg";
import Fork_Join from "@/asset/editor/shapes/Fork-Join.svg";
import Framed_Circle from "@/asset/editor/shapes/Framed Circle.svg";
import Hexazone from "@/asset/editor/shapes/Hexazone.svg";
import Horizontal_Cylinder from "@/asset/editor/shapes/Horizontal Cylinder.svg";
import In_Out from "@/asset/editor/shapes/In Out.svg";
import Internal_Storage from "@/asset/editor/shapes/Internal Storage.svg";
import Junction from "@/asset/editor/shapes/Junction.svg";
import Lined_Document from "@/asset/editor/shapes/Lined Document.svg";
import Lined_Process from "@/asset/editor/shapes/Lined Process.svg";
import Loop_Limit from "@/asset/editor/shapes/Loop Limit.svg";
import Manual_File_Action from "@/asset/editor/shapes/Manual File Action.svg";
import Manual_Input from "@/asset/editor/shapes/Manual Input.svg";
import Multi_Process from "@/asset/editor/shapes/Multi Process.svg";
import Multiple_Document from "@/asset/editor/shapes/Multiple Document.svg";
import Odd from "@/asset/editor/shapes/Odd.svg";
import Out_In from "@/asset/editor/shapes/Out In.svg";
import Parallelogram_Reversed from "@/asset/editor/shapes/Parallelogram Reversed.svg";
import Parallelogram from "@/asset/editor/shapes/parallelogram.svg";
import Priority_Action from "@/asset/editor/shapes/Priority Action.svg";
import Rounded from "@/asset/editor/shapes/Rounded.svg";
import Small_Circle from "@/asset/editor/shapes/Small Circle.svg";
import Stadium from "@/asset/editor/shapes/Stadium.svg";
import Standard_Process from "@/asset/editor/shapes/Standard Process.svg";
import Start from "@/asset/editor/shapes/Start.svg";
import Stop from "@/asset/editor/shapes/Stop.svg";
import Stored_Data from "@/asset/editor/shapes/Stored Data.svg";
import Sub_Process from "@/asset/editor/shapes/Sub Process.svg";
import Summary from "@/asset/editor/shapes/Summary.svg";
import Tagged_Document from "@/asset/editor/shapes/Tagged Document.svg";
import Tagged_Process from "@/asset/editor/shapes/Tagged Process.svg";
import Terminal from "@/asset/editor/shapes/Terminal.svg";
import Text_Block from "@/asset/editor/shapes/Text Block.svg";
import Trapezoid_Reversed from "@/asset/editor/shapes/Trapezoid Reversed.svg";
import Trapezoid from "@/asset/editor/shapes/Trapezoid.svg";
import Triangle from "@/asset/editor/shapes/Triangle.svg";
import Anchor from "@/asset/editor/shapes/Anchor.svg";
import Paper_Tape from "@/asset/editor/shapes/Paper Tape.svg";
import Communication_Link from "@/asset/editor/shapes/Communication Link.svg";

// Context for shared state
import { ChartContext } from "@/app/layout";
import NodeAdder from "./NodeAdder";

// Dynamically import View component (client-side only)
const View = dynamic(() => import("./View"), { ssr: false });

// Initial form values
const initialValue = {
  heading: "This is sample label",
  image: "https://static.mermaidchart.dev/whiteboard/default-image-shape.svg",
  width: 200,
  height: 200,
  id: null, // Added to track which element is being edited
  type: null, // Added to track element type
};

const RightContainer = () => {
  // State hooks for managing UI and data
  const [form, setForm] = useState(initialValue);
  const panZoom = useStore.use.panZoom();
  const setPanZoomEnable = useStore.use.setPanZoomEnable();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElImage, setAnchorElImage] = useState(null);
  const [fontSize, setFontSize] = useState("MD");
  const [expanded, setExpanded] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const open = Boolean(anchorEl);
  const [openImageModel, setOpenImageModel] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const setCode = useStore((state) => state.setCode);
  const code = useStore((state) => state.code);
  const [count, setCount] = useState(0);
  const [countShape, setCountShape] = useState(0);
  const [themeAnchor, setThemeAnchor] = useState(null);
  const [countRocket, setCountRocket] = useState(0);
  const [countImage, setCountImage] = useState(0);
  const [oldCode, setOldCode] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null); // Track selected element

  useEffect(() => {
    const handleElementClick = (event) => {
      const target = event.target;
      const element = target.closest(".node, .shape, .image-shape");

      if (!element) return;

      // Prevent multiple event registrations
      if (element.hasAttribute("data-editable")) return;
      element.setAttribute("data-editable", "true");

      const id = element.id ? element.id.split("-")[1] : null;
      if (!id) return;

      // Find label text
      let labelText = "";
      const labelElement = element.querySelector(".nodeLabel, .label");
      if (labelElement) {
        labelText = labelElement.textContent || "";
      }

      // Find image properties
      let imgSrc = "";
      let imgWidth = "";
      let imgHeight = "";
      const imageElement = element.querySelector("image");
      if (imageElement) {
        imgSrc =
          imageElement.getAttribute("href") ||
          imageElement.getAttribute("xlink:href") ||
          "";
        imgWidth = imageElement.getAttribute("width") || "";
        imgHeight = imageElement.getAttribute("height") || "";
      }

      // Determine element type
      let elementType = "node";
      if (element.classList.contains("shape")) elementType = "shape";
      if (element.classList.contains("image-shape")) elementType = "image";

      // Create the current code representation
      let currentCode = "";
      if (elementType === "image") {
        currentCode = `${id}[${labelText}]\n${id}@{img: ${imgSrc}, h: ${imgHeight}, w: ${imgWidth}, pos: "b"}`;
      } else {
        // For shapes and nodes, we need to find the actual code in the source
        const lines = code.split("\n");
        let elementCode = "";

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(id + "[") || lines[i].includes(id + "(")) {
            elementCode = lines[i];
            // Check if there's a config line following
            if (i + 1 < lines.length && lines[i + 1].includes(id + "@")) {
              elementCode += "\n" + lines[i + 1];
            }
            break;
          }
        }

        currentCode = elementCode;
      }

      const elementData = {
        image: imgSrc,
        height: imgHeight,
        width: imgWidth,
        heading: labelText,
        id: id,
        type: elementType,
      };

      setForm(elementData);
      setSelectedElement(id);
      setOldCode(currentCode);
      setOpenImageModel(true);
    };

    // Add event listener to the document for better event handling
    document.addEventListener("click", handleElementClick);

    return () => {
      document.removeEventListener("click", handleElementClick);
    };
  }, [code]);

  const getInsertContext = (lines) => {
    let insertIndex = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
      const t = lines[i].trim();
      if (t === "```" || t === "end" || t.startsWith("end")) {
        insertIndex = i;
        break;
      }
    }

    // Map all subgraph ranges: { start, end }
    const stack = [];
    const ranges = [];
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim();
      if (t.startsWith("subgraph")) stack.push(i);
      else if (t === "end" || t.startsWith("end")) {
        const start = stack.pop();
        if (start !== undefined) ranges.push({ start, end: i });
      }
    }

    // Pick the subgraph whose end equals the insertIndex; otherwise use whole doc
    const inSubgraph = ranges.find((r) => r.end === insertIndex);
    const range = inSubgraph
      ? inSubgraph
      : { start: 0, end: Math.min(insertIndex, lines.length - 1) };

    return { insertIndex, range };
  };

  const findLastNodeIdInRange = (lines, start, end) => {
    const nodeIds = [];

    // RHS of edges (B in A --> B, even if B has inline label like B[".."])
    const rhsEdgeRegex =
      /(?:--(?:\|.*?\|)?>|-\.->|==>|~->|->)\s*([A-Za-z_]\w*)/g;

    // Standalone/inline declarations (covers [ ], ( ), { }, >"..." ], and @{...})
    const anyDeclRegex =
      /(^|\s)([A-Za-z_]\w*)\s*(?=(\[[^\]]*\]|\([^)]*\)|\{[^}]*\}|>"[^"]*"\]|\@{[^}]*\}))/g;

    for (let i = start; i <= end; i++) {
      const raw = lines[i];
      const line = raw.trim();
      if (
        !line ||
        line.startsWith("%%") ||
        line.startsWith("classDef") ||
        line.startsWith("linkStyle") ||
        line.startsWith("flowchart")
      )
        continue;

      // Collect targets of edges on this line
      let m;
      while ((m = rhsEdgeRegex.exec(line)) !== null) {
        nodeIds.push(m[1]);
      }

      // Also collect declarations (works if a node is declared without an incoming edge)
      while ((m = anyDeclRegex.exec(line)) !== null) {
        nodeIds.push(m[2]);
      }
    }

    return nodeIds.length ? nodeIds[nodeIds.length - 1] : null;
  };

  const addShapeWithConnection = (shapeCode, shapeType) => {
    const lines = code.split('\n');
    const { insertIndex, range } = getInsertContext(lines);
    const lastNodeId = selectedElement || findLastNodeIdInRange(lines, range.start, range.end);
    
    const idMatch = shapeCode.trim().match(/^([A-Za-z_]\w*)/);
    const newShapeId = idMatch ? idMatch[1] : `shapes${countShape}`;
  
    const newCodeLines = [...lines];
    newCodeLines.splice(insertIndex, 0, shapeCode);
  
    if (lastNodeId) {
      newCodeLines.splice(
        insertIndex + 1,
        0,
        `${lastNodeId} --> ${newShapeId}`
      );
    }
  
    const newCode = newCodeLines.join('\n');
    setCode(newCode);
    if (typeof window !== 'undefined') sessionStorage.setItem('code', newCode);
  
    setCountShape((prev) => prev + 1);
  };

  // const addShapeWithConnection = (shapeCode) => {
  //   console.log("Adding shape code:", shapeCode);
  //   console.log("Current code:", code);
  //   const lines = code.split("\n");
  //   console.log("Lines:", lines);

  //   // Find where to insert and the current subgraph context
  //   const { insertIndex, range } = getInsertContext(lines);

  //   // Use selected element if available, otherwise fallback to last node in this range
  //   const lastNodeId =
  //     selectedElement || findLastNodeIdInRange(lines, range.start, range.end);

  //   // Extract shape id from first line (fallback to shapes${countShape})
  //   const idMatch = shapeCode.trim().match(/^([A-Za-z_]\w*)/m);
  //   const newShapeId = idMatch ? idMatch[1] : `shapes${countShape}`;

  //   // Split shapeCode into multiple lines
  //   const shapeLines = shapeCode
  //     .trim()
  //     .split("\n")
  //     .map((l) => l.trim())
  //     .filter(Boolean);

  //   const newCodeLines = [...lines];

  //   // Insert all shape lines before the "end"/file end
  //   shapeLines.forEach((line, idx) => {
  //     newCodeLines.splice(insertIndex + idx, 0, line);
  //   });

  //   // Add connection from last node to the new shape
  //   if (lastNodeId) {
  //     newCodeLines.splice(
  //       insertIndex + shapeLines.length,
  //       0,
  //       `${lastNodeId} --> ${newShapeId}`
  //     );
  //   }

  //   const newCode = newCodeLines.join("\n");
  //   setCode(newCode);

  //   if (typeof window !== "undefined") {
  //     sessionStorage.setItem("code", newCode);
  //   }

  //   setCountShape((prev) => prev + 1);
  // };

  // const addShapeWithConnection = (shapeCode) => {
  //   const lines = code.split("\n");

  //   // determine where we’re inserting and what subgraph block we’re in
  //   const { insertIndex, range } = getInsertContext(lines);

  //   // if you’ve selected a node, prefer that; otherwise find last in-range node
  //   const lastNodeId =
  //     selectedElement || findLastNodeIdInRange(lines, range.start, range.end);

  //   // derive the new shape id from the shapeCode (fallback to shapes${countShape})
  //   const idMatch = shapeCode.trim().match(/^([A-Za-z_]\w*)/);
  //   const newShapeId = idMatch ? idMatch[1] : `shapes${countShape}`;

  //   // insert shape code just before the `end` (or file end)
  //   const newCodeLines = [...lines];
  //   newCodeLines.splice(insertIndex, 0, shapeCode);

  //   // connect last node → new shape (only if we actually found one)
  //   if (lastNodeId) {
  //     newCodeLines.splice(
  //       insertIndex + 1,
  //       0,
  //       `${lastNodeId} --> ${newShapeId}`
  //     );
  //   }

  //   const newCode = newCodeLines.join("\n");
  //   setCode(newCode);
  //   if (typeof window !== "undefined") sessionStorage.setItem("code", newCode);

  //   setCountShape((prev) => prev + 1);
  // };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Add click event to shapes dynamically
  useEffect(() => {
    const handleClick = (svgDoc) => {
      const labelElement = svgDoc.querySelector(".nodeLabel p");
      const labelText = labelElement ? labelElement.innerText : "";

      const imageElement = svgDoc.querySelector("image");
      const imgSrc = imageElement ? imageElement.getAttribute("href") : "";
      const imgWidth = imageElement ? imageElement.getAttribute("width") : "";
      const imgHeight = imageElement ? imageElement.getAttribute("height") : "";
      const identifier = svgDoc ? svgDoc.getAttribute("id").split("-")[1] : "";

      // Determine element type based on class names
      let elementType = "image";
      if (svgDoc.classList.contains("node")) {
        elementType = "node";
      } else if (svgDoc.classList.contains("shape")) {
        elementType = "shape";
      }

      // Create the exact current code representation
      const currentCode = `${identifier}[${labelText}]\n${identifier}@{img: ${imgSrc}, h: ${imgHeight}, w: ${imgWidth}, pos: "b"}`;

      const b = {
        image: imgSrc,
        height: imgHeight,
        width: imgWidth,
        heading: labelText,
        id: identifier,
        type: elementType,
      };

      setForm(b);
      setSelectedElement(identifier);
      setOldCode(currentCode);
      setOpenImageModel(true);
    };

    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll(".image-shape, .node, .shape");
      if (elements.length) {
        Array.from(elements).forEach((item) => {
          item.addEventListener("click", () => handleClick(item));
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const elements = document.querySelectorAll(
        ".image-shape, .node, .shape, .editable"
      );
      if (elements.length) {
        Array.from(elements).forEach((item) => {
          item.removeEventListener("click", handleClick);
        });
      }
    };
  }, []);

  const [designAnchor, setDesignAnchor] = useState(null);
  const handleThemeClose = () => {
    setThemeAnchor(null);
    setDesignAnchor(null);
  };
  const handleShapeClose = () => {
    setAnchorEl(null);
  };
  const { color, setColor } = useContext(ChartContext);

  const handleClose = () => {
    setOpenImageModel(false);
    setSelectedElement(null);
  };

  // Toggle collapse/expand
  const toggleCollapse = () => {
    setExpanded(!expanded);
    setActiveButton("collapse");
  };

  // Handle font size menu
  const [anchorElFontSize, setAnchorElFontSize] = useState(null);

  const handleFontSizeMenuClose = () => {
    setAnchorElFontSize(null);
  };

  const id = open ? "image-popover" : undefined;

  // Code counter functions
  function countOccurrencesByPrefix(text, word, prefixLength = 8) {
    const prefix = word.slice(0, prefixLength);
    const regex = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
    const matches = text.match(regex);
    setCount(matches ? matches.length + 1 : 1);
  }

  function countOccurrencesByPrefixForShape() {
    const matches = [...code.matchAll(/shapes(\d+)/g)];
    let lastShapeNumber = 0;

    if (matches.length > 0) {
      // Get the last match, not the second to last
      const lastMatch = matches[matches.length - 1];
      // Make sure the match has the expected structure before accessing [1]
      lastShapeNumber = lastMatch && lastMatch[1] ? lastMatch[1] : 0;
    }

    setCountShape(Number(lastShapeNumber) + 1);
  }

  function countOccurrencesByPrefixForRocket(text, word, prefixLength = 3) {
    const prefix = word.slice(0, prefixLength);
    const regex = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
    const matches = text.match(regex);
    setCountRocket(matches ? matches.length + 1 : 1);
  }

  function countOccurrencesByPrefixForImage(text, word, prefixLength = 8) {
    const prefix = word.slice(0, prefixLength);
    const regex = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
    if (oldCode == null) {
      const matches = text.match(regex) || [];
      const a = matches?.length
        ? matches?.length == 2
          ? matches?.length
          : matches?.length - 1
        : 1;
      setCountImage(a);
    }
  }

  useEffect(() => {
    if (code) {
      countOccurrencesByPrefix(code, "subchart");
      countOccurrencesByPrefixForShape(code, "shapes");
      countOccurrencesByPrefixForRocket(code, "xyz");
      countOccurrencesByPrefixForImage(code, "imgTitle");
    }
  }, [code]);

  // Property click to show code
  const handleButtonClick = (event, key) => {
    setActiveButton(key);

    // if (key === "addSubChart") {
    //   const newCode = `${
    //     code +
    //     `\nsubgraph s${count}["Untitled subgraph"]\n` +
    //     `        subchart${count}["Untitled Node"]\n` +
    //     "  end"
    //   } `;
    //   const connection = count > 1 ? `s${count} --> s${count - 1}\n` : "";
    //   const finalCode = newCode + connection;
    //   setCode(finalCode);
    //   if (typeof window !== "undefined") {
    //     sessionStorage.setItem("code", finalCode);
    //   }
    // }
    if (key === "addSubChart") {
      const subgraphId = `s${count}`;
      const nodeId = `node${count}`;
      
      // Simple subgraph without automatic connections
      const newSubgraphCode = `\nsubgraph ${subgraphId}["Untitled subgraph"]\n    ${nodeId}["Untitled Node"]\nend`;
      
      const newCode = code + newSubgraphCode;
      
      setCode(newCode);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("code", newCode);
      }
      
      setCount(count + 1);
    }
    if (key === "brushTool") {
      setDesignAnchor(event.currentTarget);
    }
    if (key === "shapes") {
      setAnchorEl(event.currentTarget);
    }

    if (key === "launchRocket") {
      const newcode = `${
        code +
        `xyz${countRocket}["Sample Label"]\n` +
        `xyz${countRocket}@{ icon: "mc:default", pos: "b"}\n`
      }`;

      setCode(newcode);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("code", `${newcode}`);
      }
    }

    if (key === "addImage") {
      setOldCode(null);
      setSelectedElement(null);
      const newcode = `${
        code +
        `\nimgTitle${countImage}[${form.heading}]\n` +
        `imgTitle${countImage}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}\n`
      }`;
      setCode(newcode);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("code", `${newcode}`);
      }
    }
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // Shape properties
  const BasicShapes = [
    {
      img: Rectangle,
      code: `shapes${countShape}["Rectangle"]`,
      shapeType: "rect"
    },
    {
      img: Rounded,
      code: `shapes${countShape}["Rounded"] \nshapes${countShape}@{ shape: rounded}`,
      shapeType: "rounded"
    },
    {
      img: Stadium,
      code: `\n   shapes${countShape}(["Stadium"])`,
      shapeType: "stadium"
    },
    {
      img: Triangle,
      code: `\n shapes${countShape}["Diamond"] \n shapes${countShape}@{ shape: diam}`,
      shapeType: "diam"
    },
    {
      img: Diamond,
      code: `\n shapes${countShape}["Triangle"] \n shapes${countShape}@{ shape: tri}`,
      shapeType: "tri"
    },
    {
      img: Hexazone,
      code: `\n   shapes${countShape}["Hexagon"] \n shapes${countShape}@{ shape: hex}`,
      shapeType: "hex"
    },
    {
      img: Cylinder,
      code: `\n shapes${countShape}["Cylinder"]\n shapes${countShape}@{ shape: cyl}`,
      shapeType: "cyl"
    },
    {
      img: Horizontal_Cylinder,
      code: `\n shapes${countShape}["Horizontal Cylinder"] \nshapes${countShape}@{ shape: h-cyl}`,
      shapeType: "h-cyl"
    },
    {
      img: Circle,
      code: `\n     shapes${countShape}(("Circle"))`,
      shapeType: "circle"
    },
    {
      img: Dubble_Circle,
      code: `\n shapes${countShape}["Double Circle"]\n shapes${countShape}@{ shape: dbl-circ}`,
      shapeType: "dbl-circ"
    },
    {
      img: Small_Circle,
      code: `\n  shapes${countShape}["Small Circle"] \n shapes${countShape}@{ shape: sm-circ}`,
      shapeType: "sm-circ"
    },
    {
      img: Framed_Circle,
      code: `\n shapes${countShape}["Frames Circle"]\n shapes${countShape}@{ shape: fr-circ}`,
      shapeType: "fr-circ"
    },
    {
      img: Filled_Circles,
      code: `\n   shapes${countShape}["Filled Circle"] \n shapes${countShape}@{ shape: f-circ}`,
      shapeType: "f-circ"
    },
    {
      img: Parallelogram,
      code: `\n    shapes${countShape}["Parallelogram"] \n shapes${countShape}@{ shape: lean-l}`,
      shapeType: "lean-l"
    },
    {
      img: Parallelogram_Reversed,
      code: `\n  shapes${countShape}["Parallelogram Reversed"] \n shapes${countShape}@{ shape: lean-r}`,
      shapeType: "lean-r"
    },
    {
      img: Trapezoid,
      code: `\n   shapes${countShape}["Trapezoid"] \n shapes${countShape}@{ shape: trap-b}`,
      shapeType: "trap-b"
    },
    {
      img: Trapezoid_Reversed,
      code: `\nshapes${countShape}["Trapezoid Reversed"] \n shapes${countShape}@{ shape: trap-t}`,
      shapeType: "trap-t"
    },
    {
      img: Card,
      code: `\n  shapes${countShape}["Card"]  \n  shapes${countShape}@{ shape: card}`,
      shapeType: "card"
    },
    {
      img: Odd,
      code: `\n shapes${countShape}>"Odd"]`,
      shapeType: "odd"
    },
    {
      img: Anchor,
      code: `\n shapes${countShape}["Anchor"] \n shapes${countShape}@{ shape: anchor}`,
      shapeType: "anchor"
    },
  ];
  
  const ProcessShapes = [
    {
      img: Standard_Process,
      code: `\nshapes${countShape}["Standard Process"]\nshapes${countShape}@{ shape: proc}`,
      shapeType: "proc"
    },
    {
      img: Sub_Process,
      code: `\nshapes${countShape}["Sub Process"]\nshapes${countShape}@{ shape: subproc}`,
      shapeType: "subproc"
    },
    {
      img: Tagged_Process,
      code: `\nshapes${countShape}["Tagged Process"]\nshapes${countShape}@{ shape: tag-proc}`,
      shapeType: "tag-proc"
    },
    {
      img: Multi_Process,
      code: `\nshapes${countShape}["Multi Process"]\nshapes${countShape}@{ shape: procs}`,
      shapeType: "procs"
    },
    {
      img: Divied_Process,
      code: `\nshapes${countShape}["Divided Process"]\nshapes${countShape}@{ shape: div-proc}`,
      shapeType: "div-proc"
    },
    {
      img: Extractions_Process,
      code: `\nshapes${countShape}["Extraction Process"]\nshapes${countShape}@{ shape: extract}`,
      shapeType: "extract"
    },
    {
      img: Lined_Process,
      code: `\nshapes${countShape}["Lined Process"]\nshapes${countShape}@{ shape: lin-proc}`,
      shapeType: "lin-proc"
    },
    {
      img: In_Out,
      code: `\nshapes${countShape}["In Out"]\nshapes${countShape}@{ shape: in-out}`,
      shapeType: "in-out"
    },
    {
      img: Out_In,
      code: `\nshapes${countShape}["Out In"]\nshapes${countShape}@{ shape: out-in}`,
      shapeType: "out-in"
    },
    {
      img: Manual_File_Action,
      code: `\nshapes${countShape}["Manual File Action"]\nshapes${countShape}@{ shape: manual-file}`,
      shapeType: "manual-file"
    },
    {
      img: Priority_Action,
      code: `\nshapes${countShape}["Priority Action"]\nshapes${countShape}@{ shape: priority}`,
      shapeType: "priority"
    },
    {
      img: Collate_Action,
      code: `\nshapes${countShape}["Collate Action"]\nshapes${countShape}@{ shape: collate}`,
      shapeType: "collate"
    },
    {
      img: Loop_Limit,
      code: `\nshapes${countShape}["Loop Limit"]\nshapes${countShape}@{ shape: loop-limit}`,
      shapeType: "loop-limit"
    },
    {
      img: Manual_Input,
      code: `\nshapes${countShape}["Manual Input"]\nshapes${countShape}@{ shape: manual-input}`,
      shapeType: "manual-input"
    },
    {
      img: Event,
      code: `\nshapes${countShape}["Event"]\nshapes${countShape}@{ shape: event}`,
      shapeType: "event"
    },
    {
      img: Start,
      code: `\nshapes${countShape}["Start"]\nshapes${countShape}@{ shape: start}`,
      shapeType: "start"
    },
    {
      img: Stop,
      code: `\nshapes${countShape}["Stop"]\nshapes${countShape}@{ shape: stop}`,
      shapeType: "stop"
    },
    {
      img: Fork_Join,
      code: `\nshapes${countShape}["Fork/Join"]\nshapes${countShape}@{ shape: fork}`,
      shapeType: "fork"
    },
    {
      img: Terminal,
      code: `\nshapes${countShape}["Terminal"]\nshapes${countShape}@{ shape: terminal}`,
      shapeType: "terminal"
    },
    {
      img: Delay,
      code: `\nshapes${countShape}["Delay"]\nshapes${countShape}@{ shape: delay}`,
      shapeType: "delay"
    },
    {
      img: Junction,
      code: `\nshapes${countShape}["Junction"]\nshapes${countShape}@{ shape: junction}`,
      shapeType: "junction"
    },
    {
      img: Decision,
      code: `\nshapes${countShape}["Decision"]\nshapes${countShape}@{ shape: decision}`,
      shapeType: "decision"
    },
    {
      img: Document,
      code: `\nshapes${countShape}["Document"]\nshapes${countShape}@{ shape: doc}`,
      shapeType: "doc"
    },
    {
      img: Tagged_Document,
      code: `\nshapes${countShape}["Tagged Document"]\nshapes${countShape}@{ shape: tag-doc}`,
      shapeType: "tag-doc"
    },
    {
      img: Multiple_Document,
      code: `\nshapes${countShape}["Multiple Documents"]\nshapes${countShape}@{ shape: docs}`,
      shapeType: "docs"
    },
    {
      img: Lined_Document,
      code: `\nshapes${countShape}["Lined Document"]\nshapes${countShape}@{ shape: lin-doc}`,
      shapeType: "lin-doc"
    },
    {
      img: Comment,
      code: `\nshapes${countShape}["Comment"]\nshapes${countShape}@{ shape: comment}`,
      shapeType: "comment"
    },
    {
      img: Comment_Right,
      code: `\nshapes${countShape}["Comment Right"]\nshapes${countShape}@{ shape: brace-r}`,
      shapeType: "brace-r"
    },
    {
      img: Braces,
      code: `\nshapes${countShape}["Braces"]\nshapes${countShape}@{ shape: braces}`,
      shapeType: "braces"
    },
    {
      img: Summary,
      code: `\nshapes${countShape}["Summary"]\nshapes${countShape}@{ shape: summary}`,
      shapeType: "summary"
    },
  ];
  
  const TechnicalShapes = [
    {
      img: Database,
      code: `\n shapes${countShape}["Database"]\n shapes${countShape}@{ shape: db}`,
      shapeType: "db"
    },
    {
      img: Disk_Storage,
      code: `\n shapes${countShape}["Disk Storage"]\n shapes${countShape}@{ shape: disk}`,
      shapeType: "disk"
    },
    {
      img: Direct_Access_Storage,
      code: `\n shapes${countShape}["Direct Access Storage"]\n shapes${countShape}@{ shape: das}`,
      shapeType: "das"
    },
    {
      img: Internal_Storage,
      code: `\n shapes${countShape}["Internal Storage"]\n shapes${countShape}@{ shape: internal-storage}`,
      shapeType: "internal-storage"
    },
    {
      img: Display,
      code: `\n shapes${countShape}["Display"]\n shapes${countShape}@{ shape: display}`,
      shapeType: "display"
    },
    {
      img: Stored_Data,
      code: `\n shapes${countShape}["Stored Data"]\n shapes${countShape}@{ shape: stored-data}`,
      shapeType: "stored-data"
    },
    {
      img: Communication_Link,
      code: `\n shapes${countShape}["Communication Link"]\n shapes${countShape}@{ shape: com-link}`,
      shapeType: "com-link"
    },
    {
      img: Paper_Tape,
      code: `\n shapes${countShape}["Paper Tape"]\n shapes${countShape}@{ shape: paper-tape}`,
      shapeType: "paper-tape"
    },
  ];

  // Function to delete an element from the chart - MORE PRECISE
  const deleteElement = () => {
    if (!selectedElement) return;

    console.log("Deleting element:", selectedElement);
    console.log("Current code before deletion:", code);

    // More precise regex patterns
    const elementPattern = new RegExp(
      `^\\s*${selectedElement}\\b[^\\n]*(\\n|$)`,
      "gm"
    );
    const connectionPattern = new RegExp(
      `^\\s*.*\\b${selectedElement}\\b.*$`,
      "gm"
    );
    const configPattern = new RegExp(
      `^\\s*${selectedElement}\\s*@\\{[^}]*\\}\\s*(\\n|$)`,
      "gm"
    );

    // Remove the element and its configurations
    let newCode = code
      .replace(elementPattern, "")
      .replace(configPattern, "")
      .replace(connectionPattern, "")
      .replace(/\n{3,}/g, "\n\n") // Clean up extra newlines
      .trim();

    // Clean up dangling arrows and orphaned connections
    newCode = newCode
      .replace(/^\s*-->\s*$/gm, "") // Lines with only -->
      .replace(/-->\s*$/gm, "") // --> at end of lines
      .replace(/^\s*-->\s*/gm, "") // --> at beginning of lines
      .replace(/(\w+)\s*-->\s*$/gm, "$1") // Node followed by --> at end
      .replace(/-->\s*(\w+)/gm, "--> $1"); // Ensure proper spacing

    console.log("Code after deletion:", newCode);

    setCode(newCode);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("code", newCode);
    }

    setOpenImageModel(false);
    setSelectedElement(null);
    setForm(initialValue);
  };

  const updateElement = () => {
    if (!selectedElement) return;

    // Create regex patterns for different element types
    const nodePattern = new RegExp(`(${selectedElement}\\[[^\\]]*\\])`, "g");
    const configPattern = new RegExp(`(${selectedElement}@\\{[^}]*\\})`, "g");

    let updatedCode = code;

    // Update node label
    if (nodePattern.test(code)) {
      updatedCode = updatedCode.replace(
        nodePattern,
        `${selectedElement}[${form.heading}]`
      );
    }

    // Update configuration
    if (configPattern.test(updatedCode)) {
      updatedCode = updatedCode.replace(
        configPattern,
        `${selectedElement}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}`
      );
    } else {
      // Add configuration if it doesn't exist
      updatedCode += `\n${selectedElement}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}`;
    }

    setCode(updatedCode);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("code", updatedCode);
    }

    setOpenImageModel(false);
    setSelectedElement(null);
    setForm(initialValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          border: "1px solid #ccc",
          borderRadius: "8px",
          p: 1,
          bgcolor: "#f9f9f9",
          boxShadow: 3,
          transition: "all 0.3s ease-in-out",
          width: "50px",
          top: 80,
          left: 10,
          pointerEvents: "auto", // ← ADD THIS LINE
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title={expanded ? "Collapse" : "Expand"}>
            <IconButton
              onClick={toggleCollapse}
              sx={{
                backgroundColor:
                  activeButton === "collapse" ? "sidebarHover" : "white",
                color: activeButton === "collapse" ? "white" : "black",
                borderRadius: 1,
                p: 0.5,
                "&:hover": {
                  backgroundColor: "#FF348033",
                },
              }}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Tooltip>
        </Box>

        {/*other property*/}
        <Collapse in={expanded}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {[
              ...(code?.startsWith("flowchart")
                ? [
                    {
                      key: "shapes",
                      icon: <AddIcon />,
                      tooltip: "Shapes",
                    },
                  ]
                : []),
              {
                key: "addSubChart",
                icon: <AddToPhotosIcon />,
                tooltip: "Add Sub Chart",
              },
              // {key: "launchRocket", icon: <RocketLaunchIcon/>, tooltip: "Launch Rocket"},
              { key: "addImage", icon: <ImageIcon />, tooltip: "Add Image" },
              { key: "brushTool", icon: <BrushIcon />, tooltip: "Brush Tool" },
            ].map(({ key, icon, tooltip, onClick }) => (
              <Tooltip key={key} title={tooltip}>
                <IconButton
                  onClick={(event) => handleButtonClick(event, key)}
                  sx={{
                    px: 2,
                    py: 0.5,
                    backgroundColor:
                      activeButton === key ? "sidebarHover" : "white",
                    color: activeButton === key ? "white" : "black",
                    "&:hover": { backgroundColor: "#FF348033" },
                    borderRadius: 1,
                  }}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Collapse>
        {/*background color chart*/}
        <Popover
          open={Boolean(designAnchor)}
          anchorEl={designAnchor}
          onClose={handleThemeClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <List
            sx={{
              backgroundColor: "#F2F2F3",
              py: 0.5,
              px: 0.5,
              width: "180px",
            }}
          >
            <ListItemButton
              onClick={(event) => setThemeAnchor(event.currentTarget)}
              sx={{
                borderRadius: "10px",
                py: 0.5,
                "&:hover": { backgroundColor: "sidebarHover", color: "white" },
              }}
            >
              <ListItemText primary="Themes" /> <KeyboardArrowRightIcon />
            </ListItemButton>
          </List>
        </Popover>

        <Popover
          open={Boolean(themeAnchor)}
          anchorEl={themeAnchor}
          onClose={handleThemeClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <List
            sx={{
              backgroundColor: "#F2F2F3",
              py: 0.5,
              px: 0.5,
              width: "180px",
            }}
          >
            {themes.map((themeItem, index) => (
              <ListItemButton
                key={index}
                onClick={() => {
                  setColor({
                    theme: themeItem.color,
                    image: themeItem.image,
                    borderColor: themeItem.borderColor,
                  });
                  setThemeAnchor(null);
                  setDesignAnchor(null);
                }}
                sx={{
                  borderRadius: "10px",
                  py: 0.5,
                  "&:hover": {
                    backgroundColor: "sidebarHover",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary={themeItem.text} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      </Box>

      {/*shapes*/}
      <Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleShapeClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ maxWidth: "450px" }}
        >
          <Box sx={{ p: 2, minWidth: 370, backgroundColor: "#ffeaf1" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "sidebarHover",
                  height: 3,
                },
              }}
            >
              <Tab label="Basic" />
              <Tab label="Process" />
              <Tab label="Technical" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {tabIndex === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {/* {BasicShapes.map((item, index) => (
                    <Box key={index + 1}>
                      <Box
                        onClick={() => {
                          addShapeWithConnection(item.code);
                        }}
                        sx={{
                          height: 48,
                          width: 48,
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        <img src={item.img.src} alt="icon" />
                      </Box>
                    </Box>
                  ))} */}
                  {BasicShapes.map((item, index) => (
  <Box key={index + 1}>
    <Box
      onClick={() => {
        addShapeWithConnection(item.code, item.shapeType);
      }}
      sx={{
        height: 48,
        width: 48,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <img src={item.img.src} alt="icon" />
    </Box>
  </Box>
))}
                </Box>
              )}
              {tabIndex === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {ProcessShapes.map((item, index) => (
                    <Box key={index + 1}>
                      <Box
                        onClick={() => {
                          addShapeWithConnection(item.code);
                        }}
                        sx={{
                          height: 48,
                          width: 48,
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        <img src={item.img.src} alt="icon" />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
              {tabIndex === 2 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {TechnicalShapes.map((item, index) => (
                    <Box key={index + 1}>
                      <Box
                        onClick={() => {
                          addShapeWithConnection(item.code);
                        }}
                        sx={{
                          height: 48,
                          width: 48,
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        <img src={item.img.src} alt="icon" />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Popover>
      </Box>

      {/*images*/}
      <Box>
        <Popover
          id={id}
          open={openImageModel}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            p={4}
          >
            <TextField
              label="Heading"
              variant="outlined"
              name="heading"
              value={form.heading}
              onChange={handleChange}
              sx={{ width: 230 }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              name="image"
              value={form.image}
              onChange={handleChange}
              sx={{ width: 230 }}
            />

            <TextField
              label="Width (px)"
              type="number"
              variant="outlined"
              name="width"
              value={form.width}
              onChange={handleChange}
            />
            <TextField
              label="Height (px)"
              type="number"
              name="height"
              variant="outlined"
              value={form.height}
              onChange={handleChange}
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              {selectedElement && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={deleteElement}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={
                  selectedElement
                    ? updateElement
                    : () => {
                        const newcode = `${
                          code +
                          `\nimgTitle${countImage}[${form.heading}]\n` +
                          `imgTitle${countImage}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}\n`
                        }`;
                        setCode(newcode);

                        if (typeof window !== "undefined") {
                          sessionStorage.setItem("code", `${newcode}`);
                        }
                        setOpenImageModel(!openImageModel);
                        setForm(initialValue);
                      }
                }
              >
                {selectedElement ? "Update" : "Add"}
              </Button>
            </Stack>
          </Box>
        </Popover>
      </Box>
      <Box>
        <View fontSizes={fontSize} color={color} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,

          p: 1,
        }}
      >
        <NodeAdder />
      </Box>
    </Box>
  );
};

export default RightContainer;
