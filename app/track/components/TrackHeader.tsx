"use client";

import { useRouter } from "next/navigation";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import DifficultyIndicator from "@/components/DifficultyIndicator";

export default function TrackHeader({ track, progress }) {
  const router = useRouter();

  async function handleEnroll() {
    const res = await fetch(`/api/track/${track.id}`, { method: "POST" });
    const userLabProgress = await res.json();
    router.push(`/lab/${userLabProgress.labId}`);
  }

  function handleContinue() {
    if (progress.currentLabId) {
      router.push(`/lab/${progress.currentLabId}`);
    }
  }

  const enrolled = progress.enrolled;
  const completed = progress.completed;

  return (
    <div className="p-4 rounded-xl bg-white shadow-md border flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow">
        <DynamicIcon name={track.icon} className="w-7 h-7 text-white" />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{track.name} </h1>
        <p className="text-gray-600 text-sm">{track.description}</p>

        <div className="flex items-center gap-3 mt-2">
          <DifficultyIndicator level={track.difficultyLevel} />

          <span className="text-xs text-gray-500">
            {track.rewardPoints} pts
          </span>

          <span className="text-xs text-gray-500">
            {progress.completedLabs.length}/{track?.labs?.length} labs completed
          </span>
        </div>
      </div>

      {/* Enroll/Continue button */}
      {/* Button */}
      {completed ? (
        <div className="flex items-center text-green-700 font-medium">
          <DynamicIcon name="Award" className="w-7 h-7 text-green" />
          Completed
        </div>
      ) : !enrolled ? (
        <button
          onClick={handleEnroll}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Enroll Now
        </button>
      ) : (
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Continue
        </button>
      )}


      {/**  
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        onClick={() => {
          const target = progress.currentLabId 
            ? `/lab/${progress.currentLabId}`
            : `/track/${track.id}/enroll`;
          window.location.href = target;
        }}
      >
        {progress.enrolled ? "Continue" : "Enroll Now"}
      </button>
    */}


    </div>
  );
}
