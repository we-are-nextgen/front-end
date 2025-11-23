import "server-only";

let journeys: any = null;

export async function getJourneys() {
  if (journeys) return journeys;

  const res = await fetch("http://localhost:8080/journeys", {
    cache: "force-cache", // or "no-store" if it must always be fresh
  });

  journeys = await res.json();
  return journeys;
}
