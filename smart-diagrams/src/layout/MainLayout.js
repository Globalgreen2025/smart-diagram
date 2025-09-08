'use client';

import React, {useState} from "react";
import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Sidebar from "@/layout/Sidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

const drawerWidth = 275;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function MainLayout({children, setSidebarKey, sidebarKey}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = useState(false);

const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    flexGrow: 1, transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), marginLeft: `-${collapsed ? 60 : 200}px`, ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }), marginLeft: 0,
    }),
}));
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (<Box sx={{display: "flex"}}>
        <Box
            component="nav"
            sx={{width: {md: collapsed ? 70 : 200}, flexShrink: {md: 0}}}
            aria-label="mailbox folders"
        >
            <Sidebar
                setCollapsed={setCollapsed}
                collapsed={collapsed}
                setSidebarKey={setSidebarKey}
                sidebarKey={sidebarKey}
                open={true}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
                setOpen={setOpen}
            />
        </Box>

        <Main open={true}>
            <Box>
                <DashboardHeader handleDrawerToggle={handleDrawerToggle}/>
                {children}
            </Box>
        </Main>
    </Box>);
}
