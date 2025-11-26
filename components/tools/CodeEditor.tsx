"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="200px"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={code}
      onChange={(v) => setCode(v || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
      }}
    />
  );
}
