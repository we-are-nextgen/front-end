"use client";

import CodeEditor from "@/components/tools/CodeEditor";
import RunButton from "@/components/tools/RunButton";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import XTermTerminal from "@/components/tools/Terminal";

export default function ToolsPanel({ lab }) {
  const [code, setCode] = useState("// write JS here");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("code");

  // asset URLs
  //const htmlAsset = lab.lab.contentHtmlUrl;
  const htmlAsset = "https://raw.githubusercontent.com/we-are-nextgen/tracks/refs/heads/main/javascript/labs/variables/README.html";
  //const mdAsset = lab.lab.contentMarkdownUrl;
  const mdAsset = "https://raw.githubusercontent.com/we-are-nextgen/tracks/refs/heads/main/javascript/labs/variables/README.md";

  async function run() {
    const res = await fetch("/api/run/javascript", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: code,
    });
    const text = await res.text();
    setOutput(text);
    setActiveTab("terminal");
  }

  return (
    <div className="p-4 space-y-4 h-full">
      <h2 className="text-lg font-semibold">Tools</h2>

      <RunButton onRun={run} />

      {/* Tabs */}
      <div className="flex space-x-2 mt-3">
        <Tab label="Code" id="code" active={activeTab} setActive={setActiveTab} />
        <Tab label="Terminal" id="terminal" active={activeTab} setActive={setActiveTab} />
        <Tab label="HTML" id="html" active={activeTab} setActive={setActiveTab} />
        <Tab label="Markdown" id="md" active={activeTab} setActive={setActiveTab} />
      </div>

      {/* Panels */}
      <div className="border rounded-lg p-3 h-[480px] overflow-auto shadow-inner">

        {activeTab === "code" && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Editor</p>
            <CodeEditor code={code} setCode={setCode} />
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="h-full">
          <XTermTerminal initialOutput={output} />
        </div>
          
        )}

        {activeTab === "html" && <HTMLViewer url={htmlAsset} />}

        {activeTab === "md" && (
          <div className="prose prose-neutral">
            <MarkdownViewer url={mdAsset} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------- */
/* Tabs                                */
/* ----------------------------------- */
function Tab({ label, id, active, setActive }) {
  return (
    <button
      onClick={() => setActive(id)}
      className={`px-3 py-1 text-sm rounded 
        ${active === id ? "bg-blue-600 text-white" : "bg-black text-white"}
      `}
    >
      {label}
    </button>
  );
}

/* ----------------------------------- */
/* Markdown viewer                     */
/* ----------------------------------- */
function MarkdownViewer({ url }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("Failed to load markdown."));
  }, [url]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
}

/* ----------------------------------- */
/* HTML viewer (innerHTML renderer)    */
/* ----------------------------------- */
function HTMLViewer({ url }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("<p>Failed to load HTML.</p>"));
  }, [url]);

  return (
    <div
      className="prose prose-neutral"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
