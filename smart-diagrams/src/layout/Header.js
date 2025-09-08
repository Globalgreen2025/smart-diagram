"use client";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ handleDrawerToggle }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: 67,
            }}
        >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                    display: { xs: "block", sm: "none" },
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ fontSize: 16, color: 'darkBlue' }}>
                Workflows
            </Typography>
        </Box>
    );
};

export default Header;
