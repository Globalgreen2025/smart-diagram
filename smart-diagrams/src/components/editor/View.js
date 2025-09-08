"use client";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useDebounce } from "ahooks";
import { Box, Button } from "@mui/material";
import { parse, render } from "@/utils/mermaid";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "@/store";
import { ChartContext } from "@/app/layout";
import dagre from "dagre";
import theme from "@/components/theme/theme";
import CustomShapeNode from "./CustomShapeNode";

// Helper function to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 180;
const nodeHeight = 50;

const applyLayout = (nodes, edges, direction = "TB") => {
  // Create a new directed graph
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 50 });

  // Set nodes
  nodes.forEach((node) => {
    g.setNode(node.id, { width: 150, height: 50 });
  });

  // Set edges
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  // Run the layout
  dagre.layout(g);

  // Apply the layout to the nodes
  return nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });
};
// const applyLayout = (nodes, edges, direction = "TB") => {
//   dagreGraph.setGraph({ rankdir: direction }); // "TB" for vertical

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   return nodes.map((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     return {
//       ...node,
//       position: {
//         x: nodeWithPosition.x - nodeWidth / 2,
//         y: nodeWithPosition.y - nodeHeight / 2,
//       },
//     };
//   });
// };

// Custom message for syntax errors
const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors.`;

const nodeTypes = {
  customShape: CustomShapeNode,
};

const FlowView = ({ color, fontSizes }) => {
  const { chartRef } = useContext(ChartContext);
  const code = useStore.use.code();
  const config = useStore.use.config();
  const autoSync = useStore.use.autoSync();
  const updateDiagram = useStore.use.updateDiagram();
  const setUpdateDiagram = useStore.use.setUpdateDiagram();
  const setCode = useStore.use.setCode();
  const setSvg = useStore.use.setSvg();
  const setValidateCodeState = useStore.use.setValidateCode();
  const setValidateConfigState = useStore.use.setValidateConfig();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const codeRef = useRef(code);

  const [validateCode, setValidateCode] = useState("");
  const [validateConfig, setValidateConfig] = useState("");

  const debounceCode = useDebounce(code, { wait: 300 });
  const debounceConfig = useDebounce(config, { wait: 300 });

  const [deletedNodeIds, setDeletedNodeIds] = useState([]);
  const [deletedEdgeIds, setDeletedEdgeIds] = useState([]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const addTheme = [
    {
      name: "ocean",
      style: {
        primaryColor: "#71BBB2",
        primaryBorderColor: "#497D74",
      },
    },
    {
      name: "solarized",
      style: {
        primaryColor: "#A27B5C",
        primaryBorderColor: "#3F4F44",
      },
    },
    {
      name: "sunset",
      style: {
        primaryColor: "#FFCDB2",
        primaryBorderColor: "#E5989B",
      },
    },
    {
      name: "neon",
      style: {
        primaryColor: "#B6FFA1",
        primaryBorderColor: "#00FF9C",
      },
    },
    {
      name: "monochrome",
      style: {
        primaryColor: "#A7B49E",
        primaryBorderColor: "#818C78",
      },
    },
  ];
  const theme = addTheme.find((t) => t.name === color.theme);

  // Create a function to parse Mermaid nodes more accurately

  /*** VALIDATE CODE AND CONFIG ***/
  const setValidateCodeAndConfig = async (code, config) => {
    try {
      await parse(code);
      JSON.parse(config);
      setValidateCode(code);
      setValidateConfig(config);
      setValidateCodeState(code);
      setValidateConfigState(config);
    } catch (error) {
      let errorMessage =
        error instanceof Error
          ? `Syntax error: ${error.message}${customMessage}`
          : "Syntax error: Unknown error";
      setValidateCode(errorMessage);
      setValidateConfig(config);
      setValidateCodeState(errorMessage);
      setValidateConfigState(config);
    }
  };

  // Create a function to parse Mermaid nodes more accurately
  // const parseMermaidNodes = (code) => {
  //   const nodes = [];
  //   const lines = code.split('\n');

  //   lines.forEach((line, index) => {
  //     const trimmed = line.trim();

  //     // Match node patterns: id[label], id{label}, id(label)
  //     const nodeMatch = trimmed.match(/^(\w+)(\[([^\]]+)\]|\{([^}]+)\}|\(([^)]+)\))/);

  //     if (nodeMatch) {
  //       const id = nodeMatch[1];
  //       const label = nodeMatch[3] || nodeMatch[4] || nodeMatch[5] || '';
  //       nodes.push({ id, label, lineIndex: index, originalLine: line });
  //     }
  //   });

  //   return nodes;
  // };
  // Create a function to parse Mermaid nodes more accurately
  const parseMermaidNodes = (code) => {
    const nodes = [];
    const lines = code.split("\n");

    console.log("🔍 Parsing Mermaid nodes from code:");
    console.log("Full code:", code);

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      console.log(`Line ${index}: "${trimmed}"`);

      // Multiple patterns to catch all node types
      const patterns = [
        // Pattern 1: id[label] with optional connections
        /(\w+)\[([^\]]+)\](?:\s*-->|\s*--|\s*$)/,
        // Pattern 2: id{label} with optional connections
        /(\w+)\{([^}]+)\}(?:\s*-->|\s*--|\s*$)/,
        // Pattern 3: id(label) with optional connections
        /(\w+)\(([^)]+)\)(?:\s*-->|\s*--|\s*$)/,
        // Pattern 4: Just id[label] (fallback)
        /(\w+)\[([^\]]+)\]/,
        // Pattern 5: Just id{label} (fallback)
        /(\w+)\{([^}]+)\}/,
        // Pattern 6: Just id(label) (fallback)
        /(\w+)\(([^)]+)\)/,
      ];

      for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match) {
          const id = match[1];
          const label = match[2] || "";
          console.log(`✅ Found node: ${id} with label: "${label}"`);
          nodes.push({ id, label, lineIndex: index, originalLine: line });
          break;
        }
      }
    });

    console.log("📋 All parsed nodes:", nodes);
    return nodes;
  };
  const updateCode = useCallback(
    (oldText, newText, nodeId) => {
      const currentCode = codeRef.current;

      const nodes = parseMermaidNodes(currentCode);
      const nodeToUpdate = nodes.find((node) => node.id === nodeId);

      if (!nodeToUpdate) {
        console.log(
          "❌ Node not found in parsed nodes. Available nodes:",
          nodes.map((n) => n.id)
        );
        return;
      }

      const lines = currentCode.split("\n");
      const originalLine = lines[nodeToUpdate.lineIndex];

      console.log("📝 Original line:", originalLine);

      // Simple and reliable replacement
      let updatedLine;
      if (originalLine.includes("[")) {
        updatedLine = originalLine.replace(`[${oldText}]`, `[${newText}]`);
      } else if (originalLine.includes("{")) {
        updatedLine = originalLine.replace(`{${oldText}}`, `{${newText}}`);
      } else if (originalLine.includes("(")) {
        updatedLine = originalLine.replace(`(${oldText})`, `(${newText})`);
      } else {
        console.log("❌ No brackets found for replacement");
        return;
      }

      console.log("🔄 Updated line:", updatedLine);

      lines[nodeToUpdate.lineIndex] = updatedLine;

      const newCode = lines.join("\n");
      setCode(newCode);
      sessionStorage.setItem("code", newCode);

      console.log("✅ Code updated successfully");
    },
    [setCode]
  );

  const convertMermaidToReactFlow = (code, prevNodes = []) => {
    if (!code) return { nodes: [], edges: [] };
  
    let nodes = [];
    let edges = [];
    const nodePositions = new Map();
    const nodeShapes = new Map();
  
    // Parse positions and shapes
    const configRegex = /(\w+)@\{([^}]+)\}/g;
    let configMatch;
    while ((configMatch = configRegex.exec(code)) !== null) {
      const [, id, configStr] = configMatch;
      
      // Parse position
      const posMatch = configStr.match(/pos:\s*\[(\d+),\s*(\d+)\]/);
      if (posMatch) {
        const [, x, y] = posMatch;
        nodePositions.set(id, { x: parseInt(x), y: parseInt(y) });
      }
      
      // Parse shape
      const shapeMatch = configStr.match(/shape:\s*([^,}]+)/);
      if (shapeMatch) {
        nodeShapes.set(id, shapeMatch[1].replace(/"/g, "").trim());
      }
    }
  
    const prevPosMap = new Map(prevNodes.map((n) => [n.id, n.position]));
  
    // Extract nodes with better pattern matching
    const nodePatterns = [
      /(\w+)\[([^\]]+)\]/g,    // square brackets
      /(\w+)\{([^}]+)\}/g,     // curly braces
      /(\w+)\(([^)]+)\)/g      // parentheses
    ];
  
    nodePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        const [_, id, label] = match;
        
        if (!nodes.find((n) => n.id === id)) {
          const shapeType = nodeShapes.get(id);
          const nodeType = shapeType ? "customShape" : "default";
  
          const node = {
            id,
            type: nodeType,
            data: {
              label: label.trim(),
              shape: shapeType,
            },
            position: nodePositions.get(id) || 
                     prevPosMap.get(id) || 
                     { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
          };
  
          if (!shapeType) {
            node.style = {
              background: "#fff",
              border: "2px solid #333",
              borderRadius: "5px",
              padding: "10px",
            };
          }
  
          nodes.push(node);
        }
      }
    });
  
    // Extract edges with improved pattern matching for conditional syntax
    const edgePatterns = [
      // Handle conditional edges: J -->|Session exists| K
      /(\w+)\s*-->\s*\|([^|]+)\|\s*(\w+)/g,
      // Handle simple arrows: I --> J
      /(\w+)\s*-->\s*(\w+)/g,
      // Handle labeled edges: A -- label --> B
      /(\w+)\s*--\s*([^->]+)\s*-->\s*(\w+)/g,
      // Handle simple lines: A -- B
      /(\w+)\s*--\s*(\w+)/g
    ];
  
    edgePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        let source, target, label;
  
        if (match.length === 4 && pattern.source.includes('|')) {
          // Conditional edge pattern: source -->|label| target
          [, source, label, target] = match;
        } else if (match.length === 3) {
          // Simple arrow pattern: source --> target
          [, source, target] = match;
          label = undefined;
        } else if (match.length === 4) {
          // Labeled edge pattern: source -- label --> target
          [, source, label, target] = match;
        }
  
        if (source && target && nodes.find(n => n.id === source) && nodes.find(n => n.id === target)) {
          const edgeId = `e${source}-${target}${label ? `-${label.replace(/\s+/g, '-')}` : ''}`;
          
          if (!edges.find(e => e.id === edgeId)) {
            edges.push({
              id: edgeId,
              source,
              target,
              type: "smoothstep",
              markerEnd: { type: MarkerType.ArrowClosed },
              label: label ? label.trim() : undefined,
            });
          }
        }
      }
    });
  
    // Handle subgraphs: auto-generate edges for nodes without explicit arrows
    const subgraphRegex = /subgraph\s+\w+([\s\S]*?)end/g;
    const nodeRegex = /(\w+)(?:\[(.*?)\]|\{(.*?)\})/g;
    let subMatch;
    while ((subMatch = subgraphRegex.exec(code)) !== null) {
      const subgraphContent = subMatch[1];
      const nodeIds = [];
      let match;
      while ((match = nodeRegex.exec(subgraphContent)) !== null) {
        const [_, id] = match;
        nodeIds.push(id);
      }
  
      for (let i = 0; i < nodeIds.length - 1; i++) {
        const source = nodeIds[i];
        const target = nodeIds[i + 1];
  
        // Only add if edge does not already exist
        if (!edges.find((e) => e.source === source && e.target === target)) {
          edges.push({
            id: `e${source}-${target}`,
            source,
            target,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        }
      }
    }
  
    // Apply Dagre layout if no saved positions and no previous nodes
    if (![...nodePositions.keys()].length && !prevNodes.length) {
      nodes = applyLayout(nodes, edges, "TB"); // Top-to-Bottom layout
    }
  
    // Filter out deleted nodes/edges
    nodes = nodes.filter((n) => !deletedNodeIds.includes(n.id));
    edges = edges.filter((e) => !deletedEdgeIds.includes(e.id));
  
    return { nodes, edges };
  };


  // const convertMermaidToReactFlow = (code, prevNodes = []) => {
  //   if (!code) return { nodes: [], edges: [] };
  
  //   let nodes = [];
  //   let edges = [];
  //   const nodePositions = new Map();
  //   const nodeShapes = new Map();
  
  //   // Parse positions and shapes
  //   const configRegex = /(\w+)@\{([^}]+)\}/g;
  //   let configMatch;
  //   while ((configMatch = configRegex.exec(code)) !== null) {
  //     const [, id, configStr] = configMatch;
      
  //     // Parse position
  //     const posMatch = configStr.match(/pos:\s*\[(\d+),\s*(\d+)\]/);
  //     if (posMatch) {
  //       const [, x, y] = posMatch;
  //       nodePositions.set(id, { x: parseInt(x), y: parseInt(y) });
  //     }
      
  //     // Parse shape
  //     const shapeMatch = configStr.match(/shape:\s*([^,}]+)/);
  //     if (shapeMatch) {
  //       nodeShapes.set(id, shapeMatch[1].replace(/"/g, "").trim());
  //     }
  //   }
  
  //   const prevPosMap = new Map(prevNodes.map((n) => [n.id, n.position]));
  
  //   // Extract nodes with better pattern matching
  //   const nodePatterns = [
  //     /(\w+)\[([^\]]+)\]/g,    // square brackets
  //     /(\w+)\{([^}]+)\}/g,     // curly braces
  //     /(\w+)\(([^)]+)\)/g      // parentheses
  //   ];
  
  //   nodePatterns.forEach(pattern => {
  //     let match;
  //     while ((match = pattern.exec(code)) !== null) {
  //       const [_, id, label] = match;
        
  //       if (!nodes.find((n) => n.id === id)) {
  //         const shapeType = nodeShapes.get(id);
  //         const nodeType = shapeType ? "customShape" : "default";
  
  //         const node = {
  //           id,
  //           type: nodeType,
  //           data: {
  //             label: label.trim(),
  //             shape: shapeType,
  //           },
  //           position: nodePositions.get(id) || 
  //                    prevPosMap.get(id) || 
  //                    { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
  //         };
  
  //         if (!shapeType) {
  //           node.style = {
  //             background: "#fff",
  //             border: "2px solid #333",
  //             borderRadius: "5px",
  //             padding: "10px",
  //           };
  //         }
  
  //         nodes.push(node);
  //       }
  //     }
  //   });
  
  //   // Extract edges with better pattern matching
  //   const edgePatterns = [
  //     /(\w+)\s*-->\s*(\w+)/g,                    // simple arrow
  //     /(\w+)\s*--\s*([^->]+)\s*-->\s*(\w+)/g,    // labeled arrow
  //     /(\w+)\s*--\s*(\w+)/g                      // simple line
  //   ];
  
  //   edgePatterns.forEach(pattern => {
  //     let match;
  //     while ((match = pattern.exec(code)) !== null) {
  //       const source = match[1];
  //       const target = match[match.length - 1]; // Last capture group is always target
  //       const label = match.length === 4 ? match[2] : undefined;
  
  //       if (nodes.find(n => n.id === source) && nodes.find(n => n.id === target)) {
  //         const edgeId = `e${source}-${target}${label ? `-${label}` : ''}`;
          
  //         if (!edges.find(e => e.id === edgeId)) {
  //           edges.push({
  //             id: edgeId,
  //             source,
  //             target,
  //             type: "smoothstep",
  //             markerEnd: { type: MarkerType.ArrowClosed },
  //             label: label || undefined,
  //           });
  //         }
  //       }
  //     }
  //   });
  
  //   // Filter out deleted nodes/edges
  //   nodes = nodes.filter((n) => !deletedNodeIds.includes(n.id));
  //   edges = edges.filter((e) => !deletedEdgeIds.includes(e.id));
  
  //   return { nodes, edges };
  // };
 
 
 
  /*** RENDER MERMAID DIAGRAM AS REACTFLOW ***/
 

  const renderDiagram = async (code, config) => {
    if (!code) return;

    const { nodes: flowNodes, edges: flowEdges } = convertMermaidToReactFlow(
      code,
      nodes
    );

    // Apply theme colors only to default nodes, not custom shapes
    const themedNodes = flowNodes.map((node) => {
      // Skip theming for custom shape nodes
      if (node.type === "customShape") {
        return node;
      }

      const nodeThemeName = color.theme.includes("base/")
        ? color.theme.split("/")[1]
        : color.theme;

      const themeStyle = addTheme.find((t) => t.name === nodeThemeName)?.style;

      return {
        ...node,
        style: {
          background: themeStyle?.primaryColor || "#fff",
          border: `2px solid ${themeStyle?.primaryBorderColor || "#333"}`,
          borderRadius: "5px",
          padding: "10px",
        },
        data: {
          ...node.data,
          color: { theme: nodeThemeName },
        },
      };
    });

    setNodes(themedNodes);
    setEdges(flowEdges);
    setSvg(null);
  };

  const onNodeDoubleClick = useCallback(
    (event, node) => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = node.data.label;

      // Apply Tailwind-like styling
      Object.assign(input.style, {
        position: "fixed",
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        width: "220px",
        height: "40px",
        border: "2px solid #4a5568",
        background: "#ffffff",
        color: "#000000",
        padding: "8px 16px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: "10000",
        textAlign: "center",
        outline: "none",
      });

      document.body.appendChild(input);
      input.focus();
      input.select();

      let cleanupDone = false;

      const performCleanup = () => {
        if (cleanupDone) return;
        cleanupDone = true;

        // Remove event listeners
        input.onkeydown = null;
        input.onblur = null;

       
        setTimeout(() => {
          if (document.body.contains(input)) {
            document.body.removeChild(input);
          }
        }, 10);
      };

      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          updateCode(node.data.label, input.value, node.id);
          performCleanup();
        }
      };

      input.onblur = () => {
        performCleanup();
      };

      event.stopPropagation();
    },
    [updateCode]
  );

  const handleAddNode = useCallback((type = 'default', shape = null) => {
    const newNodeId = `node_${Date.now()}`;
    const newLabel = 'New Node';
    
    // Create node at random position
    const newNode = {
      id: newNodeId,
      type: shape ? 'customShape' : 'default',
      data: {
        label: newLabel,
        shape: shape,
      },
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 400 + 100
      },
      ...(!shape && {
        style: {
          background: "#fff",
          border: "2px solid #333",
          borderRadius: "5px",
          padding: "10px",
        }
      })
    };
  
    // Add to React Flow
    setNodes((nds) => [...nds, newNode]);
  
    // Add to Mermaid code
    const nodeCode = shape 
      ? `${newNodeId}[${newLabel}]\n${newNodeId}@{shape:"${shape}"}`
      : `${newNodeId}[${newLabel}]`;
    
    const newCode = code ? `${code}\n${nodeCode}` : nodeCode;
    setCode(newCode);
    sessionStorage.setItem("code", newCode);
  }, [code, setCode, setNodes]);

  /*** HANDLE EDGE CONNECTIONS ***/
  // const onConnect = useCallback(
  //   (params) => {
  //     const newEdge = {
  //       ...params,
  //       id: `e${params.source}-${params.target}`,
  //       type: "smoothstep",
  //       markerEnd: { type: MarkerType.ArrowClosed },
  //     };

  //     setEdges((eds) => addEdge(newEdge, eds));

  //     // Remove from deletedEdgeIds if previously deleted
  //     setDeletedEdgeIds((prev) => prev.filter((id) => id !== newEdge.id));

  //     // Only add to code if it doesn't exist already
  //     const edgeCode = `${params.source} --> ${params.target}`;
  //     if (!code.includes(edgeCode)) {
  //       const newCode = code + `\n${edgeCode}`;
  //       setCode(newCode);
  //       sessionStorage.setItem("code", newCode);
  //     }
  //   },
  //   [code]
  // );

  const onConnect = useCallback((params) => {
    const edgeId = `e${params.source}-${params.target}`;
    
    // Check if edge already exists
    if (edges.find(e => e.id === edgeId)) {
      return;
    }
  
    const newEdge = {
      ...params,
      id: edgeId,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  
    setEdges((eds) => addEdge(newEdge, eds));
    setDeletedEdgeIds((prev) => prev.filter((id) => id !== edgeId));
  
    // Add to code only if it doesn't exist
    const edgeCode = `${params.source} --> ${params.target}`;
    if (!code.includes(edgeCode)) {
      const newCode = code + `\n${edgeCode}`;
      setCode(newCode);
      sessionStorage.setItem("code", newCode);
    }
  }, [code, edges, setCode, setEdges]);
  /*** NODE DRAGGING ***/
  const onNodeDragStop = useCallback(
    (event, node) => {
      // Update mermaid code with new position
      const posConfig = `${node.id}@{pos: [${Math.round(
        node.position.x
      )}, ${Math.round(node.position.y)}]}`;

      let newCode = code;
      const existingPosIndex = code.indexOf(`${node.id}@{pos:`);

      if (existingPosIndex !== -1) {
        // Replace existing position config
        const lines = code.split("\n");
        const newLines = lines.map((line) =>
          line.includes(`${node.id}@{pos:`) ? posConfig : line
        );
        newCode = newLines.join("\n");
      } else {
        // Add new position config
        newCode = code + `\n${posConfig}`;
      }

      setCode(newCode);
      sessionStorage.setItem("code", newCode);
    },
    [code]
  );

  // Update the onNodesDelete function to be more comprehensive
const onNodesDelete = useCallback(
  (deletedNodes) => {
    const deletedIds = deletedNodes.map((n) => n.id);
    setDeletedNodeIds((prev) => [...prev, ...deletedIds]);

    let newCode = code;

    deletedIds.forEach((id) => {
      // Remove node definitions (all formats)
      const nodePatterns = [
        // id[label]
        new RegExp(`^\\s*${id}\\s*\\[[^\\]]+\\].*$`, 'gm'),
        // id{label}
        new RegExp(`^\\s*${id}\\s*\\{[^}]+\\}.*$`, 'gm'),
        // id(label)
        new RegExp(`^\\s*${id}\\s*\\([^)]+\\).*$`, 'gm'),
        // Any node configuration
        new RegExp(`^\\s*${id}@\\{[^}]+\\}.*$`, 'gm'),
      ];

      nodePatterns.forEach(pattern => {
        newCode = newCode.replace(pattern, '');
      });

      // Remove edges connected to this node (both as source and target)
      const edgePatterns = [
        // source --> target
        new RegExp(`^\\s*${id}\\s*--.*-->\\s*\\w+.*$`, 'gm'),
        new RegExp(`^\\s*\\w+\\s*--.*-->\\s*${id}.*$`, 'gm'),
        // source -- target
        new RegExp(`^\\s*${id}\\s*--\\s*\\w+.*$`, 'gm'),
        new RegExp(`^\\s*\\w+\\s*--\\s*${id}.*$`, 'gm'),
        // conditional edges
        new RegExp(`^\\s*${id}\\s*-->\s*\\|[^|]+\\|\\s*\\w+.*$`, 'gm'),
        new RegExp(`^\\s*\\w+\\s*-->\s*\\|[^|]+\\|\\s*${id}.*$`, 'gm'),
      ];

      edgePatterns.forEach(pattern => {
        newCode = newCode.replace(pattern, '');
      });
    });

    // Clean up empty lines and trim
    newCode = newCode
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n')
      .trim();

    setCode(newCode);
    sessionStorage.setItem('code', newCode);
  },
  [code, setCode]
);

// Update the onEdgesDelete function to handle all edge types
const onEdgesDelete = useCallback(
  (deletedEdges) => {
    const deletedIds = deletedEdges.map((e) => e.id);
    setDeletedEdgeIds((prev) => [...prev, ...deletedIds]);

    let newCode = code;
    
    deletedEdges.forEach((edge) => {
      const { source, target, label } = edge;
      
      // Create patterns for all possible edge formats
      const edgePatterns = [
        // source --> target (simple arrow)
        `^\\s*${source}\\s*-->\\s*${target}.*$`,
        // source -- label --> target (labeled arrow)
        label ? `^\\s*${source}\\s*--\\s*${escapeRegExp(label)}\\s*-->\\s*${target}.*$` : null,
        // source -- target (simple line)
        `^\\s*${source}\\s*--\\s*${target}.*$`,
        // source -->|label| target (conditional)
        label ? `^\\s*${source}\\s*-->\\s*\\|${escapeRegExp(label)}\\|\\s*${target}.*$` : null,
      ].filter(Boolean);

      edgePatterns.forEach(pattern => {
        const regex = new RegExp(pattern, 'gm');
        newCode = newCode.replace(regex, '');
      });
    });

    // Clean up empty lines
    newCode = newCode
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n')
      .trim();

    setCode(newCode);
    sessionStorage.setItem('code', newCode);
  },
  [code, setCode]
);

// Also update the useEffect that cleans up deleted IDs
useEffect(() => {
  if (!validateCode) return;

  // Clean up deleted node IDs that no longer exist
  setDeletedNodeIds((prev) =>
    prev.filter((id) => {
      // Check if node exists in any form
      const nodePatterns = [
        new RegExp(`^\\s*${id}\\[`),
        new RegExp(`^\\s*${id}\\{`),
        new RegExp(`^\\s*${id}\\(`),
        new RegExp(`^\\s*${id}@\\{`),
      ];
      
      return !nodePatterns.some(pattern => pattern.test(validateCode));
    })
  );

  // Clean up deleted edge IDs that no longer exist
  setDeletedEdgeIds((prev) =>
    prev.filter((id) => {
      // Extract source and target from edge ID
      const match = id.match(/^e(\w+)-(\w+)(?:-([^-]+))?$/);
      if (!match) return false;
      
      const [, source, target] = match;
      
      // Check if edge exists in any form
      const edgePatterns = [
        new RegExp(`^\\s*${source}\\s*-->\\s*${target}`),
        new RegExp(`^\\s*${source}\\s*--\\s*${target}`),
        new RegExp(`^\\s*${target}\\s*-->\\s*${source}`),
        new RegExp(`^\\s*${target}\\s*--\\s*${source}`),
      ];
      
      return !edgePatterns.some(pattern => pattern.test(validateCode));
    })
  );
}, [validateCode]);

  // const onNodesDelete = useCallback(
  //   (deletedNodes) => {
  //     const deletedIds = deletedNodes.map((n) => n.id);
  //     setDeletedNodeIds((prev) => [...prev, ...deletedIds]);

  //     let newCode = code;

  //     // Remove node definitions (all formats)
  //     deletedIds.forEach((id) => {
  //       // Remove node definitions: id[label], id{label}, id(label)
  //       const nodeRegex = new RegExp(
  //         `^\\s*${id}\\s*(\\([^)]+\\)|\\{[^}]+\\}|\\[[^]]+\\]).*$`,
  //         "gm"
  //       );
  //       newCode = newCode.replace(nodeRegex, "");

  //       // Remove position config: id@{pos:[x,y]}
  //       const posRegex = new RegExp(
  //         `^\\s*${id}@\\{.*pos:\\s*\\[\\d+,\\s*\\d+\\].*\\}.*$`,
  //         "gm"
  //       );
  //       newCode = newCode.replace(posRegex, "");

  //       // Remove shape config: id@{shape:"shape"}
  //       const shapeRegex = new RegExp(
  //         `^\\s*${id}@\\{.*shape:\\s*[^,}]+.*\\}.*$`,
  //         "gm"
  //       );
  //       newCode = newCode.replace(shapeRegex, "");

  //       // Remove any other @{...} configs for this node
  //       const configRegex = new RegExp(`^\\s*${id}@\\{[^}]+\\}.*$`, "gm");
  //       newCode = newCode.replace(configRegex, "");
  //     });

  //     // Remove edges connected to deleted nodes
  //     deletedIds.forEach((id) => {
  //       // Remove edges where this node is source or target
  //       const edgeRegex = new RegExp(`^\\s*${id}\\s*--.*-->\\s*\\w+.*$`, "gm");
  //       newCode = newCode.replace(edgeRegex, "");

  //       const edgeRegex2 = new RegExp(`^\\s*\\w+\\s*--.*-->\\s*${id}.*$`, "gm");
  //       newCode = newCode.replace(edgeRegex2, "");
  //     });

  //     // Clean up empty lines
  //     newCode = newCode
  //       .split("\n")
  //       .filter((line) => line.trim() !== "")
  //       .join("\n")
  //       .trim();

  //     setCode(newCode);
  //     sessionStorage.setItem("code", newCode);
  //   },
  //   [code, setCode]
  // );

  // const onEdgesDelete = useCallback(
  //   (deletedEdges) => {
  //     const deletedIds = deletedEdges.map((e) => e.id);
  //     setDeletedEdgeIds((prev) => [...prev, ...deletedIds]);

  //     let newCode = code;
  //     deletedEdges.forEach((edge) => {
  //       const { source, target, label } = edge;

  //       // Create precise regex patterns for edge removal
  //       let edgePattern;
  //       if (label) {
  //         // Edge with label: source -- label --> target
  //         edgePattern = `^\\s*${source}\\s*--\\s*${escapeRegExp(
  //           label
  //         )}\\s*-->\\s*${target}.*$`;
  //       } else {
  //         // Edge without label: source --> target
  //         edgePattern = `^\\s*${source}\\s*-->\\s*${target}.*$`;
  //       }

  //       const edgeRegex = new RegExp(edgePattern, "gm");
  //       newCode = newCode.replace(edgeRegex, "");
  //     });

  //     // Clean up empty lines
  //     newCode = newCode
  //       .split("\n")
  //       .filter((line) => line.trim() !== "")
  //       .join("\n")
  //       .trim();

  //     setCode(newCode);
  //     sessionStorage.setItem("code", newCode);
  //   },
  //   [code, setCode]
  // );

  // // Also update the useEffect that cleans up deleted IDs to be more comprehensive
  // useEffect(() => {
  //   if (!validateCode) return;

  //   // Recompute deleted nodes: remove from deletedNodeIds if they no longer exist in code
  //   setDeletedNodeIds((prev) =>
  //     prev.filter((id) => {
  //       // Check if node exists in any form in the code
  //       const nodeExists =
  //         validateCode.includes(`${id}[`) ||
  //         validateCode.includes(`${id}{`) ||
  //         validateCode.includes(`${id}(`) ||
  //         new RegExp(`^\\s*${id}@\\{`).test(validateCode);
  //       return !nodeExists;
  //     })
  //   );

  //   // Recompute deleted edges: remove from deletedEdgeIds if they no longer exist in code
  //   setDeletedEdgeIds((prev) =>
  //     prev.filter((id) => {
  //       // Extract source and target from edge ID (format: eSource-Target or eSource-Target-Label)
  //       const edgeParts = id.replace(/^e/, "").split("-");
  //       const source = edgeParts[0];
  //       const target = edgeParts[1];

  //       // Check if edge exists in code
  //       const edgeExists = new RegExp(
  //         `^\\s*${source}\\s*--.*-->\\s*${target}`
  //       ).test(validateCode);
  //       return !edgeExists;
  //     })
  //   );
  // }, [validateCode]);
  /*** VALIDATE EFFECT ***/
  useEffect(() => {
    if (typeof window !== "undefined" && (autoSync || updateDiagram)) {
      setValidateCodeAndConfig(debounceCode, debounceConfig);
      if (updateDiagram) setUpdateDiagram(false);
    }
  }, [debounceCode, debounceConfig, autoSync, updateDiagram, color.theme]);

  /*** RENDER EFFECT ***/
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      validateCode &&
      !validateCode.startsWith("Syntax error")
    ) {
      renderDiagram(validateCode, validateConfig);
    }
  }, [validateCode, validateConfig, color.theme, fontSizes]);

  // useEffect(() => {
  //   if (!validateCode) return;

  //   // Recompute deleted nodes: any node ID in deletedNodeIds that exists in code should be removed
  //   setDeletedNodeIds((prev) =>
  //     prev.filter(
  //       (id) =>
  //         !validateCode.includes(id + "[") && !validateCode.includes(id + "{")
  //     )
  //   );

  //   // Recompute deleted edges: remove edges from deletedEdgeIds if they exist in code
  //   setDeletedEdgeIds((prev) =>
  //     prev.filter(
  //       (id) =>
  //         !validateCode.includes(id.replace(/^e/, "").replace(/-/g, " --> "))
  //     )
  //   );
  // }, [validateCode]);

  if (validateCode.startsWith("Syntax error")) {
    return (
      <Box
        ref={chartRef}
        component="div"
        sx={{
          height: "100vh !important",
          backgroundImage: `url("${color.image.src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            color: "red",
            px: 2,
            background: "white",
            p: 2,
            borderRadius: 1,
          }}
        >
          {validateCode}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={chartRef}
      component="div"
      sx={{
        height: "100vh !important",
        backgroundImage: `url("${color.image.src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      // Add this inside your return statement, before the ReactFlow component
<Box
  sx={{
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
    background: 'white',
    padding: 1,
    borderRadius: 1,
    boxShadow: 2
  }}
>
  <Button onClick={() => handleAddNode('default')} variant="contained" size="small">
    Add Node
  </Button>
  <Button onClick={() => handleAddNode('customShape', 'circle')} variant="outlined" size="small" sx={{ ml: 1 }}>
    Add Circle
  </Button>
</Box>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeDragStop={onNodeDragStop}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        onEdgesDelete={onEdgesDelete}
        onInit={setReactFlowInstance}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        style={{ background: "transparent" }}
        nodeOrigin={[0.5, 0.5]} // ← ADD THIS LINE
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

// Wrap with ReactFlowProvider
const View = (props) => (
  <ReactFlowProvider>
    <FlowView {...props} />
  </ReactFlowProvider>
);

export default View;
