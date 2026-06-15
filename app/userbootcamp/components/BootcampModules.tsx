"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

interface Module {
  moduleId: string;
  name: string;
  type?: string;
  linkedLabs?: string[];
  components?: { type: string; reference: string }[];
}

interface Layer {
  name: string;
  type: string;
  modules?: Module[];
}

interface BootcampModulesProps {
  bootcampId: string;
  layers: Layer[];
  returnPath: string;
}

export default function BootcampModules({
  bootcampId,
  layers,
  returnPath,
}: BootcampModulesProps) {
  const router = useRouter();
  const [loadingModule, setLoadingModule] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function launchModule(module: Module) {
    setLoadingModule(module.moduleId);
    setError(null);

    try {
      const workshopRes = await fetch(
        `/api/bootcamp/${bootcampId}/modules/${module.moduleId}/workshop`
      );
      if (!workshopRes.ok) {
        throw new Error("This module has no Educates workshop configured.");
      }
      const workshop = await workshopRes.json();

      const sessionRes = await fetch("/api/workshops/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopName: workshop.workshopName,
          returnPath,
        }),
      });

      if (!sessionRes.ok) {
        const data = await sessionRes.json().catch(() => ({}));
        throw new Error(data.error || "Failed to start workshop session");
      }

      const session = await sessionRes.json();
      const params = new URLSearchParams({
        url: session.sessionActivationUrl,
        workshopName: workshop.workshopName,
        returnPath,
      });
      router.push(`/workshops/active?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to launch workshop");
    } finally {
      setLoadingModule(null);
    }
  }

  function hasLabContent(module: Module): boolean {
    if (module.linkedLabs && module.linkedLabs.length > 0) return true;
    return module.components?.some((c) => c.type === "lab") ?? false;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {layers.map((layer) => (
        <section key={layer.name} className="border rounded-xl p-5 bg-background shadow-sm">
          <h2 className="text-lg font-semibold capitalize mb-4">
            {layer.name.replace(/_/g, " ")}
          </h2>

          <ul className="space-y-3">
            {(layer.modules ?? []).map((module) => (
              <li
                key={module.moduleId}
                className="flex items-center justify-between gap-4 border rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-medium">{module.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {module.moduleId}
                    {module.type ? ` · ${module.type}` : ""}
                  </p>
                </div>

                {hasLabContent(module) && (
                  <button
                    onClick={() => launchModule(module)}
                    disabled={loadingModule === module.moduleId}
                    className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-foreground text-background hover:opacity-90 disabled:opacity-50"
                  >
                    <PlayCircle size={16} />
                    {loadingModule === module.moduleId
                      ? "Starting..."
                      : "Launch environment"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
