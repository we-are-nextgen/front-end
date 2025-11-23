"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Code,
  Lightbulb,
  Users,
  Briefcase,
  Target,
  BookOpen,
  Award,
  FlaskConical,
  GitBranch,
  FileCode,
  Trophy,
  Rocket,
  Boxes,
  Bot,
  UserCheck,
  UsersRound,
  Crown,
  FolderGit,
  TrendingUp,
  Mic,
  Building,
  Server,
  Leaf,
} from "lucide-react"

const incubatorCategories = [
  {
    id: "learning",
    name: "Learning & Skill-Building",
    icon: GraduationCap,
    description: "Build confidence and accelerate learning through structured programs",
    incubators: [
      {
        name: "Bootcamp Incubator",
        description:
          "Short, intensive programs focused on mastering a specific technology stack (e.g., Kubernetes, AI/ML, security)",
        icon: BookOpen,
        stage: 1,
      },
      {
        name: "Certification Pathways",
        description: "Guided learning toward certifications (e.g., Red Hat, AWS, CNCF)",
        icon: Award,
        stage: 1,
      },
      {
        name: "Hands-on Labs",
        description: "Self-paced or guided labs where members work on practical scenarios",
        icon: FlaskConical,
        stage: 1,
      },
    ],
  },
  {
    id: "project",
    name: "Real-Use Case & Project",
    icon: Code,
    description: "Apply knowledge in realistic scenarios and real-world problems",
    incubators: [
      {
        name: "Open Source Contribution",
        description: "Pair mentors with members to contribute to upstream projects",
        icon: GitBranch,
        stage: 3,
      },
      {
        name: "Customer Use-Case",
        description: "Work on anonymized real-world enterprise problems with guidance",
        icon: FileCode,
        stage: 2,
      },
      {
        name: "Hackathon/Challenge",
        description: "Time-bound incubators where members solve specific challenges or build PoCs",
        icon: Trophy,
        stage: 2,
      },
    ],
  },
  {
    id: "innovation",
    name: "Innovation & Product",
    icon: Lightbulb,
    description: "Turn ideas into MVPs and scalable solutions",
    incubators: [
      {
        name: "Startup Incubator",
        description: "Encourage community members to turn ideas into MVPs using the ecosystem's tech stack",
        icon: Rocket,
        stage: 5,
      },
      {
        name: "Solution Design",
        description: "Work in teams to design scalable architectures for real problems",
        icon: Boxes,
        stage: 3,
      },
      {
        name: "AI/Automation",
        description: "Focused labs on creating AI-driven solutions, automation pipelines, or chatbots",
        icon: Bot,
        stage: 3,
      },
    ],
  },
  {
    id: "collaboration",
    name: "Collaboration & Mentorship",
    icon: Users,
    description: "Grow through teamwork and mentorship relationships",
    incubators: [
      {
        name: "Mentorship Incubator",
        description: "Pair experienced developers with newcomers for a structured growth journey",
        icon: UserCheck,
        stage: 4,
      },
      {
        name: "Team Incubator",
        description: "Form cross-functional groups (developers, designers, DevOps) to simulate real company teams",
        icon: UsersRound,
        stage: 3,
      },
      {
        name: "Leadership Incubator",
        description: "Train developers in soft skills, community leadership, and open-source governance",
        icon: Crown,
        stage: 4,
      },
    ],
  },
  {
    id: "career",
    name: "Career & Professional Growth",
    icon: Briefcase,
    description: "Build your professional brand and career trajectory",
    incubators: [
      {
        name: "Portfolio Incubator",
        description: "Help members build a strong GitHub/portfolio with real contributions",
        icon: FolderGit,
        stage: 5,
      },
      {
        name: "Career Incubator",
        description: "Focused on resume building, technical interviews, and career coaching",
        icon: TrendingUp,
        stage: 5,
      },
      {
        name: "Public Speaking & Advocacy",
        description: "Train members to become speakers, bloggers, and community advocates",
        icon: Mic,
        stage: 4,
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized Focus",
    icon: Target,
    description: "Deep dive into specific domains and technologies",
    incubators: [
      {
        name: "Domain-Specific",
        description: "Focus on specific industries: Finance, Healthcare, IoT, Telco use cases",
        icon: Building,
        stage: 2,
      },
      {
        name: "Technology-Specific",
        description: "Master specific technologies: Kubernetes, OpenShift, Edge Computing, Cloud Security",
        icon: Server,
        stage: 2,
      },
      {
        name: "Sustainability & Impact",
        description: "Build tech for social good and green IT initiatives",
        icon: Leaf,
        stage: 5,
      },
    ],
  },
]

const stageColors = {
  1: "text-blue-400",
  2: "text-cyan-400",
  3: "text-green-400",
  4: "text-purple-400",
  5: "text-pink-400",
}

export function Incubators() {
  const [activeTab, setActiveTab] = useState("learning")

  return (
    <section className="py-0 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Incubator Programs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Join structured programs designed to accelerate your growth from learning to leadership. Choose the path
            that matches your current stage and goals.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-muted/50 p-2">
            {incubatorCategories.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {incubatorCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <CategoryIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl md:text-3xl font-bold">{category.name}</h3>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.incubators.map((incubator) => {
                    const IncubatorIcon = incubator.icon
                    return (
                      <Card
                        key={incubator.name}
                        className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <IncubatorIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{incubator.name}</h4>
                            <span
                              className={`text-xs font-medium ${
                                stageColors[incubator.stage as keyof typeof stageColors]
                              }`}
                            >
                              Stage {incubator.stage}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{incubator.description}</p>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Journey Mapping */}
        <div className="mt-16 p-8 rounded-lg bg-muted/30 border border-border/50">
          <h3 className="text-2xl font-bold mb-6 text-center">Incubation Journey Stages</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                stage: 1,
                name: "Foundation",
                focus: "Learning & Skill-Building",
                color: "blue",
              },
              {
                stage: 2,
                name: "Practice",
                focus: "Real Use Cases",
                color: "cyan",
              },
              {
                stage: 3,
                name: "Contribution",
                focus: "Open Source & Teamwork",
                color: "green",
              },
              {
                stage: 4,
                name: "Growth",
                focus: "Mentorship & Leadership",
                color: "purple",
              },
              {
                stage: 5,
                name: "Impact",
                focus: "Professional & Social Good",
                color: "pink",
              },
            ].map((stage) => (
              <div key={stage.stage} className="p-4 rounded-lg bg-card/50 border border-border/50 text-center">
                <div className={`text-3xl font-bold mb-2 text-${stage.color}-400`}>{stage.stage}</div>
                <div className="font-semibold mb-1">{stage.name}</div>
                <div className="text-xs text-muted-foreground">{stage.focus}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Members can join at the right stage depending on their experience level
          </p>
        </div>
      </div>
    </section>
  )
}
