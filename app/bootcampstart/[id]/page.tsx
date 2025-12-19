
import HeaderSection from "../components/Header";
import { getBootcamp } from "@/lib/controllers/bootcampController";


interface PageProps {
  params: Promise<{ id: number }>;
}

export default async function BootcampStartPage({ params }: PageProps) {
  const bootcamp = await getBootcamp(params.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
      <HeaderSection bootcamp={bootcamp} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      </div>
    </div>
  );
}
