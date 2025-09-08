// "use client";
// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Grid,
//   IconButton,
//   Typography
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useStore } from "@/store";

// const NodeAdder = () => {
//   const [open, setOpen] = useState(false);
//   const [nodeType, setNodeType] = useState("rectangle");
//   const [nodeText, setNodeText] = useState("");
//   const [connectTo, setConnectTo] = useState("");
//   const code = useStore((state) => state.code);
//   const setCode = useStore((state) => state.setCode);
//   const [availableNodes, setAvailableNodes] = useState([]);

//   // Extract available nodes from the current code
//   useEffect(() => {
//     if (code) {
//       const nodeRegex = /(\w+)(?=\[.*\]|\{.*\}|\(.*\))/g;
//       const nodes = [];
//       let match;
      
//       while ((match = nodeRegex.exec(code)) !== null) {
//         if (match[1] && !nodes.includes(match[1]) && match[1] !== "flowchart") {
//           nodes.push(match[1]);
//         }
//       }
      
//       setAvailableNodes(nodes);
//       if (nodes.length > 0 && !connectTo) {
//         setConnectTo(nodes[nodes.length - 1]);
//       }
//     }
//   }, [code, connectTo]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setNodeType("rectangle");
//     setNodeText("");
//   };

//   const getNodeCode = (id, text, type) => {
//     const baseId = `node${Date.now().toString().slice(-4)}`;
    
//     switch (type) {
//       case "rectangle":
//         return `${id}["${text}"]`;
//       case "rounded":
//         return `${id}("${text}")`;
//       case "circle":
//         return `${id}(("${text}"))`;
//       case "diamond":
//         return `${id}{"${text}"}`;
//       case "stadium":
//         return `${id}(["${text}"])`;
//       case "subroutine":
//         return `${id}[["${text}"]]`;
//       case "cylinder":
//         return `${id}[("${text}")]`;
//       case "rhombus":
//         return `${id}>"${text}"]`;
//       default:
//         return `${id}["${text}"]`;
//     }
//   };

//   const handleAddNode = () => {
//     if (!nodeText.trim()) return;
    
//     const newNodeId = `node${Date.now().toString().slice(-4)}`;
//     const newNodeCode = getNodeCode(newNodeId, nodeText, nodeType);
    
//     let newCode = code;
    
//     // Remove the last closing bracket if it exists to add content before it
//     if (newCode.trim().endsWith("```")) {
//       newCode = newCode.trim().slice(0, -3);
//     }
    
//     // Add the new node
//     newCode += `\n    ${newNodeCode}`;
    
//     // Add connection if selected
//     if (connectTo) {
//       newCode += `\n    ${connectTo} --> ${newNodeId}`;
//     }
    
//     // Add back the closing bracket if it was removed
//     if (code.trim().endsWith("```")) {
//       newCode += "\n```";
//     }
    
//     setCode(newCode);
    
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("code", newCode);
//     }
    
//     handleClose();
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         startIcon={<AddIcon />}
//         onClick={handleOpen}
//         sx={{ mb: 2 }}
//       >
//         Add Node
//       </Button>
      
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New Node</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Node Type"
//                 value={nodeType}
//                 onChange={(e) => setNodeType(e.target.value)}
//               >
//                 <MenuItem value="rectangle">Rectangle</MenuItem>
//                 <MenuItem value="rounded">Rounded</MenuItem>
//                 <MenuItem value="circle">Circle</MenuItem>
//                 <MenuItem value="diamond">Diamond</MenuItem>
//                 <MenuItem value="stadium">Stadium</MenuItem>
//                 <MenuItem value="subroutine">Subroutine</MenuItem>
//                 <MenuItem value="cylinder">Cylinder</MenuItem>
//                 <MenuItem value="rhombus">Rhombus</MenuItem>
//               </TextField>
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Node Text"
//                 value={nodeText}
//                 onChange={(e) => setNodeText(e.target.value)}
//                 placeholder="Enter node text"
//               />
//             </Grid>
            
//             {availableNodes.length > 0 && (
//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Connect to Node (Optional)"
//                   value={connectTo}
//                   onChange={(e) => setConnectTo(e.target.value)}
//                 >
//                   <MenuItem value="">None</MenuItem>
//                   {availableNodes.map((node) => (
//                     <MenuItem key={node} value={node}>
//                       {node}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleAddNode} variant="contained">
//             Add Node
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default NodeAdder;
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "@/store";

const NodeAdder = () => {
  const [open, setOpen] = useState(false);
  const [nodeType, setNodeType] = useState("rectangle");
  const [nodeText, setNodeText] = useState("");
  const [connectTo, setConnectTo] = useState("");
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const [availableNodes, setAvailableNodes] = useState([]);

  // Extract available nodes from the current code
  useEffect(() => {
    if (code) {
      const nodeRegex = /(\w+)(?=\[.*\]|\{.*\}|\(.*\))/g;
      const nodes = [];
      let match;
      
      while ((match = nodeRegex.exec(code)) !== null) {
        if (match[1] && !nodes.includes(match[1]) && match[1] !== "flowchart") {
          nodes.push(match[1]);
        }
      }
      
      setAvailableNodes(nodes);
      if (nodes.length > 0 && !connectTo) {
        setConnectTo(nodes[nodes.length - 1]);
      }
    }
  }, [code, connectTo]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNodeType("rectangle");
    setNodeText("");
  };

  const getNodeCode = (id, text, type) => {
    switch (type) {
      case "rectangle":
        return `${id}["${text}"]`;
      case "rounded":
        return `${id}("${text}")`;
      case "circle":
        return `${id}(("${text}"))`;
      case "diamond":
        return `${id}{"${text}"}`;
      case "stadium":
        return `${id}(["${text}"])`;
      case "subroutine":
        return `${id}[["${text}"]]`;
      case "cylinder":
        return `${id}[("${text}")]`;
      case "rhombus":
        return `${id}>"${text}"]`;
      case "hexagon":
        return `${id}{{"${text}"}}`;
      default:
        return `${id}["${text}"]`;
    }
  };

  const handleAddNode = () => {
    if (!nodeText.trim()) return;
    
    const newNodeId = `node${Date.now().toString().slice(-4)}`;
    const newNodeCode = getNodeCode(newNodeId, nodeText, nodeType);
    
    let newCode = code;
    
    // Remove the last closing bracket if it exists to add content before it
    if (newCode.trim().endsWith("```")) {
      newCode = newCode.trim().slice(0, -3);
    }
    
    // Find the position of the last "end" statement in subgraphs
    const lastEndIndex = newCode.lastIndexOf("    end");
    
    if (lastEndIndex !== -1) {
      // Insert the new node before the "end" statement inside the subgraph
      const beforeEnd = newCode.substring(0, lastEndIndex);
      const afterEnd = newCode.substring(lastEndIndex);
      
      // Add the new node with proper indentation (4 spaces)
      newCode = beforeEnd + `\n    ${newNodeCode}`;
      
      // Add connection if selected (also inside the subgraph)
      if (connectTo) {
        newCode += `\n    ${connectTo} --> ${newNodeId}`;
      }
      
      // Add back the end statement and anything after it
      newCode += `\n${afterEnd}`;
    } else {
      // If no subgraph found, just append normally
      newCode += `\n    ${newNodeCode}`;
      
      // Add connection if selected
      if (connectTo) {
        newCode += `\n    ${connectTo} --> ${newNodeId}`;
      }
    }
    
    // Add back the closing bracket if it was removed
    if (code.trim().endsWith("```")) {
      newCode += "\n```";
    }
    
    setCode(newCode);
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem("code", newCode);
    }
    
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add Node
      </Button>
      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Node</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Node Type"
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value)}
              >
                <MenuItem value="rectangle">Rectangle</MenuItem>
                <MenuItem value="rounded">Rounded</MenuItem>
                <MenuItem value="circle">Circle</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
                <MenuItem value="stadium">Stadium</MenuItem>
                <MenuItem value="subroutine">Subroutine</MenuItem>
                <MenuItem value="cylinder">Cylinder</MenuItem>
                <MenuItem value="rhombus">Rhombus</MenuItem>
                <MenuItem value="hexagon">Hexagon</MenuItem>
                
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Node Text"
                value={nodeText}
                onChange={(e) => setNodeText(e.target.value)}
                placeholder="Enter node text"
              />
            </Grid>
            
            {availableNodes.length > 0 && (
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Connect to Node (Optional)"
                  value={connectTo}
                  onChange={(e) => setConnectTo(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {availableNodes.map((node) => (
                    <MenuItem key={node} value={node}>
                      {node}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNode} variant="contained">
            Add Node
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NodeAdder;