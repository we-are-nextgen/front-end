"use client";

import { useEffect, useState } from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { BOOTCAMP_STATUS_ORDER, UserBootcamp, UpcomingBootcamp} from "../../types/bootcamp"

const BOOTCAMP_STATUS_CONFIG: Record<
    string,
    { label: string; icon: string; color: string } > = {
    OPEN_FOR_ENROLLMENT: { label: "Enroll", icon: "Play", color: "text-blue-600" },
    SARTED: { label: "Started", icon: "Play", color: "text-blue-600" },
    KICKOFF: { label: "Kickoff", icon: "Rocket", color: "text-purple-600" },
    ORIENTATION: { label: "Orien", icon: "Compass", color: "text-amber-600" },
    CORE_MODULES: { label: "Core", icon: "Layers", color: "text-green-600" },
    PRACTICE_MODULES: { label: "Practice", icon: "Wrench", color: "text-orange-600" },
    COMPLETED: { label: "Completed", icon: "CheckCircle", color: "text-emerald-600" },
};

const TABS = [
    { id: "mine", label: "My Bootcamps" },
    { id: "upcoming", label: "Upcoming" },
    { id: "overview", label: "Stats" },
];

export default function Bootcamp({ profile = null }: { profile?: any }) {
    const [activeTab, setActiveTab] = useState("mine");
    const [stats, setStats] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(true);
    const [myBootcamps, setMyBootcamps] = useState<UserBootcamp[]>([]);
    const [upcomingBootcamps, setUpcomingBootcamps] = useState<UpcomingBootcamp[]>([]);

    // my bootcamps carousel
    const ITEMS_PER_PAGE = 2;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(myBootcamps.length / ITEMS_PER_PAGE);
    const visibleBootcamps = myBootcamps.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    const canGoPrev = page > 0;
    const canGoNext = page < totalPages - 1;
    const goPrev = () => canGoPrev && setPage((p) => p - 1);
    const goNext = () => canGoNext && setPage((p) => p + 1);


    /** upcoming carousel */
    const UPCOMING_PAGE_SIZE = 2;
    const [upcomingPage, setUpcomingPage] = useState(0);
    const upcomingTotalPages = Math.ceil(
        upcomingBootcamps.length / UPCOMING_PAGE_SIZE
    );
    const visibleUpcoming = upcomingBootcamps.slice(
        upcomingPage * UPCOMING_PAGE_SIZE,
        upcomingPage * UPCOMING_PAGE_SIZE + UPCOMING_PAGE_SIZE
    );

    const canPrevUpcoming = upcomingPage > 0;
    const canNextUpcoming = upcomingPage < upcomingTotalPages - 1;



    useEffect(() => {
        Promise.all([
            fetch("/api/bootcamp/stats").then((r) => r.json()),
            fetch("/api/bootcamp/user").then((r) => r.json()),
            fetch("/api/bootcamp/starting/2").then((r) => r.json()),
        ])
            .then(([statsData, userBootcamps, upcoming]) => {
                setStats(statsData);
                setMyBootcamps(userBootcamps);
                setUpcomingBootcamps(upcoming);
            })
            .catch(() => {
                setStats({});
                setMyBootcamps([]);
                setUpcomingBootcamps([]);
            })
            .finally(() => setLoading(false));
    }, []);

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
              ${activeTab === tab.id
                                ? "border-yellow-500 text-yellow-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* MY BOOTCAMPS */}
            {activeTab === "mine" && (
                <>
                    {loading && (
                        <div className="text-sm text-gray-500">Loading bootcamps…</div>
                    )}

                    {!loading && myBootcamps.length === 0 && (
                        <div className="text-sm text-gray-500">
                            You are not enrolled in any bootcamp
                        </div>
                    )}

                    {!loading && myBootcamps.length > 0 && (
                        <>
                            {/* Pagination controls */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <button
                                    onClick={goPrev}
                                    disabled={!canGoPrev}
                                    className={`flex items-center gap-1 px-2 py-1 rounded
                                        ${canGoPrev
                                            ? "hover:text-gray-700 cursor-pointer"
                                            : "opacity-40 cursor-not-allowed"
                                        }`}
                                >
                                    ← Prev
                                </button>

                                <span>
                                    {page + 1} / {totalPages}
                                </span>

                                <button
                                    onClick={goNext}
                                    disabled={!canGoNext}
                                    className={`flex items-center gap-1 px-2 py-1 rounded
                                        ${canGoNext
                                            ? "hover:text-gray-700 cursor-pointer"
                                            : "opacity-40 cursor-not-allowed"
                                        }`}
                                >
                                    Next →
                                </button>
                            </div>


                            {/* Bootcamp cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-1 mb-3">
                                {visibleBootcamps.map((bc) => {
                                    const cfg = BOOTCAMP_STATUS_CONFIG[bc.status];

                                    return (
                                        <div
                                            key={bc.bootcampStartId}
                                            className="p-3 border rounded-lg bg-gray-50 flex flex-col justify-between shadow-gray-500 shadow-md"
                                        >
                                            <div>
                                                <a href={`/bootcampstart/${bc.userBootcampId}`}>
                                                    <DynamicIcon name="SquareArrowOutUpRight" className="absolute right-10" />
                                                </a>
                                                <div className="font-medium text-xs text-gray-800">
                                                    {bc.bootcampName}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Cohort: {bc.cohortName} [ {bc.durationWeeks} weeks ]
                                                </div>
                                            </div>

                                            {cfg && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <DynamicIcon
                                                        name={cfg.icon}
                                                        className={`w-4 h-4 ${cfg.color}`}
                                                    />
                                                    <span className={`text-xs font-medium ${cfg.color}`}>
                                                        {cfg.label}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>



                        </>
                    )}
                </>
            )}

            {/* UPCOMING */}
            {activeTab === "upcoming" && (
                <>
                    {loading && (
                        <div className="text-sm text-gray-500">
                            Loading upcoming bootcamps…
                        </div>
                    )}

                    {!loading && upcomingBootcamps.length === 0 && (
                        <div className="text-sm text-gray-500">
                            No upcoming bootcamps scheduled
                        </div>
                    )}

                    {!loading && upcomingBootcamps.length > 0 && (
                        <>
                            {/* Pagination */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <button
                                    onClick={() => setUpcomingPage((p) => p - 1)}
                                    disabled={!canPrevUpcoming}
                                    className={`px-2 py-1 rounded
                                        ${canPrevUpcoming
                                            ? "hover:text-gray-700 cursor-pointer"
                                            : "opacity-40 cursor-not-allowed"
                                        }`}
                                >
                                    ← Prev
                                </button>

                                <span>
                                    {upcomingPage + 1} / {upcomingTotalPages}
                                </span>

                                <button
                                    onClick={() => setUpcomingPage((p) => p + 1)}
                                    disabled={!canNextUpcoming}
                                    className={`px-2 py-1 rounded
                                        ${canNextUpcoming
                                            ? "hover:text-gray-700 cursor-pointer"
                                            : "opacity-40 cursor-not-allowed"
                                        }`}
                                >
                                    Next →
                                </button>
                            </div>

                            {/* Cards */}
                            <div className="space-y-3 mb-3">
                                {visibleUpcoming.map((bc) => {
                                    const startDate = new Date(
                                        bc.expectedStartDate
                                    ).toLocaleDateString();

                                    return (
                                        <div
                                            key={bc.id}
                                            className="p-3 border rounded-lg bg-gray-50 flex flex-col gap-2"
                                        >
                                            <div className="font-medium text-sm text-gray-800">
                                                <a href={`/bootcamp/${bc.id}`}>
                                                <DynamicIcon name="SquareArrowOutUpRight" className="absolute right-6" />
                                                </a>
                                                {bc.name}
                                                <div className="text-[10px] pr-4">{bc.description}</div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                                <span>
                                                    🗓 Starts: <strong>{startDate}</strong>
                                                </span>
                                                <span>⏳ {bc.durationWeeks} weeks</span>
                                            </div>

                                            <div className="flex flex-wrap gap-1">
                                                {bc.audience.map((a) => (
                                                    <span
                                                        key={a}
                                                        className="px-2 py-0 text-[10px] rounded-full  text-yellow-700"
                                                    >
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </>
                    )}
                </>
            )}


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
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-0">
                                            <DynamicIcon
                                                name={cfg.icon}
                                                className={`w-8 h-8 ${cfg.color}`}
                                            />
                                        </div>
                                        <div className={`text-sm font-semibold ${cfg.color}`}>
                                            {count}
                                        </div>
                                        <div className={`text-[10px] ${cfg.color}`}>
                                            {cfg.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}            
        </div>
    );
}
