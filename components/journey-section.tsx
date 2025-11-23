import { JourneyCard } from "@/components/journey-card"
import {
  BookOpen,
  Code,
  GitPullRequest,
  Users,
  TrendingUp,
  Building2,
  Search,
  DollarSign,
  Award,
  Briefcase,
  Lightbulb,
  UserPlus,
  Network,
  Zap,
} from "lucide-react"

const itJourney = [
  {
    stage: "Stage 1",
    title: "Foundation",
    subtitle: "Onboarding & Learning",
    icon: BookOpen,
    items: ["Join community, set up profile", "Enroll in bootcamps & hands-on labs", "Work toward certifications"],
  },
  {
    stage: "Stage 2",
    title: "Practice",
    subtitle: "Real Use Cases",
    icon: Code,
    items: [
      "Join hackathons & coding challenges",
      "Work on customer use-case simulations",
      "Start building GitHub portfolio",
    ],
  },
  {
    stage: "Stage 3",
    title: "Contribution",
    subtitle: "Projects & Open Source",
    icon: GitPullRequest,
    items: [
      "Contribute to open source projects",
      "Join team incubators (cross-functional squads)",
      "Build reputation via successful contributions",
    ],
  },
  {
    stage: "Stage 4",
    title: "Growth",
    subtitle: "Mentorship & Leadership",
    icon: Users,
    items: [
      "Become a mentor for new members",
      "Publish blogs, give talks, advocate technologies",
      "Guide teams & incubators",
    ],
  },
  {
    stage: "Stage 5",
    title: "Impact",
    subtitle: "Career & Global Influence",
    icon: TrendingUp,
    items: [
      "Land jobs or build startups",
      "Launch impactful community projects",
      "Scale contributions across industries",
    ],
  },
]

const recruiterJourney = [
  {
    stage: "Stage 1",
    title: "Onboarding",
    subtitle: "Setup & Discovery",
    icon: Building2,
    items: [
      "Create company & recruiter profiles",
      "Select skill investment interests",
      "Get an overview of CV bank & talent pool",
    ],
  },
  {
    stage: "Stage 2",
    title: "Talent Discovery",
    subtitle: "Find Rising Stars",
    icon: Search,
    items: [
      "Explore CV bank with filters (skills, projects, certifications)",
      "Use AI matching to find rising talent",
      "Shortlist candidates & build pipelines",
    ],
  },
  {
    stage: "Stage 3",
    title: "Community Investment",
    subtitle: "Sponsor & Fund",
    icon: DollarSign,
    items: [
      "Sponsor incubators (AI, Cloud, Security, etc.)",
      "Fund hackathons and coding challenges",
      "Submit skill investment/resource proposals",
      "Arrange private hiring competitions",
    ],
  },
  {
    stage: "Stage 4",
    title: "Branding",
    subtitle: "Build Reputation",
    icon: Award,
    items: [
      "Host webinars, AMAs, and community events",
      "Gain visibility as a top recruiter",
      "Share success stories of hires",
    ],
  },
  {
    stage: "Stage 5",
    title: "Hiring Outcomes",
    subtitle: "Measure Success",
    icon: Briefcase,
    items: [
      "Hire top-performing developers",
      "Track ROI of sponsored programs",
      "Establish long-term brand recognition in the community",
    ],
  },
]

const startupJourney = [
  {
    stage: "Stage 1",
    title: "Foundation",
    subtitle: "Onboarding & Discovery",
    icon: Lightbulb,
    items: [
      "Register as a startup in the community",
      "Create a profile with vision, product idea, and current challenges",
      "Identify needed skills and technical gaps",
      "Explore the developer CV bank and available talent pool",
    ],
  },
  {
    stage: "Stage 2",
    title: "Discovery",
    subtitle: "Talent Discovery",
    icon: UserPlus,
    items: [
      "Match with developers and mentors from the community",
      "Build small project teams for MVPs and proofs-of-concept",
      "Start collaborating on technical tasks and use cases",
    ],
  },
  {
    stage: "Stage 3",
    title: "Incubation",
    subtitle: "Product Development",
    icon: Code,
    items: [
      "Join the Startup Incubator Track",
      "Access infrastructure, labs, and architecture guidance",
      "Run hackathons to test concepts and attract contributors",
      "Build and refine the first product (MVP)",
    ],
  },
  {
    stage: "Stage 4",
    title: "Growth",
    subtitle: "Community Integration",
    icon: Network,
    items: [
      "Open source selected parts of the project for community adoption",
      "Gain visibility through demo days, startup spotlight sessions, and blogs",
      "Partner with recruiters to scale the team with specialized talent",
    ],
  },
  {
    stage: "Stage 5",
    title: "Impact",
    subtitle: "Scale",
    icon: Zap,
    items: [
      "Launch MVP to market with community support",
      "Pitch to investors via community pitch events",
      "Scale product and operations while maintaining talent pipeline",
    ],
  },
]

export function JourneySection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4">
        {/* IT Professional Journey */}
        <div className="mb-32">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6 text-balance">
              IT Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Your path from learning to global impact. Progress through five stages of professional growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {itJourney.map((journey, index) => (
              <JourneyCard key={index} {...journey} />
            ))}
          </div>
        </div>

        {/* Recruiter Journey */}
        <div className="mb-32">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6 text-balance">
              Recruiter Journey
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Connect with proven talent and build your employer brand through community engagement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {recruiterJourney.map((journey, index) => (
              <JourneyCard key={index} {...journey} accent />
            ))}
          </div>
        </div>

        {/* Startup Journey */}
        <div>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6 text-balance">
              Startup Journey
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Transform your idea into a scalable solution with community talent and resources.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {startupJourney.map((journey, index) => (
              <JourneyCard key={index} {...journey} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
