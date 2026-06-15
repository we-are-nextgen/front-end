"use client";

import EducatesPanel from "./EducatesPanel";
import LabContent from "./content";
import ToolsPanel from "./tools-panel";
import Split from "react-split";

interface LabViewProps {
  labWithProgress: any;
  sessionActivationUrl?: string | null;
  educatesError?: string | null;
}

export default function LabView({
  labWithProgress,
  sessionActivationUrl,
  educatesError,
}: LabViewProps) {
  const lab = labWithProgress?.lab;
  const workshopName = lab?.educatesWorkshopName;
  const returnPath = lab?.id ? `/lab/${lab.id}` : "/dashboard/it-professional";
  const useEducates = Boolean(workshopName);

  async function retrySession(): Promise<string | null> {
    const res = await fetch("/api/workshops/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workshopName, returnPath }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create workshop session");
    }
    const data = await res.json();
    return data.sessionActivationUrl ?? null;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] w-full">
      <Split
        className="flex flex-row flex-1"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={8}
      >
        <div className="w-1/2 border-r-4 border-r-gray-400 overflow-y-auto p-1">
          <LabContent labWithProgress={labWithProgress} />
        </div>

        <div className="w-1/2 overflow-y-auto">
          {useEducates ? (
            educatesError ? (
              <div className="p-4 space-y-3">
                <h2 className="text-lg font-semibold">Workshop Environment</h2>
                <p className="text-sm text-red-600">{educatesError}</p>
                <button
                  onClick={() => retrySession().then(() => window.location.reload())}
                  className="text-sm px-3 py-2 rounded-md border hover:bg-muted"
                >
                  Retry
                </button>
              </div>
            ) : sessionActivationUrl ? (
              <EducatesPanel
                sessionActivationUrl={sessionActivationUrl}
                workshopName={workshopName}
                returnPath={returnPath}
                onRetry={retrySession}
              />
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                Starting workshop environment...
              </div>
            )
          ) : (
            <ToolsPanel lab={labWithProgress} />
          )}
        </div>
      </Split>
    </div>
  );
}
