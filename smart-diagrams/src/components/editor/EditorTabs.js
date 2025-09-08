// components/EditorTabs.js
'use client';

import { useState } from "react";
import { Box, AppBar, Tabs, Tab } from "@mui/material";
import MermaidEditor from "./MermaidEditor";
import { useStore } from "@/store";

const EditorTabs = () => {
  const setEditorMode = useStore.use.setEditorMode();
  const [tabIndex, setTabIndex] = useState(0); // Removed the TypeScript type annotation

  const handleTabChange = (_, value) => { // Removed type annotation for `value`
    setTabIndex(value);
    setEditorMode(value === 0 ? "code" : "config");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flex: 1 }}>
        <MermaidEditor />
      </Box>
    </Box>
  );
};

export default EditorTabs;