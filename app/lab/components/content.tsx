"use client";
import React, { useState, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import { completeLab } from "@/lib/controllers/labController";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { gradeAllExercises } from "@/lib/controllers/exerciseController";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LabContent({ labWithProgress }) {
  const lab=labWithProgress?.lab;
  const progress=labWithProgress?.progress;
  const submissions = labWithProgress?.exerciseSubmission;
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  
  function getExerciseTitle(lab, exerciseId) {
    const ex = lab.exercises.find(e => e.id === exerciseId);
    return ex?.title ?? null;   // return null if not found
  }

  let total = lab.exercises.reduce(
    (sum, item) => sum + (item.points ?? 0),
    0
  );
  const earned = submissions.reduce(
    (sum, item) => sum + (item.earnedPoints ?? 0),
    0
  );
  const details =  submissions.reduce((acc, s) => {
    acc[s.id] = {
      answer: s.answer,
      score: s.earnedPoints,
      exerciseId: s.exerciseId,
      question: getExerciseTitle(lab, s.exerciseId)
    };
    return acc;
  }, {})
    
  const initialResults = {
    "total": total,
    "earned" : earned,
    "details": details
  }
  
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(progress.completed);
  
  
  // delay load submissions
  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(initialResults);
    }, 500); // delay 0.5 second

    return () => clearTimeout(timer); // cleanup
  }, []);

  async function submitAllAnswers() {
    const payload = {
      labId: lab.id,
      submissions: Object.entries(answers).map(([exerciseId, answer]) => ({
        exerciseId: Number(exerciseId),
        answer,
      })),
    };
    const res = await fetch("/api/lab/grade", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(r => r.json());

    setResult(res);
  }

  async function submitAllAnswers1() {
    const payload = {
      labId: lab.id,
      submissions: Object.entries(answers).map(([exerciseId, answer]) => ({
        exerciseId: Number(exerciseId),
        answer,
      })),
    };
    const res = await gradeAllExercises(payload);
    setResult(res);
  }

  
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

  function handleAnswerChange(exerciseId, answer) {
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  }

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

      {/* allow buttons if lab is not completed */}
      {/* MARK AS COMPLETED */}
      {!completed &&
      <div className="flex gap-4 mt-2">
        <Link href={`/track/${progress.learninTrackId}`}>
          <Button variant="ghost" className="mb-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
        <button
          onClick={async () => {
            await completeLab(lab.id, progress?.learninTrackId);
            setCompleted(true);
            alert("Lab marked as completed!");
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Mark as Completed
        </button>

        <button
          onClick={submitAllAnswers}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Grade Excercises
        </button>
      </div>
      }
      {completed &&
        <div className="flex gap-4">
        <Link href={`/track/${progress.learninTrackId}`}>
          <Button variant="ghost" className="mb-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Track
          </Button>
        </Link>
        <div className="flex items-center text-green-700">
          <DynamicIcon name="Award" className="w-7 h-7 text-green" />
          Completed
        </div>
        </div>
      }

       {result && (
        <div className="mt-2 text-xs">
          {/* Summary Card */}
          <div className="p-2 border rounded-lg shadow max-w-md mx-auto">
            <div className="flex justify-between mb-1">
              <span>Earned Points:</span>
              <span>{result.earned} / {result.total}</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(result.earned / result.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Detailed Breakdown */}
          <table className="w-full mt-2 border-collapse max-w-md mx-auto">
            <thead>
              <tr>
                <th className="border px-3 py-1 text-left">Exercise</th>
                <th className="border px-3 py-1 text-right">Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.details).map(([exerciseId, detail]) => (
                <tr key={exerciseId}>
                  <td className="border px-3 py-1">{detail.question}</td>
                  <td className={`border px-3 py-1 text-right ${detail.score === 0 ? "text-red-600" : "text-green-600"}`}>
                    {detail.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

      <hr className="my-2" />

      {/* Exercises Section */}
      {lab.exercises?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Exercises</h2>

          <div className="flex flex-col gap-6">
            {lab.exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex}  
                initialSubmission={initialResults}
                onAnswerChange={handleAnswerChange}/>
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



function ExerciseCard({ exercise, onAnswerChange, initialSubmission }) {
  // Map initialSubmission.details[exercise.id] to earnedPoints
  const earnedPoints = initialSubmission?.details?.[exercise.id]?.score ?? 0;
  const prevAnswer = initialSubmission?.details?.[exercise.id]?.answer ?? "";

  const [answer, setAnswer] = React.useState(prevAnswer); // optional: if you have previous answer, you can pass it
  const [result, setResult] = React.useState(
    earnedPoints > 0 ? { earnedPoints, total: exercise.points, correct: earnedPoints > 0 } : null
  );


  function handleAnswerChange(value) {
    setAnswer(value);
    onAnswerChange(exercise.id, value);
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{exercise.title}</h3>
      <p className="text-sm text-gray-600 whitespace-pre-line mb-3">{exercise.question}</p>

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
                  checked={answer === opt}
                  onChange={(e) => handleAnswerChange(e.target.value)}
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
          {["true", "false"].map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`ex-${exercise.id}`}
                value={val}
                checked={answer === val}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </label>
          ))}
        </div>
      )}

      {/* CODE / TEXT */}
      {["CODE", "TEXT"].includes(exercise.type) && (
        <textarea
          placeholder="Write your answer here..."
          className="w-full border rounded p-2 mt-2 text-sm font-mono"
          rows={exercise.type === "CODE" ? 6 : 4}
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}

      {result && (
        <div className={`mt-3 text-sm font-semibold ${result.correct ? "text-green-600" : "text-red-600"}`}>
          {result.correct ? "Correct!" : "Incorrect."} You earned {result.earnedPoints} out of {result.total} points.
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">{exercise.points} points</div>
    </div>
  );
}
