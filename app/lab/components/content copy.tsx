
"use client";

import ReactMarkdown from "react-markdown";
import { completeLab } from "@/lib/controllers/labController";

export default function LabContent({ lab }) {
  return (
    <div className="p-6 prose max-w-full">
      <h1 className="text-3xl font-bold">{lab.name}</h1>
      <p className="text-gray-600 mb-4">{lab.description}</p>
      <button
         onClick={async () => {
          await completeLab(lab.id);
          alert("Lab marked as completed!");
        }}
        className="px-4 py-2 mt-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
        Mark as Completed
      </button>

      {/* Markdown content */}
      {lab.contentMarkdown && (
        <ReactMarkdown>{lab.contentMarkdown}</ReactMarkdown>
      )}

      {/* HTML content (from converted file) */}
      {lab.contentHtml && (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: lab.contentHtml }}
        />
      )}
    </div>
  );
}
