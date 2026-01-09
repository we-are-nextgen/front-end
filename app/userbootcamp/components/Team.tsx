"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Team({ users }) {
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
        <h2 className="font-semibold">{open ? "Team" : "T"}</h2>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-full z-40 border rounded-xl bg-background shadow-xl p-4">
          <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
            {users?.map((user) => (
              <li key={user.email} className="border rounded-lg p-3 bg-muted/30">
                <h3 className="font-medium">{user.fullName}</h3>
                <p className="text-xs text-muted-foreground">{user.headline}</p>
                <p className="text-sm mt-2">{user.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
