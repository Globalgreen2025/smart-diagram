"use client"
import React from "react";
import {
    AppBar, Toolbar, Button, Typography, IconButton, Breadcrumbs, Link, Avatar, Box, useMediaQuery
} from "@mui/material";
import {Share, Brightness4, Brightness7, Menu} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useTheme} from "@mui/material/styles";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import {usePathname, useRouter} from "next/navigation";

export default function DashboardHeader({handleDrawerToggle}) {

    // State for dark mode toggle
    const [darkMode, setDarkMode] = React.useState(false);
    // State for mobile menu toggle
    const [menuOpen, setMenuOpen] = React.useState(false);
    const pathName = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter();

    return (
        <AppBar position="static"
                    sx={{backgroundColor: "#F8F8FA", color: "#000", boxShadow: "none", py: 1, px: {xs: 2, sm: 4}}}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

            {/* Breadcrumbs for navigation (hidden on mobile) */}
            {!isMobile && (<Box>

                    <Breadcrumbs separator="›" sx={{flexGrow: 1}}>
                        <Link underline="hover" color="inherit" href="/dashboard">Dashboard</Link>s
                        <Typography color="textPrimary" sx={{textTransform: "capitalize"}}>Editor</Typography>
                    </Breadcrumbs>
                </Box>

            )}
            {/* Navigation Buttons */}
            <Box>
                {isMobile ? (<Box>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                        <Menu/>
                    </IconButton>
                </Box>) : (<Box sx={{display: "flex", gap: 1}}>
                    <Button sx={{color: "#000"}}>Mermaid AI</Button>
                    <Button variant="contained" sx={{backgroundColor: "#f72585", color: "#fff"}}>Editor</Button>
                    <Button sx={{color: "#000"}}>Whiteboard</Button>
                </Box>)}
            </Box>

            {/* User Actions: Share, Messages, Dark Mode Toggle, Logout, Avatar */}
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                <Button
                    variant="contained"
                    sx={{backgroundColor: "#fff", color: "#171717", display: {xs: "none", sm: "flex"}, gap: 1}}
                >
                    <Share/>
                    Share
                </Button>

                <IconButton sx={{color: "#171717", border: "#EFEFEF 1px solid"}}>
                    <MessageOutlinedIcon/>
                </IconButton>

                {/* Dark mode toggle */}
                <IconButton onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <Brightness7/> : <Brightness4/>}
                </IconButton>

                {/* Logout Button */}
                <Button
                    onClick={()=> {
                        router.push("/")
                        sessionStorage.removeItem('token')
                    }}
                    variant="contained"
                    sx={{ color: "#fff", display: {xs: "none", sm: "flex"}, gap: 1}}
                >
                    <LogoutIcon/>
                    Log Out
                </Button>
                {/* User Avatar */}
                <Avatar src="https://mui.com/static/images/avatar/1.jpg"/>
            </Box>
        </Box>

            {/* Mobile Dropdown Menu */}
        {isMobile && menuOpen && (<Box sx={{display: "flex", flexDirection: "column", px: 2, py: 1}}>
            <Button sx={{color: "#000"}}>Mermaid AI</Button>
            <Button variant="contained" sx={{backgroundColor: "#f72585", color: "#fff", my: 1}}>Editor</Button>
            <Button sx={{color: "#000"}}>Whiteboard</Button>
            <Button variant="contained" sx={{backgroundColor: "#fff", color: "#171717", my: 1, gap: 1}}>
                <Share/>
                Share
            </Button>
        </Box>)}
    </AppBar>
    );
}
