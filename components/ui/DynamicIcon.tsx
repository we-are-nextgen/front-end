import {
  User,
  Activity,
  Code2,
  Wrench,
  MessageSquare,
  Code,
  Cloud,
  Database,
  Shield,
  Layers,
  Palette,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  Lightbulb,
  UserPlus,
  Network,
  Zap,
  BookOpen,
  GitPullRequest,
  TrendingUp,
  Building2,
  Search,
  DollarSign,
  Award,
  Blocks
} from "lucide-react"

const icons = {
  User,
  Activity,
  Code2,
  Wrench,
  MessageSquare,
  Code,
  Cloud,
  Database,
  Shield,
  Layers,
  Palette,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  Lightbulb,
  UserPlus,
  Network,
  Zap,
  BookOpen,
  GitPullRequest,
  TrendingUp,
  Building2,
  Search,
  DollarSign,
  Award,
  Blocks
};

type IconName = keyof typeof icons;
export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const iconName = name as IconName;
  const LucideIcon = icons[iconName] || Code2;
  if (!LucideIcon) return null;
  return <LucideIcon className={className ?? "w-6 h-6"} />;
}
