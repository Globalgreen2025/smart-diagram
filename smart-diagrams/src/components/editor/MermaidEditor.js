"use client";


// Import necessary libraries and components

import MonacoEditor from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const MermaidEditor = () => {
    // State management using custom store

    const code = useStore((state) => state.code);
    const setCode = useStore((state) => state.setCode);
    const config = useStore((state) => state.config);
    const setConfig = useStore((state) => state.setConfig);
    const editorMode = useStore((state) => state.editorMode);

    // Local states

    const [isModified, setIsModified] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    // Function to fetch existing flowchart data

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/flowchart/${id}`);
            setCode(response.data.data.mermaidString);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch data on component mount or when ID changes

    useEffect(() => {
        setIsModified(false);
        if (id) {
            fetchData();
        }
    }, [id]);

    // Handles changes in the editor

    const onChange = (value) => {
        if (editorMode === "code") {
            setCode(value);
            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", value);
            }
        } else {
            setConfig(value);
        }
        setIsModified(true);
    };

    // Function to save the current flowchart

    const handleSave = async () => {
        try {
            const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/flowchart/${id}`, { mermaidString: code });
            if (response.status === 200) {
                setIsModified(false);
                toast.success(response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("Error saving:", error);
            toast.error("Error occurred while saving");
        }
    };

    return (
        <Box sx={{ position: "relative", height: "100%" }}>
            {(loading && code) ? (
                // Show loader while fetching data
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {id && (
                        // Save button appears only if an ID is present
                        <Button
                            sx={{
                                zIndex: 999,
                                position: "absolute",
                                top: "80%",
                                right: "10%",
                                backgroundColor: "#FF3480",
                                color: "#fff",
                            }}
                            onClick={handleSave}
                        >
                            Save Chart
                        </Button>
                    )}
                    <MonacoEditor
                        height="calc(100% - 50px)"
                        width="100%"
                        language="mermaid"
                        value={code}
                        onChange={onChange}
                        options={{ minimap: { enabled: false } }}
                        onMount={(editor, monaco) => {
                            try {
                                initEditor(monaco);
                            } catch (error) {
                                console.error("Error initializing Monaco editor:", error);
                            }
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default MermaidEditor;
