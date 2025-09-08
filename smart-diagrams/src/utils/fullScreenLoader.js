import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FullScreenLoader = () => {
    return (
        <LoaderContainer>
            <CircularProgress color="primary" size={80} />
            <Typography variant="h6" sx={{ marginTop: 2, animation: 'fadeInOut 2s infinite' }}>
                Generating...
            </Typography>
        </LoaderContainer>
    );
};

const LoaderContainer = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
    '@keyframes fadeInOut': {
        '0%': {
            opacity: 0,
        },
        '50%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0,
        },
    },
});

export default FullScreenLoader;
