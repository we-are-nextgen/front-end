"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

export default function LayersProgress({ layers }) {
  
  const [open, setOpen] = useState(false);
  const [openLayer, setOpenLayer] = useState<string | null>(null);

  return (
    <div className="relative mb-3">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between border rounded-xl p-4 text-background bg-foreground shadow-sm
        ${!open ? "w-18" : "w-[320px]"}
        `}
      >
        <h2 className="font-semibold">{open ? "Progress" : "P"}</h2>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Expanded */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-full z-30 border rounded-xl bg-background shadow-xl p-4 max-h-[70vh] overflow-y-auto">
          {layers.map((layer) => {
            const completed = layer.moduleProgresses.filter(m => m.completed).length;
            const total = layer.moduleProgresses.length;

            return (
              <div key={layer.id} className="border rounded-lg mb-3">
                <button
                  onClick={() =>
                    setOpenLayer(openLayer === layer.id ? null : layer.id)
                  }
                  className="w-full flex justify-between p-3"
                >
                  <span className="capitalize">
                    {layer.layerName.replace("_", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {completed}/{total}
                  </span>
                </button>

                {openLayer === layer.id && (
                  <ul className="p-3 space-y-2">
                    {layer.moduleProgresses.map((m) => (
                      <li key={m.id} className="flex justify-between text-sm">
                        {m.moduleName}
                        {m.completed && (
                          <CheckCircle size={14} className="text-green-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
