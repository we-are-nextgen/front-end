import { Incubators } from "@/components/incubators"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function IncubatorsPage() {
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
      <Incubators />
      <Footer />
    </main>
  )
}
