"use client"
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container } from "@mui/material";


function Faq() {

    // State to manage which accordion is expanded
    const [expanded, setExpanded] = React.useState(false);

    // Toggle accordion expansion
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    // FAQ data array
    const faqData = [
        {
            "title": "Flowchart Diagrams",
            "content": "Flowcharts are useful for visualizing processes. In Mermaid.js, you can create flowcharts using 'graph TD' or 'graph LR' syntax.",
            "defaultExpanded": true
        },
        {
            "title": "Sequence Diagrams",
            "content": "Sequence diagrams illustrate how objects interact in a particular sequence. Mermaid.js supports actors and messages using 'sequenceDiagram'.",
            "defaultExpanded": false
        },
        {
            "title": "Gantt Charts",
            "content": "Gantt charts help track project schedules. In Mermaid.js, use 'gantt' to define tasks, dates, and dependencies.",
            "defaultExpanded": false
        },
        {
            "title": "Class Diagrams",
            "content": "Class diagrams represent object-oriented structures. Mermaid.js supports 'classDiagram' to define classes and relationships.",
            "defaultExpanded": false
        },
        {
            "title": "State Diagrams",
            "content": "State diagrams help visualize state changes in a system. Mermaid.js uses 'stateDiagram' to define transitions and states.",
            "defaultExpanded": false
        },
        {
            "title": "Entity Relationship Diagrams (ERD)",
            "content": "ER diagrams show relationships between entities. Mermaid.js allows defining entities and their connections using 'erDiagram'.",
            "defaultExpanded": false
        }
    ];

    return (
        <Box sx={{backgroundColor:"#F6F6F6" , py:15}}>
            <Container maxWidth="lg">
                <Box sx={{color:"#212121" , fontSize:{xs:"24px" , sm:"35px" , md:"56px"} , fontWeight:800 , textAlign:"center" , mb:10}}>Frequently Asked Questions</Box>
                {/* FAQ Accordion */}
                {faqData.map((faq, index) => (
                    <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        key={index}
                        disableGutters
                        sx={{
                            boxShadow: 'none',
                            backgroundColor: "transparent",
                            "&.Mui-expanded": {
                                mb: 1,
                                boxShadow: 'none',
                            },
                            "& .MuiAccordionSummary-root.Mui-expanded": {
                                backgroundColor: "transparent",
                                borderBottom: "1px solid #c4cdd5",
                                padding: "0",
                            },
                            "& .MuiAccordionSummary-root": {
                                transition: "none",
                                padding: "0",
                                borderBottom: "1px solid #c4cdd5",
                            },
                        }}
                    >
                        {/* Accordion Summary */}
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            <Typography component="span">{faq.title}</Typography>
                        </AccordionSummary>

                        {/* Accordion Details */}
                        <AccordionDetails sx={{ padding: "16px 0 8px 0",  }}>
                            <Typography>{faq.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>
        </Box>
    );
}

export default Faq;
