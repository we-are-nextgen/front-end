import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Cloud, Shield, Database, Smartphone, Palette } from "lucide-react"
import Link from "next/link"

export function DomainsOverview() {
  const tracks = [
    { icon: Code, name: "Software Development", color: "text-blue-500" },
    { icon: Cloud, name: "Cloud & DevOps", color: "text-cyan-500" },
    { icon: Shield, name: "Cybersecurity", color: "text-red-500" },
    { icon: Database, name: "Data & AI", color: "text-purple-500" },
    { icon: Smartphone, name: "Mobile Development", color: "text-green-500" },
    { icon: Palette, name: "UI/UX Design", color: "text-pink-500" },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            Choose Your <span className="text-primary">Career Track</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore 10 specialized IT career paths with tailored learning experiences, projects, and community support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {tracks.map((track) => (
            <div
              key={track.name}
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <track.icon className={`h-8 w-8 ${track.color}`} />
              <span className="text-sm font-medium text-center text-foreground">{track.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/domains">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              View All 10 Tracks
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
