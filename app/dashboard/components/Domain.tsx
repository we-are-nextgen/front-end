import { getPaginatedTracks, getTracks } from "@/lib/controllers/domainController"
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Difficulty → colored dots
const DifficultyIndicator = ({ level }: { level: string }) => {
    const states = {
        BEGINNER: 1,
        INTERMEDIATE: 2,
        ADVANCED: 3,
    };

    const active = states[level as keyof typeof states] ?? 0;

    const colors = ["bg-green-500", "bg-yellow-500", "bg-red-500"];

    return (
        <div className="flex gap-1 mt-1">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index < active ? color : "bg-gray-300"
                    )}
                />
            ))}
        </div>
    );
};

export default async function LearningTracksCard({ profile }: { profile: any }) {
    const pageSize = 4;
    const domainId = profile?.domain?.id;

    const tracks = await getPaginatedTracks({ domainId: domainId, page: 0, pageSize: pageSize });
    const topTracks = tracks.tracks;
    const remaining = tracks.count - topTracks.length;

    //const enrolledTrackIds = [1, 3]; // example — replace with real user data
    const enrolledTrackIds = profile?.userTracks?.map(t => t.learningTrackId) ?? [];

    return (
            <div className="relative p-4 rounded-lg bg-white shadow-xl border border-indigo-100 overflow-hidden">
            {/* -- <div className="p-4 rounded-2xl bg-white shadow-md border border-indigo-100"> -- */}
            {/* --- Growth Rings Background --- */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <div className="absolute w-[150px] h-[150px] rounded-full border-[8px] border-indigo-500 top-[-100px] right-[-80px]" />
                <div className="absolute w-[210px] h-[210px] rounded-full border-[6px] border-indigo-500 top-[-100px] right-[-80px]" />
                <div className="absolute w-[380px] h-[380px] rounded-full border-[4px] border-indigo-400 top-[-170px] right-[-150px]" />
                <div className="absolute w-[590px] h-[590px] rounded-full border-[2px] border-indigo-400 top-[-260px] right-[-240px]" />
            </div>

            {/* --- Header --- */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 
                                flex items-center justify-center shadow-md border border-yellow-300">
                    <DynamicIcon name={profile?.domain?.icon} className="w-6 h-6 text-white" />
                </div>

                <h2 className="font-bold text-lg text-gray-900">Domain<small className="text-red-400">/Profile</small>
                    <small className="text-blue-400">/Tracks</small></h2>
            </div>

            {/* --- Domain Name + Description --- */}
            <p className="text-sm font-semibold text-gray-800">{profile?.domain?.name}</p>
            <p className="text-xs text-red-600 mb-0">{profile?.profile?.name}</p>

            {/* --- TRACK BADGES LIST --- */}
            <div className="flex items-center overflow-x-auto scrollbar-none py-2">

                {topTracks.map((track, index) => {
                    const isEnrolled = enrolledTrackIds.includes(track.id);

                    return (
                        <Link
                            href={`/track/${track.id}`}
                            key={track.id}
                            className={cn(
                                "relative shrink-0 px-2 py-3 rounded-2xl border shadow-sm border-blue-200",
                                "bg-gradient-to-b from-gray-50 to-gray-200",
                                "hover:scale-105 hover:z-50 cursor-pointer transition-transform duration-200",
                                index !== 0 && "-ml-4",
                                "flex flex-col items-center justify-center max-w-[120px] line-clamp-2",
                                isEnrolled && "border-green-400 shadow-sm shadow-green-500"
                            )}
                        >
                            {/* --- Enrolled Checkmark Badge --- */}
                            {isEnrolled && (
                                <span className=" absolute top-0 right-0 w-full h-2 bg-green-500">
                                </span>
                            )}

                            <span className="text-[11px] font-medium text-gray-700 line-clamp-1">
                                {track.name}
                            </span>

                            <DifficultyIndicator level={track.difficultyLevel} />
                        </Link>
                    );
                })}

                {/* --- +X MORE BADGE --- */}
                {remaining > 0 && (
                    <Link
                        href={`/domain/${profile?.domain?.id}/tracks`}
                        className={cn(
                            "shrink-0 px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm",
                            "bg-white/70 backdrop-blur-sm text-indigo-700 text-[10px] font-semibold",
                            "hover:bg-white hover:scale-110 hover:z-50 hover:shadow-md transition-all duration-200"
                        )}
                    >
                        +{remaining}
                    </Link>
                )}


            </div>
        </div>
    );
}
