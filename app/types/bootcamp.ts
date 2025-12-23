
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
