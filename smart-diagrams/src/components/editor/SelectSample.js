"use client";

// Importing necessary components and hooks from libraries
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { samples } from "@/asset/sample";
import { useStore } from "@/store";

// Extracting sample keys from the samples object for menu items
const sampleKeys = Object.keys(samples);

const SelectSample = () => {
  const setCode = useStore.use.setCode();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

    // Handles button click to open the menu
  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
    // Closes the menu
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        {/* Button to trigger dropdown menu */}
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={onClick}
        sx={{ color: "inherit" }}
        size="small"
        endIcon={<KeyboardArrowDownRoundedIcon />}
      >
        Sample
      </Button>
        {/* Dropdown menu anchored to the button */}
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
          {/* Dynamically create menu items from sampleKeys */}
        {sampleKeys.map((key) => (
          <MenuItem key={key} onClick={() => setCode(samples[key] ?? "")}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectSample;
