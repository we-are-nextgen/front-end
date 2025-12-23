
// Bootcamp model

export const BOOTCAMP_STATUS_ORDER = [
    "OPEN_FOR_ENROLLMENT",
    "SARTED",
    "KICKOFF",
    "ORIENTATION",
    "CORE_MODULES",
    "PRACTICE_MODULES",
    "COMPLETED",
];

export type UserBootcamp = {
    bootcampId: string;
    bootcampName: string;
    bootcampVersion: string;
    bootcampStartId: string;
    userBootcampId: string;
    cohortName: string;
    durationWeeks: number;
    startedAt: string;
    status: string;
};

export type UpcomingBootcamp = {
    id: string;
    name: string;
    description: string;
    durationWeeks: number;
    expectedStartDate: string;
    audience: string[];
    outcomes: string[];
    version: string;
};

export interface EnrollmentStatus {
  id: string;
  bootcampStartId: string;
  userBootcampId: string;
  status: "OPEN_FOR_ENROLLMENT" | string;
  capacity: number;
  numberOfApplicants: number;
  amIEnrolled: boolean;
}



export const BOOTCAMP_STATUS_CONFIG: Record<
    string,
    { label: string; icon: string; color: string } > = {
    OPEN_FOR_ENROLLMENT: { label: "Enrollment", icon: "Play", color: "text-blue-600" },
    SARTED: { label: "Started", icon: "Play", color: "text-blue-600" },
    KICKOFF: { label: "Kickoff", icon: "Rocket", color: "text-purple-600" },
    ORIENTATION: { label: "Orien", icon: "Compass", color: "text-amber-600" },
    CORE_MODULES: { label: "Core", icon: "Layers", color: "text-green-600" },
    PRACTICE_MODULES: { label: "Practice", icon: "Wrench", color: "text-orange-600" },
    COMPLETED: { label: "Completed", icon: "CheckCircle", color: "text-emerald-600" },
};