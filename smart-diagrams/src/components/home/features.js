"use client";
import React from 'react';
import {Box, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import { Sensors, Build, Feedback, DirectionsRun } from '@mui/icons-material';

function Features(props) {

    // Feature Data array
    const features = [
        {
            icon: <Sensors fontSize="large" color="Dark" />,
            title: "Advanced Sensors",
            description: "Gym-Beam is equipped with state-of-the-art sensors that track your movements with unparalleled precision. These sensors provide real-time data to help you understand and improve your technique."
        },
        {
            icon: <DirectionsRun fontSize="large" color="Dark" />,
            title: "Customizable Routines",
            description: "Tailor your training sessions to your specific needs with Gym-Beam's customizable routines. Whether you're a beginner or an experienced athlete, you can create and adjust routines that align with your skill level and training goals."
        },
        {
            icon: <Feedback fontSize="large" color="Dark" />,
            title: "Real-Time Feedback",
            description: "Receive instant feedback on your performance with Gym-Beam's advanced feedback system. The device analyzes your movements and provides actionable insights to help you improve your form and technique."
        },
        {
            icon: <Build fontSize="large" color="Dark" />,
            title: "Durable and Portable Design",
            description: "Designed for both indoor and outdoor use, Gym-Beam features a durable and portable design that allows you to train wherever and whenever you want. Its robust build ensures it can withstand intense training sessions, while its lightweight design makes it easy to transport."
        },
        {
            icon: <Sensors fontSize="large" color="Dark" />,
            title: "User-Friendly Interface",
            description: "Gym-Beam comes with an intuitive interface that makes it easy to set up and use. Whether you're accessing training data, customizing routines, or reviewing feedback, the user-friendly interface ensures a seamless experience."
        }
    ];

    return (
        <>
            <Box sx={{padding:"70px 0 80px 0", backgroundColor:"#EFFBFA"}}>
                {/* Section Header */}
                <Container maxWidth={"lg"} sx={{ width:"100%" }}>
                    <Box sx={{

                    }}>
                        <Box sx={{
                            p:"7px 25px",
                            backgroundColor:"#fff",
                            color:"#000",
                            fontSize:"15px",
                            borderRadius:"20px",
                            display:"inline-block",
                            justifyContent:"start",
                            alignItems:"center",

                        }}>
                            Features
                        </Box>
                        <Box sx={{
                            fontSize:"30px",
                            color:"#000",
                            display:"flex",
                            justifyContent:"start",
                            alignItems:"center",
                            fontWeight:"900",
                            padding:"20px 0",

                        }}>
                            The Ultimate Electronic Acrobatic Gym
                        </Box>
                        <Box sx={{ flexGrow: 1,paddingTop: '50px' }}>
                            {/* Features Grid */}
                            <Grid container spacing={4}>
                                {features.map((feature, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={4}>
                                        <Card sx={{ height: '280px', borderRadius: 2 }}>
                                            <CardContent sx={{
                                                padding: '30px',
                                            }}>
                                                <Box sx={{
                                                    display:"flex",
                                                }}>
                                                    <Box display="flex" justifyContent="center" alignItems="center" mb={2} sx={{
                                                        color:"#000",
                                                    }}>
                                                        {feature.icon}
                                                    </Box>
                                                    <Typography variant="h6" sx={{
                                                        paddingLeft:"20px"
                                                    }} gutterBottom>
                                                        {feature.title}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Features;