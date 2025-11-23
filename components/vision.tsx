import { Target, Rocket, Users, GitBranch } from "lucide-react"

export function Vision() {
  return (
    <section className="py-20 md:py-5">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6 text-balance">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Accelerate professional growth and innovation by connecting IT professionals, startups, recruiters, and
            open-source communities through real-world projects, incubators, and collaborative learning experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Bridge the Gap</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect education with employability through hands-on experience
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Support Startups</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn ideas into scalable solutions with community talent
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Empower Recruiters</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engage with proven talent through transparent contribution data
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Sustain Open Source</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Integrate communities into learning and incubator ecosystems
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
