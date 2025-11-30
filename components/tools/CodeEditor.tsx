"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language = "javascript" }) {
  return (
    <div className="relative border border-gray-700 rounded-md overflow-hidden">
      <Editor
        height="200px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(v) => setCode(v || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
        }}
      />

      {/* Status bar */}
      <div className="w-full bg-gray-800 text-gray-300 text-xs px-2 py-1 border-t border-gray-700 flex justify-end">
        <span>{language.toUpperCase()}</span>
      </div>
    </div>
  );
}
