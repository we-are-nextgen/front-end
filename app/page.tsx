import { Hero } from "@/components/hero"
import { Vision } from "@/components/vision"
import { DomainsOverview } from "@/components/domains-overview"
import { IncubatorsOverview } from "@/components/incubators-overview"
import { JourneysOverview } from "@/components/journeys-overview"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Vision />
      <DomainsOverview />
      <IncubatorsOverview />
      <JourneysOverview />
      <CTA /> 
      <Footer />
    </main>
  )
}


