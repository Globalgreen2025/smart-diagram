"use client";

// Importing necessary components and hooks from libraries
import { Box, Dialog, IconButton, Slide } from "@mui/material";
import { forwardRef, useState, useRef, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useStore } from "@/store";
import { MdFullscreen } from "react-icons/md";

// Transition component for Dialog (uses Slide animation)
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const FullScreen = () => {
  const [open, setOpen] = useState(false);
  const svg = useStore.use.svg();
  const fullScreenView = useRef(null);

  // Effect to render SVG when dialog is open
  useEffect(() => {
    Promise.resolve().then(() => {
      if (svg && open && fullScreenView.current) {
        fullScreenView.current.innerHTML = svg;
        const svgDom = fullScreenView.current.querySelector("svg");
        if (!svgDom) return;
        svgDom.setAttribute("height", "100%");
        svgDom.style.maxWidth = "100%";
      }
    });
  }, [svg, open]);

  return (
    <>
      {/* Fullscreen icon to trigger the dialog */}
      <MdFullscreen
        className="cursor-pointer"
        size={32}
        onClick={() => setOpen(true)}
      />
      {/* Fullscreen dialog */}
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        {/* Close button inside dialog */}
        <IconButton
          sx={{ position: "absolute" }}
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Box sx={{ height: "100%" }} ref={fullScreenView}></Box>
      </Dialog>
    </>
  );
};

export default FullScreen;
