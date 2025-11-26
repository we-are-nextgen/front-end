"use client";

import { useState, useEffect } from "react";
import LabContent from "./content";
import ToolsPanel from "./tools-panel";
// import Split from "react-split"; // if using resizable layout

export default function LabView({ initialLab }) {
  const [lab, setLab] = useState(initialLab);

  return (
      <div className="flex h-[calc(100vh-80px)] w-full">
        {/* LEFT — CONTENT */}
        <div className="w-1/2 border-r overflow-y-auto">
          <LabContent lab={lab} />
        </div>
  
        {/* RIGHT — TOOLS */}
        <div className="w-1/2 overflow-y-auto">
          <ToolsPanel lab={lab} />
        </div>
      </div>
      
    );
}
