"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { completeLab } from "@/lib/controllers/labController";
import { DynamicIcon } from "@/components/ui/DynamicIcon";


export default function LabContent({ labWithProgress }) {
  const lab=labWithProgress?.lab;
  const progress=labWithProgress?.progress;
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  

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
    <div className="h-screen flex flex-col prose max-w-full pr-2 pl-2">
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
          await completeLab(lab.id,progress?.learninTrackId);
          alert("Lab marked as completed!");
        }}
        className="px-4 py-2 mt-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Mark as Completed
      </button>


      <button
        onClick={async () => {
          const payload = {
            labId: lab.id,
            submissions: Object.entries(answers).map(([exId, answer]) => ({
              exerciseId: Number(exId),
              answer
            }))
          };

          const res = await fetch("/api/labs/grade", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          });

          const data = await res.json();
          setResult(data);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
      >
        Grade Lab
      </button>

      <hr className="my-6" />

      {/* Lab Content Files */}

      {/* Markdown content */}
      {/*  remove false to show content */}
      {markdown && false && (
        <div className="mt-4 border rounded-lg p-3 shadow-sm">
          <div className="max-h-[200px] overflow-y-auto prose">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* HTML content */}
      {/*  remove false to show content */}
      {html && false && (
        <div className="mt-4 border rounded-lg p-3 shadow-sm">
          <div
            className="max-h-[200px] overflow-y-auto prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}

      <hr className="my-2" />

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
              <ExerciseCard key={ex.id} exercise={ex} labId={lab.id} />
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

import { gradeExercise } from "@/lib/controllers/exerciseController";
import { Console } from "console";

function ExerciseCard({ exercise, labId }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitAnswer() {
    setLoading(true);
    console.log("labId ======> " + labId);
    console.log("exercise.id ======> " + exercise.id);
    console.log("answer ======> " + answer);
    const res = await gradeExercise(labId, exercise.id, answer);
    setResult(res);
    setLoading(false);
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{exercise.title}</h3>
      <p className="text-sm text-gray-600 whitespace-pre-line mb-3">
        {exercise.question}
      </p>

      {/* MCQ */}
      {exercise.type === "MCQ" && (
        <ul className="mt-3">
          {JSON.parse(exercise.optionsJson || "[]").map((opt, idx) => (
            <li key={idx} className="mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`ex-${exercise.id}`}
                  value={opt}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      )}

      {/* TRUE/FALSE */}
      {exercise.type === "TRUE_FALSE" && (
        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`ex-${exercise.id}`}
              value="true"
              onChange={(e) => setAnswer(e.target.value)}
            />
            True
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`ex-${exercise.id}`}
              value="false"
              onChange={(e) => setAnswer(e.target.value)}
            />
            False
          </label>
        </div>
      )}

      {/* CODE */}
      {exercise.type === "CODE" && (
        <textarea
          placeholder="Write your code here..."
          className="w-full border rounded p-2 mt-2 text-sm font-mono"
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {/* TEXT */}
      {exercise.type === "TEXT" && (
        <textarea
          placeholder="Write your explanation here..."
          className="w-full border rounded p-2 mt-2 text-sm"
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {/* SUBMIT BUTTON */}
      <button
        onClick={submitAnswer}
        disabled={loading}
        className="mt-3 px-3 py-1 bg-indigo-600 text-white rounded shadow text-sm hover:bg-indigo-700"
      >
        {loading ? "Checking..." : "Submit Answer"}
      </button>

      {/* RESULT FEEDBACK */}
      {result && (
        <div
          className={`mt-3 text-sm font-semibold ${
            result.correct ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.message}
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        {exercise.points} points
      </div>
    </div>
  );
}