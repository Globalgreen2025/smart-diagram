"use client";

import React, {useEffect, useState} from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    InputBase,
    IconButton,
    Avatar,
    Stack,
    AvatarGroup,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Table from "@/components/dashboard/Table";
import img from "../../asset/dashboard1/Ellipse.png";
import Cookies from "js-cookie";
import {useRouter, useSearchParams} from "next/navigation";


const Dashboard = () => {
    const searchParams = useSearchParams()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const router = useRouter();
    

    const [menuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


       
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Store token in sessionStorage
            sessionStorage.setItem('token', token);
            
            // Remove token from URL
            router.replace('/dashboard');
        }
        
        // Check if user is authenticated
        const checkAuth = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            
            // Verify token with backend
            try {
                const response = await fetch('https://smart-diagram.onrender.com/api/linkedin/get-user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }
                
                // User is authenticated, proceed
            } catch (error) {
                router.push('/login');
            }
        };
        
        checkAuth();
    }, [router, searchParams]);
    

  
    return (
        <Box sx={{bgcolor: "#fff", minHeight: "100vh",}}>
            <AppBar
                position="static"
                color="inherit"
                elevation={0}
                sx={{borderBottom: "1px solid #ddd"}}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <TabContext value={value}>
                        <Box sx={{flexGrow: 1, display: isSmallScreen ? "none" : "block",pt:1}}>
                            <TabList
                                onChange={handleChange}
                                aria-label="tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    "& .MuiTab-root.Mui-selected": {
                                        border: "2px solid #FF3480",
                                        bgcolor: 'lightPink',
                                        color: "#FF3480 !important",
                                    },
                                }}
                            >
                                <Tab
                                    label="All"
                                    value="1"
                                    sx={{
                                        border: "1px solid transparent",
                                        padding: "8px 18px !important",
                                        minHeight: "auto",
                                        minWidth: "auto",
                                        textTransform:"capitalize"
                                    }}
                                />

                                <Tab label="Recents" value="2" sx={{
                                    border: "1px solid transparent",
                                    padding: "8px 18px !important",
                                    minHeight: "auto",
                                    minWidth: "auto",
                                    textTransform:"capitalize"
                                }}/>
                                <Tab label="Created by Me" value="3" sx={{
                                    border: "1px solid transparent",
                                    padding: "8px 18px !important",
                                    minHeight: "auto",
                                    minWidth: "auto",
                                    textTransform:"capitalize"
                                }}/>
                                <Tab label="Folders" value="4" sx={{
                                    border: "1px solid transparent",
                                    padding: "8px 18px !important",
                                    minHeight: "auto",
                                    minWidth: "auto",
                                    textTransform:"capitalize"
                                }}/>
                                <Tab label="Unsorted" value="5" sx={{
                                    border: "1px solid transparent",
                                    padding: "8px 18px !important",
                                    minHeight: "auto",
                                    minWidth: "auto",
                                    textTransform:"capitalize"
                                }}/>
                            </TabList>
                        </Box>
                    </TabContext>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        {isSmallScreen && (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                                <MenuIcon/>
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                px: 1,
                                bgcolor: "#f9f9f9",
                                width: isSmallScreen
                                    ? "50%"
                                    : isMobile
                                        ? "200px"
                                        : "250px",
                                flexGrow: 1,
                                maxWidth: "100%",
                                marginBottom: isSmallScreen ? "10px" : "0",
                            }}
                        >
                            <InputBase placeholder="Search" sx={{ml: 1, flexGrow: 1}}/>
                            <SearchIcon color="disabled"/>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {!isSmallScreen && (
                                <Button
                                    onClick={()=> {
                                        typeof window !== "undefined" && sessionStorage.removeItem("token")
                                        router.push("/")
                                    } }
                                    variant="outlined"
                                    size="small"
                                    sx={{color: "#8DA6B2", border: "#C8C8C8 1px solid",textTransform:"capitalize"}}
                                >
                                    Log Out
                                </Button>
                            )}

                            {
                                !isSmallScreen && (
                                    <AvatarGroup max={3}>
                                        <Avatar alt="User 1" src={img.src}/>
                                        <Avatar alt="User 2" src={img.src}/>
                                        <Avatar alt="User 3" src={img.src}/>
                                    </AvatarGroup>
                                )}

                            {!isMobile ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SendIcon/>}
                                        size="small"
                                        sx={{color: "#171717", border: "#EFEFEF 1px solid"
                                            ,textTransform:"capitalize"

                                    }}
                                    >
                                        Invite
                                    </Button>
                                    <IconButton sx={{color: "#171717", border: "#EFEFEF 1px solid"}}>
                                        <MessageOutlinedIcon/>
                                    </IconButton>
                                </>
                            ) : (
                                <IconButton sx={{color: "#171717", border: "#EFEFEF 1px solid"}}>
                                    <SendIcon/>
                                </IconButton>
                            )}
                        </Stack>
                    </Box>
                </Toolbar>

                <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
                    <List>
                        <ListItem button onClick={() => setValue("1")}>
                            <ListItemText primary="All"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("2")}>
                            <ListItemText primary="Recents"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("3")}>
                            <ListItemText primary="Created by Me"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("4")}>
                            <ListItemText primary="Folders"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("5")}>
                            <ListItemText primary="Unsorted"/>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>

            <TabContext value={value}>
                <TabPanel value="1">
                    <Table/>
                </TabPanel>
                <TabPanel value="2">
                    <Table/>
                </TabPanel>
                <TabPanel value="3">
                    <Table/>
                </TabPanel>
                <TabPanel value="4">
                    <Table/>
                </TabPanel>
                <TabPanel value="5">
                    <Table/>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Dashboard;
