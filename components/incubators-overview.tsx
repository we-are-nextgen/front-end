import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Rocket, Users, Trophy } from "lucide-react"
import Link from "next/link"

export function IncubatorsOverview() {
  const categories = [
    {
      icon: GraduationCap,
      name: "Learning & Skill-Building",
      count: 3,
      color: "text-blue-500",
    },
    {
      icon: Rocket,
      name: "Innovation & Product",
      count: 3,
      color: "text-purple-500",
    },
    {
      icon: Users,
      name: "Collaboration & Mentorship",
      count: 3,
      color: "text-green-500",
    },
    {
      icon: Trophy,
      name: "Real Use Cases & Projects",
      count: 3,
      color: "text-orange-500",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            Join Our <span className="text-primary">Incubators</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            18 specialized incubator programs across 6 categories to accelerate your growth from learning to leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <category.icon className={`h-10 w-10 ${category.color}`} />
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} incubator types</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/incubators">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              Explore All Incubators
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
