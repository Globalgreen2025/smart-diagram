"use client";

import React from "react";
import {Box, Button, Card, Typography} from "@mui/material";
import {Toaster} from "react-hot-toast";

function Page() {

    // Function to handle LinkedIn login redirect
    const handleLogin = () => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/linkedin/callback`,
            scope: "openid email profile",
        });

        // Redirect to LinkedIn authorization URL
        if (typeof window !== "undefined") {
            window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
        }
    };
    return (<Box
        sx={{
            display: "flex",
            justifyContent:'center',
            alignItems: 'center',
            height: '100vh',
            background:'#ccc'
        }}
    >
        <Toaster/>
        <Card
            sx={{
                p: {md: 4, xs: 2}, width: {sm: 500, xs: "100%"}, boxShadow: "none", borderRadius: 3,
            }}
        >
            <Box sx={{fontSize: 32, fontWeight: "bold", mb: 1}}>Sign In</Box>
            <Typography component="div" sx={{mb: 1, fontSize: 14}}>
                Welcome Back. Sign in to get started.
            </Typography>
            <Box display="flex" justifyContent="center" sx={{mt: 3}}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{fontWeight: 600, textTransform: "none"}}
                    onClick={handleLogin}
                >
                    Continue with LinkedIn
                </Button>
            </Box>
        </Card>
    </Box>);
}

export default Page;
