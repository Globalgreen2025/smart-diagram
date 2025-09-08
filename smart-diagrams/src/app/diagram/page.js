"use client";

import React, {useContext, useRef, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    IconButton,
    Stack,
    Card,
    CardContent,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogActions, Breadcrumbs, Link
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Image from "next/image";
import Upload from "../../asset/dashboard/upload.png"
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Mic, Stop} from "@mui/icons-material";
import axiosInstance from "@/utils/axiosInstance";
import FullScreenLoader from "@/utils/fullScreenLoader";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactMic = dynamic(() => import("react-mic").then((mod) => mod.ReactMic), {ssr: false});
import {useStore} from "@/store";

function Page() {

    // State management for file uploads, recording status, audio data, loading state, and dialog visibility

    const [file, setFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isRecordingComplete, setIsRecordingComplete] = useState(false);

    // Closes the dialog modal
    const handleCloseDialog = () => {
        setIsOpen(false);
    };
    const setCode = useStore.use.setCode();

    // Handles completion of audio recording
    const handleAudioStop = (recordedData) => {
        const audioBlob = recordedData.blob;
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
        setIsRecordingComplete(true);
        console.log(recordedData);
    };

    // Toggles audio recording state
    const handleToggleRecording = () => {
        setIsRecording((prev) => !prev);
    };

    // Yup validation schema for form fields
    const validation = Yup.object({
        aiModel: Yup.string().required("This field is required"),
        title: Yup.string().required("This field is required"),

        file: Yup.mixed().nullable().when("method", {
            is: (val) => val === "Text/README" || val === "Upload Audio",
            then: (schema) => schema.required("Please select a file"),
            otherwise: (schema) => schema.notRequired(),
        }),

        textOrSyntax: Yup.mixed().nullable().when("method", {
            is: (val) => val === "",
            then: (schema) => schema.required("Text is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

// Toggles the visibility of a dialog box
    const handleToggleBox = () => {
        setIsOpen(!isOpen);
    };

    // Formik form handling for managing form state and submission
    const formik = useFormik({
        initialValues: {
            method: "", aiModel: "Smart Graph", textOrSyntax: "", file: null, title: "",
        }, validationSchema: validation, validateOnChange: true, validateOnBlur: true, onSubmit: async (values) => {
            console.log("Form submitted with values:", values);
            setLoading(true);
            try {
                const formData = new FormData();
                let payload = {};

                formData.append("aiModel", values.aiModel);
                payload["aiModel"] = values.aiModel;
                formData.append("title", values.title);
                payload["title"] = values.title;

                if (values.method) {
                    formData.append("selectInputMethod", values.method);
                    payload["selectInputMethod"] = values.method;
                    if (values.method === "Voice Recording" && audioBlob) {
                        formData.append("file", audioBlob);
                        payload["file"] = audioBlob;
                    } else if (values.file) {
                        formData.append("file", values.file);
                        payload["file"] = values.file;
                    }
                } else {
                    formData.append("textOrMermaid", values.textOrSyntax);
                    payload["textOrMermaid"] = values.textOrSyntax;
                }

                // API call to create a new flowchart
                const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/flowchart`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data", 
                       
                    },
                });
                console.log("API response:", response);

                // Update state and navigate to editor page
                setCode(response.data.mermaidChart);
                typeof window !== "undefined" && sessionStorage.setItem("code", response.data.flowChart.mermaidString);
                router.push(`/editor/${response.data.flowChart._id}`);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Something went wrong!");
                console.error("Error during API call:", error);
            } finally {
                setLoading(false);
            }

        }
    });



    const {values, errors, touched, handleChange, handleBlur, setFieldValue} = formik;

    if (loading) {
        return (<FullScreenLoader/>)
    }

    return (<Box bgcolor={'#fff'} px={{md: 3, xs: 1}}>
            {/*<Container>*/}
            <Box>
                <Grid container>
                    <Grid item xs={12} mt={3}>

                        {/* Breadcrumbs for navigation */}
                        <Breadcrumbs separator="›" sx={{flexGrow: 1}}>
                            <Link underline="hover" color="inherit" href="/dashboard">Dashboard</Link>s
                            <Typography color="textPrimary" sx={{textTransform: "capitalize"}}>Diagram</Typography>
                        </Breadcrumbs>

                        {/* Main title of the page */}
                        <Typography sx={{fontSize: '32px', fontWeight: '600', color: '#171717', mt: 2}}> AI
                            Flowchart Generator</Typography>
                    </Grid>
                    <Grid item xs={12} mt={3}>
                        <Box>
                            {/* FormControl form setup */}
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl
                                    component="fieldset"
                                    sx={{mb: 3}}
                                    error={touched.method && Boolean(errors.method)}
                                >
                                    <Typography variant="body2" sx={{fontSize: '14px', color: "#000000", mt: 2, fontWeight: 600}}>
                                        Select Input Field:
                                    </Typography>
                                    <RadioGroup name="method" value={values.method} onChange={handleChange}
                                                sx={{mt: 1}}>
                                        {['Text/README', 'Voice Recording', 'Upload Audio'].map((option, index) => (
                                            <FormControlLabel
                                                sx={{'& .MuiFormControlLabel-label': {fontSize: '14px', color: "#000000"}}}
                                                key={index}
                                                value={option}
                                                control={<Radio sx={{'&.Mui-checked': {color: "#FF3480"}}}/>}
                                                label={option}
                                            />))}
                                    </RadioGroup>
                                </FormControl>

                                {/* Title input field */}
                                <Typography variant="body2"
                                            sx={{fontSize: "14px", mt: 2, color: "#000000", fontWeight: 600}}>
                                    Enter Title
                                </Typography>
                                <TextField sx={{
                                    mt: 1, "& .MuiOutlinedInput-root": {
                                        "&:hover fieldset": {
                                            borderColor: "#FF3480 !important",
                                        }, "&.Mui-focused fieldset": {
                                            borderColor: "#FF3480 !important",
                                        }
                                    }, "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#FF3480",
                                        }, "&:hover": {
                                            color: "#FF3480",
                                        }
                                    }
                                }}
                                           fullWidth
                                           name="title"
                                           value={values.title}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           error={touched.title && Boolean(errors.title)}
                                           helperText={touched.title && errors.title}
                                           multiline
                                />

                                <FormControl fullWidth sx={{mb: 3}}>
                                    <Typography variant="body2" sx={{fontSize: "14px", mt: 2, color: "#000000", fontWeight: 600}}>
                                        Select AI Model
                                    </Typography>
                                    <TextField sx={{
                                        mt: 1, "& .MuiOutlinedInput-root": {
                                            "&:hover fieldset": {
                                                borderColor: "#FF3480 !important",
                                            }, "&.Mui-focused fieldset": {
                                                borderColor: "#FF3480 !important",
                                            }
                                        }, "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "#FF3480",
                                            }, "&:hover": {
                                                color: "#FF3480",
                                            }
                                        }
                                    }}
                                               select
                                               label=""
                                               name="aiModel"
                                               value={values.aiModel}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               error={touched.aiModel && Boolean(errors.aiModel)}
                                               helperText={touched.aiModel && errors.aiModel}
                                    >
                                        {['Smart Graph','Gemini','Open AI'].map((model, index) => (<MenuItem key={index} value={model}>
                                            {model}
                                        </MenuItem>))}
                                    </TextField>
                                </FormControl>
                                {!values.method ? (<>
                                        <Typography variant="body2"
                                                    sx={{fontSize: "14px", mt: 2, color: "#000000", fontWeight: 600}}>
                                            Enter Text or Mermaid Syntax
                                        </Typography>
                                        <TextField sx={{
                                            mt: 1, "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#FF3480 !important",
                                                }, "&.Mui-focused fieldset": {
                                                    borderColor: "#FF3480 !important",
                                                }
                                            }, "& .MuiInputLabel-root": {
                                                "&.Mui-focused": {
                                                    color: "#FF3480",
                                                }, "&:hover": {
                                                    color: "#FF3480",
                                                }
                                            }
                                        }}
                                                   fullWidth
                                                   name="textOrSyntax"
                                                   value={values.textOrSyntax}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   error={touched.textOrSyntax && Boolean(errors.textOrSyntax)}
                                                   helperText={touched.textOrSyntax && errors.textOrSyntax}
                                                   multiline
                                                   rows={4}
                                        />
                                    </>) : (<>
                                        {values.method === 'Voice Recording' ? (
                                            <Stack spacing={2} sx={{mt: 3, p: 2, maxWidth: 400}}>
                                                <Typography variant="body2"
                                                            sx={{fontSize: "14px", fontWeight: 600}}>
                                                    Audio Recorder:
                                                </Typography>

                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <IconButton
                                                        onClick={handleToggleBox}
                                                        color={isOpen ? "secondary" : "primary"}
                                                        sx={{
                                                            bgcolor: isOpen ? "#FF3480" : "#FFF4F8",
                                                            p: 2,
                                                            borderRadius: "50%",
                                                            transition: "0.3s",
                                                            "&:hover": {
                                                                bgcolor: isOpen ? "#FF69A6" : "#FFDCE6",
                                                            },
                                                        }}
                                                    >
                                                        <Mic fontSize="medium"/>
                                                    </IconButton>
                                                    {audioURL && (<audio
                                                            src={audioURL}
                                                            controls
                                                            style={{
                                                                width: "100%",
                                                                marginTop: 8,
                                                                borderRadius: 8,
                                                                outline: "none"
                                                            }}
                                                        />)}
                                                    <Dialog
                                                        open={isOpen}
                                                        onClose={handleCloseDialog}
                                                        fullScreen
                                                        sx={{
                                                            "& .MuiDialog-paper": {
                                                                backgroundColor: "#f9f9f9",
                                                                boxShadow: 3,
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                width: '500px',
                                                                height: '500px'
                                                            },
                                                        }}
                                                    >
                                                        <DialogContent
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                p: 4,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 200,
                                                                    height: 200,
                                                                    borderRadius: "50%",
                                                                    overflow: "hidden",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    backgroundColor: "#FFF4F8",
                                                                    boxShadow: isRecording ? "0px 0px 10px rgba(255, 56, 128, 0.7)" : "none", // Glow effect while recording
                                                                }}
                                                            >
                                                                <ReactMic
                                                                    record={isRecording}
                                                                    onStop={handleAudioStop}
                                                                    mimeType="audio/webm"
                                                                    className="audio-recorder"
                                                                    visualSetting="sinewave"
                                                                    strokeColor="#FF3480"
                                                                    backgroundColor="#FFF4F8"
                                                                    style={{
                                                                        borderRadius: "50%",
                                                                        maxWidth: "100%",
                                                                        maxHeight: "100%",
                                                                    }}
                                                                />
                                                            </Box>

                                                            <IconButton
                                                                onClick={handleToggleRecording}
                                                                color={isRecording ? "secondary" : "primary"}
                                                                sx={{
                                                                    bgcolor: isRecording ? "#FF3480" : "#FFF4F8",
                                                                    p: 2,
                                                                    borderRadius: "50%",
                                                                    transition: "0.3s",
                                                                    "&:hover": {
                                                                        bgcolor: isRecording ? "#FF69A6" : "#FFDCE6",
                                                                    },
                                                                    mt: 2,
                                                                    boxShadow: isRecording ? "0px 0px 15px rgba(255, 56, 128, 0.5)" : "none",
                                                                }}
                                                            >
                                                                {isRecording ? (<Stop fontSize="medium"/>) : (
                                                                    <Mic fontSize="medium"
                                                                         sx={{animation: isRecordingComplete ? 'none' : 'pulse 1s infinite'}}/>)}
                                                            </IconButton>

                                                            {isRecordingComplete && (<Typography variant="body2"
                                                                                                 sx={{
                                                                                                     mt: 2,
                                                                                                     color: "#FF3480"
                                                                                                 }}>
                                                                    Recording Completed!
                                                                </Typography>)}
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <IconButton onClick={handleCloseDialog} sx={{
                                                                color: "#FF3480",
                                                                borderRadius: 2,
                                                                fontSize: 16,
                                                                px: 2,
                                                                border: '1px solid #FF3480'
                                                            }}>
                                                                Close
                                                            </IconButton>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Stack>
                                            </Stack>) : (<FormControl fullWidth sx={{mb: 3}}>
                                                <Typography variant="body1"
                                                            sx={{fontSize: '14px', mt: 2, color: "#000000", fontWeight: 600}}>Or
                                                    upload a
                                                    README file:</Typography>

                                                <Box textAlign="center" border={1} borderRadius={2} p={3}
                                                     borderColor="grey.300" sx={{my: 1}}
                                                     onDragOver={(e) => {
                                                         e.preventDefault();
                                                     }}
                                                     onDrop={(e) => {
                                                         e.preventDefault();
                                                         const file = e.dataTransfer.files[0];
                                                         if (file) {
                                                             setFieldValue('file', file);
                                                         }
                                                     }}>
                                                    <Box>
                                                        <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                                                            <Image
                                                                src={Upload}
                                                                alt="Upload Icon"
                                                                width={50}
                                                            />
                                                        </label>

                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{color: '#000', fontSize: '14px', mt: 1}}>Drag
                                                            and drop file here</Typography>
                                                        <Typography
                                                            sx={{color: '#95989C', fontSize: '14px', mt: 1}}>Limit
                                                            200MB per file .TXT,MD</Typography>
                                                    </Box>
                                                    <Box>
                                                        <label htmlFor="file-upload">
                                                            <Button variant="contained" component="label" sx={{
                                                                mt: 2,
                                                                textTransform: 'capitalize',
                                                                color: '#FF3480',
                                                                border: '1px solid #FF3480',
                                                                bgcolor: '#fff',
                                                                boxShadow: 'none',
                                                                fontSize: '16px'
                                                            }}>
                                                                Browse Files
                                                                <input
                                                                    id="file"
                                                                    name="file"
                                                                    type="file"
                                                                    accept=".txt,.md,.png,.mp3,.wav,.ogg"
                                                                    hidden
                                                                    onChange={(event) => {
                                                                        const file = event.currentTarget.files[0];
                                                                        setFieldValue('file', file);
                                                                    }}
                                                                />
                                                            </Button>
                                                        </label>
                                                    </Box>
                                                </Box>
                                                {values.file && values.file.type.startsWith('image/') && (
                                                    <Box sx={{mt: 2, position: 'relative'}}>
                                                        <Box
                                                            component="img"
                                                            src={URL.createObjectURL(values.file)}
                                                            alt="Image Preview"
                                                            sx={{
                                                                maxWidth: 300,
                                                                maxHeight: 200,
                                                                objectFit: 'cover',
                                                                borderRadius: 3,
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 5,
                                                                left: 5,
                                                                zIndex: 120,
                                                                cursor: 'pointer',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                color: 'white',
                                                                borderRadius: '50%',
                                                            }}
                                                            onClick={() => setFieldValue('file', null)}
                                                        >
                                                            {file && <Typography mt={1}>{file.name}</Typography>}
                                                            <CloseIcon
                                                                sx={{
                                                                    color: 'white', padding: 1,
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>)}

                                                {values.file && (<Box display="flex" alignItems="center" mt={2}>
                                                        <Typography sx={{fontSize: "14px", color: "#000"}}>
                                                            Selected File: {values.file.name}
                                                        </Typography>
                                                    </Box>)}

                                                {touched.file && errors.file && (
                                                    <Typography color="error" variant="body2" sx={{mt: 1}}>
                                                        {errors.file}
                                                    </Typography>)}
                                            </FormControl>)}
                                    </>)}

                                <Box display={"flex"} justifyContent={"flex-end"}>
                                    <Button onClick={()=>router.push('/dashboard')} variant="outlined" color="primary" sx={{
                                        m: 2,
                                        textTransform: 'capitalize',
                                        // bgcolor: '#FF3480',
                                        border: '1px solid #FF3480',
                                        color: '#FF3480',
                                        boxShadow: 'none',
                                        fontSize: '16px'
                                    }}>
                                        Cancel
                                    </Button> <Button type="submit" variant="contained" color="primary" sx={{
                                        my: 2,
                                        textTransform: 'capitalize',
                                        bgcolor: '#FF3480',
                                        border: '1px solid #FF3480',
                                        color: '#fff',
                                        boxShadow: 'none',
                                        fontSize: '16px'
                                    }}>
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/*</Container>*/}
        </Box>);
}

export default Page;
