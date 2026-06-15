"use client";

import { useState } from "react";

interface EducatesPanelProps {
  sessionActivationUrl: string;
  workshopName?: string;
  returnPath?: string;
  onRetry?: () => Promise<string | null>;
}

export default function EducatesPanel({
  sessionActivationUrl: initialUrl,
  workshopName,
  returnPath,
  onRetry,
}: EducatesPanelProps) {
  const [activationUrl, setActivationUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    if (!onRetry) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = await onRetry();
      if (url) {
        setActivationUrl(url);
      } else {
        setError("Could not obtain a new workshop session.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reconnect to workshop");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40">
        <div>
          <h2 className="text-sm font-semibold">Workshop Environment</h2>
          {workshopName && (
            <p className="text-xs text-muted-foreground">{workshopName}</p>
          )}
        </div>
        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={loading}
            className="text-xs px-3 py-1 rounded-md border hover:bg-muted disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Reconnect"}
          </button>
        )}
      </div>

      {error && (
        <div className="mx-3 mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <iframe
        key={activationUrl}
        src={activationUrl}
        title={workshopName ? `Educates workshop: ${workshopName}` : "Educates workshop"}
        className="flex-1 w-full border-0 min-h-[480px]"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}
