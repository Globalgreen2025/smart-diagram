"use client";

// Importing necessary dependencies and assets
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Importing shape and icon images
import Rectangle from '../../asset/editor/snippets/Rectangle.png'
import Rounded from '../../asset/editor/snippets/Rounded.png'
import Stadium from '../../asset/editor/snippets/Stadium.png'
import Subroutine from '../../asset/editor/snippets/Subroutine.png'
import Database from '../../asset/editor/snippets/database.png'
import Decision from '../../asset/editor/snippets/Decision.png'
import Circle from '../../asset/editor/snippets/Circle.png'
import Asymmetric from '../../asset/editor/snippets/Asymmetric.png'
import Parallelogram from '../../asset/editor/snippets/Parallelogram.png'
import ParallelogramReverser from '../../asset/editor/snippets/Reversed.png'
import Trapezoid from '../../asset/editor/snippets/Trapezoid.png'
import TrapezoidReversed from '../../asset/editor/snippets/Trapezoid Reversed.png'
import DoubleCircle from '../../asset/editor/snippets/Double Circle.png'
import Arrow from '../../asset/editor/snippets/Arrow.png'
import ThickArrow from '../../asset/editor/snippets/Thick Arrow.png'
import DashedArrow from '../../asset/editor/snippets/Dashed Arrow.png'
import ArrowWithLabel from '../../asset/editor/snippets/Arrow with Label.png'
import Hexagon from '../../asset/editor/snippets/Hexagon.png'
import file from '../../asset/editor/snippets/file-text.png'
import plus from '../../asset/editor/snippets/plus.png'
import toast from "react-hot-toast";
import { useStore } from "@/store";

function Snippets(props) {
    // State to manage copy-to-clipboard functionality
    const [isCopied, setIsCopied] = useState(false);
    const [textToCopy, setTextToCopy] = useState('');
    // Accessing global store functions and state
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);

    // Function to copy text to clipboard with toast notification
    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success('Copied!');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy!');
            console.error('Failed to copy:', err);
            setIsCopied(false);
        }
    }, []);

    // Effect to copy text when textToCopy state updates
    useEffect(() => {
        if (textToCopy) {
            copyToClipboard(textToCopy);
        }
    }, [textToCopy, copyToClipboard]);

    // Handle drag start to allow dragging code snippets
    const handleDragStart = (e, code) => {
        e.dataTransfer.setData("text/plain", code);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedCode = e.dataTransfer.getData("text/plain");
        if (draggedCode) {
            setCode(code + draggedCode);
        }
    };

    // Allow dropping by preventing default behavior
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Data for flowchart shapes and edges with corresponding images and codes
    const data = [{
        mainTitle: "Flowchart Shapes", subData: [{
            title: "Rectangle", img: Rectangle, code: '\nrectId["label"]'
        }, {
            title: "Rounded", img: Rounded, code: '\nroundedId("label")'
        }, {
            title: "Stadium", img: Stadium, code: '\nstadiumId(["label"])'
        }, {
            title: "Subroutine", img: Subroutine, code: '\nsubId[["label"]]'
        }, {
            title: "Database", img: Database, code: '\ndbId[["label"]]'
        }, {
            title: "Decision", img: Decision, code: '\ndecisionId{"label"}'
        }, {
            title: "Circle", img: Circle, code: '\ncircleId(("label"))'
        }, {
            title: "Asymmetric", img: Asymmetric, code: '\nasymmetricId>"label"]'
        }, {
            title: "Hexagon", img: Hexagon, code: '\nhexId{{"label"}}'
        }, {
            title: "Parallelogram", img: Parallelogram, code: '\nparaId[/"label"/]'
        }, {
            title: "Parallelogram Reverser", img: ParallelogramReverser, code: '\nparaRevId[\\"label"\\]'
        }, {
            title: "Trapezoid", img: Trapezoid, code: '\ntrapId[/"label"\\]'
        }, {
            title: "Trapezoid Reversed", img: TrapezoidReversed, code: '\ntrapRevId[\\"label"/]'
        }, {
            title: "DoubleCircle", img: DoubleCircle, code: '\ndoubleCircleId((("label")))'
        },]
    }, {
        mainTitle: "Flowchart Edges", subData: [{
            title: "Arrow", img: Arrow, code: '\n-->'
        }, {
            title: "Thick Arrow", img: ThickArrow, code: '\n==>'
        }, {
            title: "Dashed Arrow", img: DashedArrow, code: '\n-.->'
        }, {
            title: "Arrow with Label", img: ArrowWithLabel, code: '\n-- label -->'
        },]
    }]

    // Access MUI theme for styling
    const theme = useTheme();

    return (
        <Box sx={{ px: 1, py: 2 }}>
            <Grid container>
                {data.map((item, index) => (
                    <Box key={index}>

                        {/* Section title (Flowchart Shapes / Edges) */}
                        <Grid item xs={12} key={index}>
                            <Box>{item.mainTitle}</Box>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>

                            {/* Render snippets for each shape/edge */}
                            {item.subData.map((subItem, index) => (
                                <>
                                    <Box key={index} width={90} draggable sx={{cursor:'grab'}} onDragStart={(e) => handleDragStart(e, subItem.code)}>
                                        <Box fontSize={12} textAlign={"center"} mt={2} height={45}>
                                            {subItem.title}
                                        </Box>

                                        {/* Snippet box with image and controls */}
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: `1px solid ${theme.palette.liteGray}`
                                        }}>

                                            {/* Snippet image */}
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                backgroundColor: 'lightPink',
                                                p: 2,
                                                borderBottom: `1px solid ${theme.palette.liteGray}`
                                            }}>
                                                <img src={subItem.img.src} />
                                            </Box>

                                            {/* Copy and Add buttons */}
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                p: 1,
                                            }}>
                                                {/* Copy to clipboard */}
                                                <Box mt={0.2} sx={{ cursor: 'pointer' }} onClick={() => {
                                                    if (subItem.code) {
                                                        setTextToCopy(subItem.code)
                                                    }
                                                }} className="copy-button" aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}>
                                                    <img src={file.src} />
                                                </Box>
                                                <Box color={'liteGray'}>|</Box>
                                                {/* Add to editor */}
                                                <Box mt={0.3} sx={{ cursor: 'pointer' }}>
                                                    <img src={plus.src} onClick={() => setCode(code + subItem.code)} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Grid>

        </Box>
    );
}

export default Snippets;
