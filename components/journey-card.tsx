import { Milestone, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {DynamicIcon} from "@/components/ui/DynamicIcon";

export function JourneyCard({ id, name, description, milestones, icon , counter}: 
                                   { id: number; name: string; description: string; milestones: { id: number; name: string }[]; icon: string; counter: number }) {
  return (
 <div className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      {/* Stage badge */}
      <div
        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
        {counter}
      </div>

      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex rounded-lg p-3 bg-primary/10">
          <DynamicIcon name={icon} className="w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-1 text-xl font-bold text-card-foreground">{name}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>

      {/* Items */}
      <ul className="space-y-2">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Milestone className="mt-1.5 h-4 w-4 flex-shrink-0 rounded-full"/>
            <span className="leading-relaxed">{milestone.name}</span>
          </li>
        ))}
      </ul>
    </div>
)
}
