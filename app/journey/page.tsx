import { getJourney } from "@/lib/controllers/journeyController"
import { JourneyCard } from "@/components/journey-card"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


export default async function ProfessionalJourneyPage({ searchParams }: { searchParams?: { [key: string]: string } }) {
  const params = await searchParams;
  const id = params.id ? Number(params?.id) : undefined; // searchParams values are always strings, convert to number
  const journeysData = await getJourney(id);
  console.log(journeysData); // Debugging line
  const stages = journeysData.stages; 
  
  return (
    <main className="min-h-screen">
      <div className="container px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <section className="py-12 md:py-5">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4">
              {journeysData.name} <span className="text-primary">Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {journeysData.title}
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {stages.map((stage, index) => (
              <JourneyCard key={stage.id} {...stage} counter={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
