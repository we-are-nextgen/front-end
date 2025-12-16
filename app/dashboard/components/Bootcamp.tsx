"use client";

import { useEffect, useState } from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

const BOOTCAMP_STATUS_ORDER = [
  "SARTED",
  "KICKOFF",
  "ORIENTATION",
  "CORE_MODULES",
  "PRACTICE_MODULES",
  "COMPLETED",
];

type UserBootcamp = {
  bootcampId: number;
  bootcampName: string;
  bootcampVersion: string;
  bootcampStartId: number;
  cohortName: string;
  durationWeeks: number;
  startedAt: string;
  status: string;
};

const BOOTCAMP_STATUS_CONFIG: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  SARTED: { label: "Started", icon: "Play", color: "text-blue-600" },
  KICKOFF: { label: "Kickoff", icon: "Rocket", color: "text-purple-600" },
  ORIENTATION: { label: "Orientation", icon: "Compass", color: "text-amber-600" },
  CORE_MODULES: { label: "Core", icon: "Layers", color: "text-green-600" },
  PRACTICE_MODULES: { label: "Practice", icon: "Wrench", color: "text-orange-600" },
  COMPLETED: { label: "Completed", icon: "CheckCircle", color: "text-emerald-600" },
};

const TABS = [
  { id: "mine", label: "My Bootcamps" },
  { id: "overview", label: "Stats" },
  { id: "upcoming", label: "Upcoming" },
];

export default function Bootcamp({ profile = null }: { profile?: any }) {
  const [activeTab, setActiveTab] = useState("mine");
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [myBootcamps, setMyBootcamps] = useState<UserBootcamp[]>([]);
    useEffect(() => {
        Promise.all([
        fetch("/api/bootcamp/stats").then((r) => r.json()),
        fetch("/api/bootcamp/user").then((r) => r.json()),
        ])
        .then(([statsData, userBootcamps]) => {
            setStats(statsData);
            setMyBootcamps(userBootcamps);
        })
        .catch(() => {
            setStats({});
            setMyBootcamps([]);
        })
        .finally(() => setLoading(false));
    }, []);

/*
  useEffect(() => {
    fetch("/api/bootcamp/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bootcamp stats");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);*/

  return (
    <div className="relative p-4 rounded-xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 
                        flex items-center justify-center shadow-md border border-yellow-300">
          <DynamicIcon name="MessageSquare" className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-semibold text-gray-800">Bootcamps</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs border-b-2 transition cursor-pointer
              ${
                activeTab === tab.id
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <>
          {loading && (
            <div className="text-sm text-gray-500">Loading stats...</div>
          )}

          {!loading && stats && Object.keys(stats).length === 0 && (
            <div className="text-sm text-gray-500">
              No active bootcamp participation yet
            </div>
          )}

          {!loading && stats && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {BOOTCAMP_STATUS_ORDER.map((status) => {
                const count = stats[status];
                const cfg = BOOTCAMP_STATUS_CONFIG[status];
                if (!count || !cfg) return null;

                return (
                  <div key={status} className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-0">
                      <DynamicIcon
                        name={cfg.icon}
                        className={`w-5 h-5 ${cfg.color}`}
                      />
                    </div>
                    <div className={`text-sm font-semibold ${cfg.color}`}>
                      {count}
                    </div>
                    <div className={`text-[9px] ${cfg.color}`}>
                      {cfg.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {activeTab === "upcoming" && (
        <div className="text-sm text-gray-600">
          Upcoming bootcamps will be shown here
        </div>
      )}
      
       {/* MY BOOTCAMPS */}
      {activeTab === "mine" && (
        <>
          {loading && <div className="text-sm text-gray-500">Loading bootcamps…</div>}

          {!loading && myBootcamps.length === 0 && (
            <div className="text-sm text-gray-500">You are not enrolled in any bootcamp</div>
          )}

          <div className="space-y-2">
            {myBootcamps.map((bc) => {
              const cfg = BOOTCAMP_STATUS_CONFIG[bc.status];
              return (
                <div
                  key={bc.bootcampStartId}
                  className="p-3 border rounded-lg flex items-center justify-between bg-gray-50"
                >
                  <div>
                    <div className="font-medium text-sm text-gray-800">
                      {bc.bootcampName}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cohort: {bc.cohortName} • {bc.durationWeeks} weeks
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cfg && (
                      <>
                        <DynamicIcon
                          name={cfg.icon}
                          className={`w-4 h-4 ${cfg.color}`}
                        />
                        <span className={`text-xs font-medium ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
