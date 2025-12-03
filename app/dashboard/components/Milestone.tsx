"use client";

import { Rocket, Circle, ArrowRight, Play } from "lucide-react";

export default function MilestoneCard({ profile = null }: { profile?: any }) {
    const currentProgress = profile?.userProgress?.length==1?
                            profile?.userProgress[0]:
                            profile?.userProgress?.find(x => x.status === "In-Progress");
    return (
        <div className="relative p-4 rounded-lg bg-white shadow-xl border border-indigo-100 overflow-hidden">

            {/* --- Growth Rings Background --- */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <div className="absolute w-[150px] h-[150px] rounded-full border-[8px] border-indigo-500 top-[-100px] left-[-80px]" />
                <div className="absolute w-[210px] h-[210px] rounded-full border-[6px] border-indigo-500 top-[-100px] left-[-80px]" />
                <div className="absolute w-[380px] h-[380px] rounded-full border-[4px] border-indigo-400 top-[-170px] left-[-150px]" />
                <div className="absolute w-[590px] h-[590px] rounded-full border-[2px] border-indigo-400 top-[-260px] left-[-240px]" />
            </div>

            <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-yellow-200">
                        <Rocket className="w-6 h-6 text-white drop-shadow" />
                    </div>
                </div>
                <h2 className="font-bold text-lg text-gray-800">
                    Next Step
                </h2>
            </div>


            {/* 2. Transition View */}
            <div className="flex items-center justify-between gap-3 relative">

                {/* Previous Step */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                    {/* Stage Name */}
                    <span className="mt-1 px-2 py-1 bg-indigo-500 text-white text-xs font-bold rounded-md shadow">
                        {currentProgress?.milestone?.name}
                    </span>
                    {/* Label */}
                    <p className="text-[10px] text-gray-500 mt-1">Current Milestone</p>
                </div>

                {/* ---- MIDDLE CONNECTOR ---- */}
                <div className="relative flex-shrink-0">
                    {/* Arrow Icon */}
                    <ArrowRight className="w-4 h-4 text-indigo-500 relative z-10" />
                </div>

                {/* Next Step */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                    <span className="mt-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-300 rounded-md">
                        {currentProgress?.nextMilestone?.name}
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1">Upcoming Milestone</p>
                </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 mt-4 text-xs text-gray-500 text-right">
                **{currentProgress?.nextMilestone?.description}
            </p>

        </div>

    );
}
