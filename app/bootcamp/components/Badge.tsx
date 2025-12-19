
import { DynamicIcon } from "@/components/ui/DynamicIcon";


export default function ComponentBadge({ type }: { type: string }) {
  const ICONS: Record<string, string> = {
    primer: "BookOpen",
    demo: "Play",
    lab: "FlaskConical",
    quiz: "HelpCircle",
    discussion: "MessageSquare",
  };

  return (
    <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] rounded bg-gray-100 text-gray-700">
      <DynamicIcon name={ICONS[type] || "File"} className="w-3 h-3" />
      {type}
    </span>
  );
}
