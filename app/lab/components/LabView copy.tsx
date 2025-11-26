"use client";

import { DynamicIcon } from "@/components/ui/DynamicIcon";
import LabContent from "./content";
import ToolsPanel from "./tools-panel";
//import Split from "react-split"; // if using resizable layout
import { useEffect, useState } from "react";
import Split from "react-split";
import ReactMarkdown from "react-markdown";

export default function LabView({ initialLab }) {
  const [lab, setLab] = useState(initialLab);
  const [content, setContent] = useState("");
    
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b shadow flex items-center gap-4">
        <DynamicIcon name={lab.icon} className="w-10 h-10 text-indigo-600" />

        <div>
          <h1 className="text-2xl font-bold">{lab.name}</h1>
          <p className="text-gray-600">{lab.description}</p>

          <div className="flex gap-6 text-sm mt-2 text-gray-500">
            <span>Difficulty: {lab.difficultyLevel}</span>
            <span>Time: {lab.estimatedTimeMin} min</span>
            {lab.hasBonusTasks && <span className="text-green-600">+ Bonus Tasks</span>}
          </div>
        </div>
      </div>

      {/* Split layout */}
      <Split
        className="flex flex-row flex-1"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={8}
      >
        {/* Left: Content */}
        <div className="overflow-auto p-6 bg-white border-r">
          {/* Markdown OR HTML */}
          {lab.contentMarkdownUrl ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Exercises Panel */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Exercises</h2>

            {lab.exercises?.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </div>

        {/* Right: Tools */}
        <div className="bg-gray-100 p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-4">Tools</h2>

          {/* Placeholder until terminal/VSC integrated */}
          <div className="border bg-white shadow rounded-lg p-4 flex-1">
            <p className="text-gray-500">Tools will show here: terminal, editor, runner…</p>
          </div>

          {/* Assets Panel */}
          <div className="border bg-white shadow rounded-lg p-4">
            <h3 className="font-medium mb-2">Assets</h3>
            <ul className="space-y-2">
              {lab.assets?.map((a) => (
                <li key={a.id} className="text-sm">
                  <a
                    href={a.path}
                    target="_blank"
                    className="text-indigo-600 underline"
                  >
                    {a.path.split("/").pop()}
                  </a>{" "}
                  <span className="text-gray-500">({a.type})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Split>
    </div>
  );
}



// -----------------------------
// 🧩 EXERCISE COMPONENT
// -----------------------------

function ExerciseCard({ exercise }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{exercise.title}</h3>

      <p className="text-gray-700 whitespace-pre-line mt-2">{exercise.question}</p>

      {exercise.type === "MCQ" && (
        <div className="mt-3 space-y-2">
          {JSON.parse(exercise.optionsJson).map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input type="radio" name={`mcq-${exercise.id}`} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {exercise.type === "TRUE_FALSE" && (
        <div className="mt-3 space-y-2">
          {["true", "false"].map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input type="radio" name={`tf-${exercise.id}`} />
              <span>{val}</span>
            </label>
          ))}
        </div>
      )}

      {exercise.type === "TEXT" && (
        <textarea
          className="w-full border rounded p-2 mt-3"
          rows={3}
          placeholder="Write your answer..."
        />
      )}

      {exercise.type === "CODE" && (
        <textarea
          className="w-full border rounded p-2 mt-3 font-mono"
          rows={6}
          placeholder="Write your solution..."
        />
      )}

      <div className="text-sm text-gray-500 mt-2">
        {exercise.points} points
      </div>
    </div>
  );
}