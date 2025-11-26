

import LabContent from "../components/content";
import ToolsPanel from "../components/tools-panel";

import { getLab } from "@/lib/controllers/labController";


export default async function LabPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const labId =  Number(id);
  const lab = await getLab(labId);

  //const res = await fetch(`/api/lab/${labId}`, { method: "POST" });
  //const lab = await res.json();
  /*const lab2 = {
                id: 2,
                assets: [ ],
                description: "Learn the basics of CSS.",
                difficultyLevel: "BEGINNER",
                estimatedTimeMin: 60,
                exercises: [ ],
                name: "CSS Basics"
                }; */

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
