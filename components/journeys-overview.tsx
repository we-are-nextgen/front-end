import { Button } from "@/components/ui/button"
import { ArrowRight, User, Briefcase, Lightbulb } from "lucide-react"
import Link from "next/link"

export function JourneysOverview() {
  const journeys = [
    {
      id: 1,
      icon: User,
      title: "IT Professional Journey",
      description:
        "From foundation to global impact through 5 progressive stages of learning, contribution, and leadership.",
      href: "/journey/professional",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      icon: Briefcase,
      title: "Recruiter Journey",
      description: "Discover, invest in, and hire top talent while building your brand in the community.",
      href: "/journey/recruiter",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      icon: Lightbulb,
      title: "Startup Journey",
      description: "Build your MVP, access talent, and scale your product with community support and resources.",
      href: "/journey/startup",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            Your <span className="text-primary">Journey</span> Starts Here
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three distinct paths, one unified ecosystem. Choose your journey and grow with the community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {journeys.map((journey) => (
            <div
              key={journey.title}
              className="flex flex-col p-8 rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
              <div className={`w-12 h-12 rounded-lg ${journey.bgColor} flex items-center justify-center mb-4`}>
                <journey.icon className={`h-6 w-6 ${journey.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{journey.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{journey.description}</p>
              <Link href={{ pathname: "/journey", query: { id: journey.id } }}>
                <Button variant="ghost" className="w-full gap-2 justify-between">
                  View Journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
