import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { allTemplates } from "@/constants/allTemplates";
import { useTheme } from "@mui/material/styles";
import { useStore } from "@/store";
import {useRouter} from "next/navigation";

function Templates() {

    // State hooks to manage component states
    const [activeIndex, setActiveIndex] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [open, setOpen] = useState(false);
    const [templateName, setTemplateName] = useState("All");
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const theme = useTheme();
    const router = useRouter()

    // List of template category buttons
    const buttons = [
        "All", "Architecture", "Block", "C4 Diagram", "Class Diagram",
        "ER Diagram", "Flowchart", "Gantt Chart", "Git Graph", "Mindmap",
        "Pie Chart", "Quadrant Chart", "Requirement Diagram", "Sankey Diagram",
        "Sequence Diagram", "State Diagram", "Timeline", "User Journey", "XY Chart",
    ];

    // Effect to filter templates based on selected category
    useEffect(() => {
        if (templateName === "All") {
            setTemplates(allTemplates.flatMap((template) => template.content));
        } else {
            const selectedTemplate = allTemplates.find((template) => template.title === templateName);
            setTemplates(selectedTemplate ? selectedTemplate.content : []);
        }
    }, [templateName]);

    // Open modal with selected template
    const handleOpen = (template) => {
        setSelectedTemplate(template);
        setOpen(true);
    };

    // Close modal
    const handleClose = () => {
        setOpen(false);
        setSelectedTemplate(null);
    };

    // Handle drag start for templates
    const handleDragStart = (event, template) => {
        event.dataTransfer.setData("text/plain", template.code);
    };

    // Handle drop event to replace code
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedCode = event.dataTransfer.getData("text/plain");
        if (droppedCode) {
            // 🔥 Replace the existing code instead of just pasting it
            setCode(droppedCode);
        }
    };

    // Allow dropping by preventing default behavior
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Box>
            <Typography textAlign="center" variant="subtitle1" my={2}>
                Templates
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "space-between", px: 1 }}>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        onClick={() => {
                            setActiveIndex(index);
                            setTemplateName(button);
                        }}
                        sx={{
                            boxShadow: "none",
                            fontSize: "12px",
                            flex: "1 1 auto",
                            backgroundColor: activeIndex === index ? theme.palette?.sidebarHover : "lightPink",
                            color: activeIndex === index ? "#fff" : theme.palette?.sidebarHover,
                            borderRadius: "4px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: theme.palette?.sidebarHover,
                                color: "#fff",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {button}
                    </Button>
                ))}
            </Box>

            {/* Templates */}
            <Box p={1}>
                {templates.map((template, index) => (
                    <Box
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template)}
                        onClick={() => handleOpen(template)}
                    >
                        <Box
                            sx={{
                                cursor: "grab",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                p: 2,
                                backgroundColor: "#fffcfd",
                                transition: "box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.01)",
                                },
                                mb: 1,
                                borderRadius: 2,
                                maxWidth: 390,
                                height: "auto",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Box sx={{ height: "200px", width: "200px" }}>
                                    <img
                                        src={template.img.src}
                                        alt={template.dec}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Typography sx={{ textAlign: "center", textWrap: "wrap", mt: 2 }} color="sidebarHover">
                                {template.dec}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>


            <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 24, width: "80%", maxWidth: "640px" }}>
                    {selectedTemplate && (
                        <>
                            <Typography sx={{ fontSize: "22px", fontWeight: 600, color: "sidebarHover" }}>
                                Replace diagram?
                            </Typography>
                            <Typography sx={{ fontSize: "16px", color: "sidebarHover", mt: 2 }}>
                                This will replace your current diagram code.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    sx={{ mx: 1, color: "sidebarHover", borderColor: "sidebarHover", "&:hover": { backgroundColor: "pink" } }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: 'sidebarHover' }}
                                    onClick={() => {
                                        setCode(selectedTemplate.code);
                                        router.push(`/editor`);
                                        typeof window !== "undefined" && sessionStorage.setItem('code',selectedTemplate.code);
                                        handleClose();
                                    }}
                                >
                                    Replace
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

export default Templates;
