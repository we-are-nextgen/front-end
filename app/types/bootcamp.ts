
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
    bootcampId: number;
    bootcampName: string;
    bootcampVersion: string;
    bootcampStartId: number;
    cohortName: string;
    durationWeeks: number;
    startedAt: string;
    status: string;
};

export type UpcomingBootcamp = {
    id: number;
    name: string;
    description: string;
    durationWeeks: number;
    expectedStartDate: string;
    audience: string[];
    outcomes: string[];
    version: string;
};

export interface EnrollmentStatus {
  id: number;
  bootcampStartId: number;
  status: "OPEN_FOR_ENROLLMENT" | string;
  capacity: number;
  numberOfApplicants: number;
  amIEnrolled: boolean;
}
