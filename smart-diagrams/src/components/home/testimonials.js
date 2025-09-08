'use client'
import React, { useRef } from "react";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    IconButton,
    Container
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import Img from "../../asset/home/testimonials/Layer_1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import GradeIcon from "@mui/icons-material/Grade";
import Img1 from "../../asset/home/testimonials/Img2.png";

const testimonials = [
    {
        id: 1,
        text: "The Gym Beam Device is a game-changer for my home workouts. It's versatile, easy to use, and incredibly effective. Highly recommend!",
        name: "Daniel Hanf",
        title: "ACONIO, CEO",
        image: Img1
    },
    {
        id: 2,
        text: "The Gym Beam Device is a game-changer for my home workouts. It's versatile, easy to use, and incredibly effective. Highly recommend!",
        name: "Daniel Hanf",
        title: "ACONIO, CEO",
        image: Img1
    },
    {
        id: 3,
        text: "The Gym Beam Device is a game-changer for my home workouts. It's versatile, easy to use, and incredibly effective. Highly recommend!",
        name: "Daniel Hanf",
        title: "ACONIO, CEO",
        image: Img1
    },
    {
        id: 4,
        text: "The Gym Beam Device is a game-changer for my home workouts. It's versatile, easy to use, and incredibly effective. Highly recommend!",
        name: "Daniel Hanf",
        title: "ACONIO, CEO",
        image: Img1
    }
];

const Testimonials = () => {
    const swiperRef = useRef(null);

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    return (
        <Box>
            <Container maxWidth={"lg"}>
                <Box sx={{ paddingTop: "50px", paddingBottom: "100px" }}>
                    <Box
                        sx={{
                            p: "7px 25px",
                            backgroundColor: "#EFFBFA",
                            fontSize: "15px",
                            color: "#555",
                            borderRadius: "20px",
                            display: "inline-block",
                            justifyContent: "start",
                            alignItems: "center",
                            border: "1px solid #000"
                        }}
                    >
                        Testimonial
                    </Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={8}
                        sx={{
                            paddingTop: "30px"
                        }}
                    >
                        Hear From Our Happy Users
                    </Typography>

                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        height: "300px",
                                        backgroundColor: "#E7F6F5",
                                        p: 2
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    padding: "20px 0px 50px 0px",
                                                    color: "#E7B31E"
                                                }}
                                            >
                                                <GradeIcon />
                                                <GradeIcon />
                                                <GradeIcon />
                                                <GradeIcon />
                                                <GradeIcon />
                                            </Box>
                                            <Box
                                                sx={{
                                                    height: "50px",
                                                    padding: "20px 0px 50px 0px"
                                                }}
                                            >
                                                <img src={Img.src} alt="Img" height={"100%"} />
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            sx={{ color: "#555" }}
                                        >
                                            {testimonial.text}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={2} pb={2}>
                                            <Avatar
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                sx={{ mr: 2 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                >
                                                    {testimonial.title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Box
                        mt={3}
                        display="flex"
                        justifyContent="center"
                        gap={4}
                        sx={{
                            position: "relative"
                        }}
                    >
                        <Box sx={{
                            position: "absolute",
                            top: "50%",
                            right: "0%" ,
                            gap:2,
                            display: "flex",
                        }}>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    backgroundColor: "lightgray",
                                    height:"35px",
                                    width: "55px",
                                    borderRadius: "20px",
                                    "&:hover": { backgroundColor: "#FF3480" },
                                    "&:hover .icon":{
                                        color: "#fff"
                                    }
                                }}
                            >
                                <WestIcon className={"icon"} sx={{ color: "black","&:hover": {color: "#fff"} }} />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    backgroundColor: "lightgray",
                                    height: "35px",
                                    width: "55px",
                                    borderRadius: "20px",
                                    "&:hover": {
                                        backgroundColor: "#FF3480"
                                    },
                                    "&:hover .icon":{
                                        color: "#fff"
                                    }
                                }}
                            >
                                <EastIcon className={"icon"} sx={{ color: "black" }} />
                            </IconButton>
                        </Box>

                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default Testimonials;