import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl md:text-5xl mb-6 text-balance">
            Ready to start your journey?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
            Join thousands of IT professionals and companies building the future of technology together. Choose your
            path and get started today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base gap-2" asChild>
              <Link href="/register">
                Join as IT Professional
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/register">Join as Recruiter</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-base" asChild>
              <Link href="/register">Explore Startups</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
