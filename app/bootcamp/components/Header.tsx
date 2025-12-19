"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EnrollmentStatus } from "../../types/bootcamp";

export default function HeaderSection({ bootcamp }: { bootcamp: any }) {
  const router = useRouter();

  const [enrollment, setEnrollment] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bootcamp?.id) return;

    fetch(`/api/bootcamp/${bootcamp.id}/ready`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch enrollment status");
        return res.json();
      })
      .then(setEnrollment)
      .catch(() => setEnrollment(null))
      .finally(() => setLoading(false));
  }, [bootcamp?.id]);

  const canEnroll =
    enrollment?.status === "OPEN_FOR_ENROLLMENT" &&
    enrollment?.numberOfApplicants < enrollment?.capacity &&
    enrollment?.amIEnrolled === false;
  
  const enrolled = enrollment?.amIEnrolled;

  async function handleEnroll() {
    const res = await fetch(`/api/bootcampstart/${enrollment.bootcampStartId}/enroll`, { method: "POST" });
    const userBootcamp = await res.json();
    router.push(`/bootcampstart/${userBootcamp.bootcampStartId}`);
  }

  function toBootcampStart(){
    router.push(`/bootcampstart/${enrollment?.bootcampStartId}`);
  }

  return (
    <div className="relative border rounded-xl p-5 bg-background shadow-sm">
      {/* Actions */}
      <div className="absolute right-5 top-5 flex gap-2">
        {!loading && canEnroll && (
          <button onClick={handleEnroll}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow 
                       hover:bg-green-700 transition cursor-pointer"
          >
            Enroll Now
          </button>
        )}

        {!loading && enrolled && (
        <button onClick={toBootcampStart}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow 
                     hover:bg-indigo-700 transition cursor-pointer"
        >
          To my cohort
        </button>
        )}
      </div>
      

      {/* Title */}
      <h1 className="text-2xl font-semibold text-foreground">
        {bootcamp.name}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-foreground mt-2">
        <span>Version {bootcamp.version}</span>
        <span>⏳ {bootcamp.durationWeeks} weeks</span>
        <span>
          🗓 Starts{" "}
          {new Date(bootcamp.expectedStartDate).toLocaleDateString()}
        </span>
      </div>

      {/* Audience */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Audience</h2>
        <div className="flex flex-wrap gap-2">
          {bootcamp.audience?.map((a: string, i: number) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
