"use client";

import { useState, useEffect } from "react";
import LabContent from "./content";
import ToolsPanel from "./tools-panel";
import Split from "react-split";


export default function LabView({ labWithProgress}) {
  const [lab, setLab] = useState(labWithProgress);

  return (
      <div className="flex h-[calc(100vh-80px)] w-full">
        <Split
        className="flex flex-row flex-1"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={8}
        >
        {/* LEFT — CONTENT */}
        <div className="w-1/2 border-r-4 border-r-gray-400 overflow-y-auto p-1">
          <LabContent labWithProgress={lab} />
        </div>
  
        {/* RIGHT — TOOLS */}
        <div className="w-1/2 overflow-y-auto">
          <ToolsPanel lab={lab}/>
        </div>
        </Split>
      </div>
      
    );
}
