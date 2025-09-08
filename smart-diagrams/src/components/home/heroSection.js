"use client";
import React from 'react';
import { Box } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import Button from "@mui/material/Button";
import img1 from "../../asset/home/header/Diagram.png";
import bgImg from '../../asset/home/header/Frame.png'
import Header from '../header/Header';

function HeroSection() {
    return (
        <>
            <Box sx={{
                textAlign: "center",
                position: "relative",
                maxWidth: "100%",
            }}>
                <Box sx={{
                    width: "100%", height: { sm: "800px", md: "900px", xs: "650px" },
                    backgroundImage: `url(${bgImg.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <Header />
                    <Box>
                        <Box sx={{
                            fontSize: { md: "72px", sm: "60px", xs: "45px" },
                            fontWeight: "800",
                            lineHeight: { sm: "108px", xs: "60px" },
                            pt: { sm: 15, xs: 10 },
                            color: "#ff3480"
                        }}>
                            AI Smart Diagram
                        </Box>
                        <Box sx={{
                            fontSize: { md: "72px", sm: "60px", xs: "45px" },
                            fontWeight: "800",
                            lineHeight: { sm: "80px", xs: "50px" },
                            color: "#17aca1"
                        }}>
                            for technical design
                        </Box>
                        <Box sx={{
                            fontSize: { sm: "32px", xs: "25px" },
                            fontWeight: "400",
                            lineHeight: "48px",
                            color: '#616161',
                            mt: 6
                        }}>
                            Deliver accurate, consistent designs faster
                        </Box>
                        <Box>
                            <Button sx={{
                                padding: "8px 24px 8px 24px",
                                background: "#ff3480",
                                color: "#fff",
                                borderRadius: "8px",
                                mt: 3,
                                fontWeight: "600",
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}> <span style={{ marginRight: 10 }}>Try Eraser</span> <EastIcon />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRadius: "16px",
                        height: "auto",
                        width: "100%",
                        maxWidth: "1320px",
                        marginTop: { md: -44, sm: -30, xs: -10 },
                        marginLeft: "auto",
                        marginRight: "auto",
                        overflow: "hidden"
                    }}
                >
                    <img
                        src={img1.src}
                        alt="AI Smart Diagram"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default HeroSection;
