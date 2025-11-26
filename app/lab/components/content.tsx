"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { completeLab } from "@/lib/controllers/labController";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import Split from "react-split";

export default function LabContent({ lab }) {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  // Fetch markdown / html content from URLs
  useEffect(() => {
    if (lab.contentMarkdownUrl) {
      //fetch(lab.contentMarkdownUrl)
        fetch("https://raw.githubusercontent.com/we-are-nextgen/tracks/refs/heads/main/javascript/labs/variables/README.md")
        .then((res) => res.text())
        .then(setMarkdown)
        .catch(() => setMarkdown("# Unable to load markdown"));
    }

    if (lab.contentHtmlUrl) {
      //fetch(lab.contentHtmlUrl)
        fetch("https://raw.githubusercontent.com/we-are-nextgen/tracks/refs/heads/main/javascript/labs/variables/README.html")
        .then((res) => res.text())
        .then(setHtml)
        .catch(() => setHtml("<p>Unable to load HTML file</p>"));
    }
  }, [lab]);

  return (
    <div className="h-screen flex flex-col prose max-w-full">
        {/* Header */}
         <div className="p-6 border-b shadow flex items-center gap-4">
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

      {/* MARK AS COMPLETED */}
      <button
        onClick={async () => {
          await completeLab(lab.id);
          alert("Lab marked as completed!");
        }}
        className="px-4 py-2 mt-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Mark as Completed
      </button>

      <hr className="my-6" />

      {/* Lab Content Files */}

      {/* Markdown content */}
      {markdown && (
        <div className="mt-4 border rounded-lg p-3 shadow-sm">
          <div className="max-h-[200px] overflow-y-auto prose">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* HTML content */}
      {html && (
        <div className="mt-4 border rounded-lg p-3 shadow-sm">
          <div
            className="max-h-[200px] overflow-y-auto prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}

      <hr className="my-6" />

      {/* Assets Section */}
      {lab.assets?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Assets</h2>

          <ul className="list-disc ml-6 text-sm">
            {lab.assets.map((asset) => (
              <li key={asset.id}>
                <a
                  href={asset.path}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  {asset.path.split("/").pop()}
                </a>{" "}
                <span className="text-gray-400">({asset.type})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr className="my-6" />

      {/* Exercises Section */}
      {lab.exercises?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Exercises</h2>

          <div className="flex flex-col gap-6">
            {lab.exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------
// EXERCISE COMPONENT
// ----------------------------------------
function ExerciseCard({ exercise }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold text-lg">{exercise.title}</h3>
      <p className="text-sm text-gray-600 whitespace-pre-line">
        {exercise.question}
      </p>

      {exercise.type === "MCQ" && (
        <ul className="mt-3">
          {JSON.parse(exercise.optionsJson || "[]").map((opt, idx) => (
            <li key={idx} className="mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name={`ex-${exercise.id}`} />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      )}

      {exercise.type === "TRUE_FALSE" && (
        <div className="mt-3">
          <label className="flex items-center gap-2">
            <input type="radio" name={`ex-${exercise.id}`} />
            True
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name={`ex-${exercise.id}`} />
            False
          </label>
        </div>
      )}

      {exercise.type === "CODE" && (
        <textarea
          placeholder="Write your code here..."
          className="w-full border rounded p-2 mt-2 text-sm font-mono"
          rows={6}
        ></textarea>
      )}

      {exercise.type === "TEXT" && (
        <textarea
          placeholder="Write your answer here..."
          className="w-full border rounded p-2 mt-2 text-sm"
          rows={4}
        ></textarea>
      )}

      {/* Points */}
      <div className="text-xs text-gray-500 mt-2">
        {exercise.points} points
      </div>
    </div>
  );
}
