import HeaderSection from "../components/Header";
import Team from "../components/Team";
import Outcomes from "../components/Outcomes";
import LayersProgress from "../components/LayerProgress";
import { getUserBootcamp } from "@/lib/controllers/bootcampController";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserBootcamp({ params }: PageProps) {
  const { id } = use(params);
  const userBootcampStart = use(getUserBootcamp(id));

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection userBootcampStart={userBootcampStart} />

      {/* RELATIVE container defines overlay boundaries */}
      <div className="relative flex-1">

        {/* MAIN CONTENT (full width, normal flow) */}
        <div className="max-w-full mx-auto ml-20 px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">Bootcamp Content</h1>

          <div className="border rounded-xl p-5 bg-background shadow-sm">
            <p>
              This is where the main bootcamp content will be displayed.
              You can add modules, lessons, and other relevant information here.
            </p>
          </div>
        </div>

        {/* OVERLAY SIDEBAR (absolute, overlaps content) */}
        <div
          className="absolute top-6 left-6 flex flex-col z-50 max-w-[360px] pointer-events-auto"
        >
          <Outcomes outcomes={userBootcampStart?.bootcampStart?.bootcamp?.outcomes || []} />
          <Team users={userBootcampStart?.bootcampStart?.team || []} />
          <LayersProgress layers={userBootcampStart?.bootcampStart?.bootcamp?.layers || []} />
        </div>
      </div>
    </div>
  );
}
