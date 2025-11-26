"use client";
import CodeEditor from "@/components/tools/CodeEditor";
import RunButton from "@/components/tools/RunButton";
import { useState } from "react";

export default function ToolsPanel({ lab }) {
  const [code, setCode] = useState("// write JS here");
  const [output, setOutput] = useState("");
  async function run() {
    const res = await fetch("/api/run/javascript", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: code,
    });

    const text = await res.text();
    setOutput(text);
  }
  return (
    <div className="p-4 space-y-4 h-full">
      <h2 className="text-lg font-semibold">Tools</h2>

      <RunButton onRun={run} />
      {/* Editor */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Editor</p>
        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
}
