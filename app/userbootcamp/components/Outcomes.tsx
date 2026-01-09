"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Outcomes({ outcomes }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-3">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between border rounded-xl p-4 text-background bg-foreground shadow-sm
        ${!open ? "w-18" : "w-[320px]"}
        `}
      >
        <h2 className="font-semibold">{open ? "Outcomes" : "O"}</h2>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Expanded */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-full z-50 border rounded-xl bg-background shadow-xl p-4">
          <ul className="list-disc list-inside space-y-2 text-sm">
            {outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
