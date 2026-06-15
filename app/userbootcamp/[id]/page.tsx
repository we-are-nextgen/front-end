import HeaderSection from "../components/Header";
import Team from "../components/Team";
import Outcomes from "../components/Outcomes";
import LayersProgress from "../components/LayerProgress";
import BootcampModules from "../components/BootcampModules";
import { getUserBootcamp } from "@/lib/controllers/bootcampController";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserBootcamp({ params }: PageProps) {
  const { id } = use(params);
  const userBootcampStart = use(getUserBootcamp(id));
  const bootcamp = userBootcampStart?.bootcampStart?.bootcamp;
  const bootcampId = bootcamp?.id;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection userBootcampStart={userBootcampStart} />

      <div className="relative flex-1">
        <div className="max-w-full mx-auto ml-20 px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">Bootcamp Modules</h1>

          {bootcampId && bootcamp?.layers ? (
            <BootcampModules
              bootcampId={bootcampId}
              layers={bootcamp.layers}
              returnPath={`/userbootcamp/${id}`}
            />
          ) : (
            <div className="border rounded-xl p-5 bg-background shadow-sm">
              <p className="text-sm text-muted-foreground">
                No bootcamp modules available.
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-6 left-6 flex flex-col z-50 max-w-[360px] pointer-events-auto">
          <Outcomes outcomes={userBootcampStart?.bootcampStart?.bootcamp?.outcomes || []} />
          <Team users={userBootcampStart?.bootcampStart?.team || []} />
          <LayersProgress layers={userBootcampStart?.bootcampProgress?.layerProgresses || []} />
        </div>
      </div>
    </div>
  );
}
