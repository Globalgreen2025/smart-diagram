"use client";

import React, {useState} from "react";
import {
    Box, Button, Card, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import axios from "axios";

function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "", password: "", rememberMe: false,
        }, validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"), password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }), onSubmit: (values) => {
            const url = `https://hackingbeauty.github.io/react-mic/register`
            const res = axios.post(url,values)
            console.log(res,"jjjjjjjjjjjjjjjjjjjjj")
        },
    });

    const {values, errors, touched, handleChange, handleBlur} = formik;

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (<Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f1f1f1",
            px: {sm: 0, xs: 2}
        }}
    >
        <Card
            sx={{
                p: {md: 4, xs: 2}, width: {sm: 500, xs: "100%"}, boxShadow: "none", borderRadius: 3,
            }}
        >
            <Box sx={{fontSize: 32, fontWeight: "bold", mb: 1}}>Sign Up</Box>
            <Typography component="div" sx={{mb: 1, fontSize: 14}}>
                Join us today. Create your account to get started.
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                aria-label="toggle password visibility"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>),
                    }}
                />
                <FormControlLabel
                    control={<Checkbox
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />}
                    label="Remember me"
                />
                <Box sx={{fontSize: 14}}>
                    Already have an account?
                    <Typography component={"span"}
                                sx={{color: "#1976D2", cursor: "pointer", ":hover": {textDecoration: "underline"}}}
                                onClick={() => router.push("/login")}> Sign in</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{mb: 2, mt: 1, fontWeight: 600}}
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>
        </Card>
    </Box>);
}

export default Page;
