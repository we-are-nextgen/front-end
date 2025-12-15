import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { getBootcampStats } from "@/lib/controllers/bootcampController";

const BOOTCAMP_STATUS_ORDER = [
  "SARTED",
  "KICKOFF",
  "ORIENTATION",
  "CORE_MODULES",
  "PRACTICE_MODULES",
  "COMPLETED",
];

const BOOTCAMP_STATUS_CONFIG: Record<
  string,
  { label: string; icon: string; color: string } > = {
  SARTED: { label: "Started", icon: "Play", color: "text-blue-600" },
  KICKOFF: { label: "Kickoff", icon: "Rocket", color: "text-purple-600" },
  ORIENTATION: { label: "Orientation", icon: "Compass", color: "text-amber-600" },
  CORE_MODULES: { label: "Core", icon: "Layers", color: "text-green-600" },
  PRACTICE_MODULES: { label: "Practice", icon: "Wrench", color: "text-orange-600" },
  COMPLETED: { label: "Completed", icon: "CheckCircle", color: "text-emerald-600" },
};

export default async function Bootcamp({ profile = null }: { profile?: any }) {
  const stats = await getBootcampStats();

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="p-4 rounded-xl bg-white shadow-xl text-gray-500">
        No active bootcamp participation yet
      </div>
    );
  }

  return (
    <div className="relative p-4 rounded-xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 
                                flex items-center justify-center shadow-md border border-yellow-300">
            <DynamicIcon name="MessageSquare" className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-semibold text-gray-800">Bootcamps</h2>
      </div>

      {/* Status icons */}
      <h3>Stats</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {BOOTCAMP_STATUS_ORDER.map((status) => {
          const count = stats[status];
          const cfg = BOOTCAMP_STATUS_CONFIG[status];
          if (!count || !cfg) return null;

          return (
            <div
              key={status}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <DynamicIcon
                  name={cfg.icon}
                  className={`w-6 h-6 ${cfg.color}`}
                />
              </div>

              {/* Count */}
              <div className={`text-lg font-semibold leading-tight ${cfg.color}`}>
                {count}
              </div>

              {/* Label */}
              <div className={`text-[10px] ${cfg.color}`}>
                {cfg.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
