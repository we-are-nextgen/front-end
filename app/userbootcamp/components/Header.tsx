
import { BOOTCAMP_STATUS_CONFIG} from "@/app/types/bootcamp";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


export default function HeaderSection({ userBootcampStart }: { userBootcampStart: any }) {
  //console.log(bootcamp);
  const bootcamp = userBootcampStart.bootcampStart.bootcamp;
  const bootcampStart = userBootcampStart.bootcampStart;
  const statusCfg = BOOTCAMP_STATUS_CONFIG[bootcampStart.status];
  
  return (
    <div className="relative border rounded-xl p-5 bg-background shadow-sm">
      
       <Link href="/dashboard/it-professional" className="absolute right-2">
        <Button variant="ghost" className="mb-1 cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>      



      {/* Title */}
      <h1 className="text-2xl font-semibold text-foreground">
        {bootcamp.name}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-foreground mt-2">
        <span>Version {bootcamp.version}</span>
        <span>⏳ {bootcamp.durationWeeks} weeks</span>
        <span>🗓 Started At: {new Date(bootcampStart.startedAt).toLocaleDateString()} - {new Date(bootcampStart.startedAt).toLocaleTimeString()} </span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-foreground mt-2">
          <span>Cohort: {bootcampStart.cohortName}</span>
          <span>Status : {statusCfg.label}</span>
      </div>
      {/* Audience */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {bootcamp.audience?.map((a: string, i: number) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
