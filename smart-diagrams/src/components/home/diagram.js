"use client";
import React from 'react';
import img1 from '../../asset/home/diagram/img1.png';
import img2 from '../../asset/home/diagram/img 2.png';
import img3 from '../../asset/home/diagram/img 3.png';
import img4 from '../../asset/home/diagram/img 4.png';
import img5 from '../../asset/home/diagram/img5.png';
import img6 from '../../asset/home/diagram/img6.png';
import img7 from '../../asset/home/diagram/img7.png';
import img8 from '../../asset/home/diagram/img8.png';
import icon1 from '../../asset/home/diagram/icon1.png';
import icon2 from '../../asset/home/diagram/icon 2.png';
import icon3 from '../../asset/home/diagram/icon 3.png';
import icon4 from '../../asset/home/diagram/icon 4.png';
import {Box, Container, Typography} from '@mui/material';

function Diagram() {
    // Data array holding all diagram sections and their respective properties
    const data = [
        {
            name: 'Speed',
            img: img1,
            title: "Beautiful by default, created in seconds",
            description: "Diagram-as-code ensures that your diagrams are always legible and easily maintainable. Spend more time thinking, less time moving boxes around.",
            bgColor: "#8FD14F1A",
            textColor: "#4A8610",
            icon: icon1,
            group: img5,
            rectangleColor: "#fff",
            borderColor: "#CEEAB3",
        },
        {
            name: 'Usability',
            img: img2,
            title: "Documentation you will enjoy creating",
            description: "Eraser has the best qualities of polished modern software without pesky distractions that can throw you off the rails. Maintain flow and focus with a minimal tool design.",
            bgColor: "#FFF9E2",
            textColor: "#8B6D00",
            icon: icon2,
            group: img6,
            rectangleColor: "#EFFBFA",
            borderColor: "#FCDE70",
        },
        {
            name: 'Workflow',
            img: img3,
            title: "Plug and play with your workflow",
            description: "Eraser is easy to adopt into any workflow with our API, integrations, markdown, and export capabilities.",
            bgColor: "#ECF2FF",
            textColor: "#1E328D",
            icon: icon3,
            group: img7,
            rectangleColor: "#F6F6F6",
            borderColor: "#B8CCF3",
        },
        {
            name: 'Enterprise',
            img: img4,
            title: "Secure and govern seamlessly",
            description: "Eraser is proudly trusted by some of the largest companies in the world and their security teams.",
            bgColor: "#FFFAF3",
            textColor: "#6A4412",
            icon: icon4,
            group: img8,
            rectangleColor: "#fff",
            borderColor: "#F8E1B7",
        },
    ];

    return (
        <Box>
            {/* Loop through each data item to render individual diagram sections */}
            {data.map((item, index) => (
                <Box key={index} sx={{ backgroundColor: item.rectangleColor , py:15}}>
                    <Container maxWidth="lg">
                        <Box sx={{display: 'flex' , alignItems: {xs:"center" , md:'start'}}}>
                            {/* Group image displayed on the left */}
                            <Box>
                                <img src={item.group.src}
                                     style={{width: '100%', height: "100%", objectFit: 'contain'}}/>
                            </Box>
                            {/* Content area */}
                            <Box>
                                {/* Tag section with icon, name, and background color */}
                                <Box sx={{
                                    display: "inline-block",
                                    p:"7px 25px",
                                    fontSize:"15px",
                                    borderRadius: "30px",
                                    backgroundColor: item.bgColor,
                                    color: item.textColor,
                                    border:`1px solid ${item.borderColor}`,
                                    ml:2
                                }}>
                                    {/* Section title */}
                                    <Typography sx={{display: "flex", alignItems: 'center'}}>
                                        <img src={item.icon.src} width={25} style={{marginRight: 10 , marginBottom:2}}/>
                                        {item.name}
                                    </Typography>
                                </Box>
                                {/* Section description */}
                                <Typography component="h2" variant="h5"
                                            sx={{fontWeight: 700, my: 2, fontSize: {xs: "18px", sm: "24px"},ml:3}}>
                                    {item.title}
                                </Typography>
                                <Typography component="p" sx={{fontSize: {xs: "14px", sm: '16px'}, color: '#666',ml:3}}>
                                    {item.description}
                                </Typography>

                                {/* Main image related to the section */}
                                <img src={item.img.src} alt={item.title} style={{width: '100%' , objectFit:"cover"}}/>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            ))}
        </Box>
    );
}

export default Diagram;
