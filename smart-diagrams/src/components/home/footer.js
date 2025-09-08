import React from "react";
import {Container, Grid, Typography, Link, Box, IconButton} from "@mui/material";
import {Facebook, Instagram, LinkedIn, Close} from "@mui/icons-material";
import logo from '../../asset/home/global/smart-diagrams.png';

const Footer = () => {
    return (
        <Box sx={{backgroundColor: "#212121", color: "#fff", pt: 10}}>
            <Container maxWidth="xl">
                <Box sx={{mb:10}}>
                    <Grid container spacing={4} justifyContent="space-between">
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                textAlign: {xs: "center", md: "unset"}
                            }}>
                                <img src={logo.src} alt="logo" style={{maxWidth: '100%'}}/>
                            </Box>
                            <Typography variant="body2" sx={{
                                mt: 5,
                                mb: 2,
                                fontSize: "20px",
                                fontWeight: "400",
                                color: "#DFDFDF",
                                lineHeight: "30px",
                                letterSpacing: "0.5px",
                                textAlign: {xs: "center", md: "unset"}
                            }}>Lorum ipsum is a dummy text</Typography>
                            <Box sx={{textAlign: {xs: "center", md: "unset"}, mb: 5}}>
                                <IconButton color="inherit" component="a" href="#">
                                    <Facebook/>
                                </IconButton>
                                <IconButton color="inherit" component="a" href="#">
                                    <Instagram/>
                                </IconButton>
                                <IconButton color="inherit" component="a" href="#">
                                    <LinkedIn/>
                                </IconButton>
                                <IconButton color="inherit" component="a" href="#">
                                    <Close/>
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4} md={2}>
                            <Box variant="h6" sx={{
                                fontWeight: "500",
                                fontSize: "24px",
                                lineHeight: "36px",
                                letterSpacing: "0.5px",
                                textAlign: {xs:"center" , sm:"start"},
                            }}>Use Cases</Box>
                            {[
                                "Architecture Diagrams",
                                "Design Docs",
                                "Documentation",
                                "Brainstorming",
                                "Wireframes",
                                "Whiteboard Interview",
                            ].map((item,index) => (
                                <Box sx={{mt: 1}} key={index}>
                                    <Box sx={{
                                        fontSize: "18px",
                                        lineHeight: "27px",
                                        textAlign: {xs:"center" , sm:"start"},
                                        cursor: "pointer",
                                        color: "#DFDFDF",
                                    }}>
                                        {item}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>

                        <Grid item xs={12} sm={4} md={2}>
                            <Box variant="h6" sx={{
                                fontWeight: "500",
                                fontSize: "24px",
                                lineHeight: "36px",
                                letterSpacing: "0.5px",
                                textAlign: {xs:"center" , sm:"start"},
                            }}>Resources</Box>
                            {[
                                "Eraser Examples",
                                "Decision Node",
                                "DiagramGPT",
                                "Docs →",
                                "DesignDocs.dev →",
                            ].map((item,index) => (
                                <Box sx={{mt: 1}} key={index}>
                                    <Box sx={{
                                        fontSize: "18px",
                                        lineHeight: "27px",
                                        textAlign: {xs:"center" , sm:"start"},
                                        cursor: "pointer",
                                        color: "#DFDFDF",
                                    }}>
                                        {item}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>

                        <Grid item xs={12} sm={4} md={2}>
                            <Box variant="h6" sx={{
                                fontWeight: "500",
                                fontSize: "24px",
                                lineHeight: "36px",
                                letterSpacing: "0.5px",
                                textAlign: {xs:"center" , sm:"start"},
                            }}>About</Box>
                            {[
                                "Team",
                                "Slack Community →",
                                "Careers →",
                                "Privacy Policy",
                                "Terms",
                            ].map((item,index) => (
                                <Box sx={{mt: 1}} key={index}>
                                    <Box sx={{
                                        fontSize: "18px",
                                        lineHeight: "27px",
                                        textAlign: {xs:"center" , sm:"start"},
                                        cursor: "pointer",
                                        color: "#DFDFDF",
                                    }}>
                                        {item}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </Box>

                {/* Bottom Section */}
                <Box sx={{
                    borderTop: "1px solid #333",
                    py: 6,
                    display: {sm: "flex"},
                    justifyContent: "space-between",
                }}>
                    <Typography variant="body2">© All Rights Reserved</Typography>
                    <Typography variant="body2">
                        <Link href="#" color="inherit" underline="hover">Privacy Policy</Link> |
                        <Link href="#" color="inherit" underline="hover"> Terms and Conditions</Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;