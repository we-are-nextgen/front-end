"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const actionsByDomain: Record<string, string[]> = {
  engineering: [
    "Join a Full Stack Hackathon this weekend",
  ],
  "data-ai": [
    "Explore ML model deployment in OpenShift",
    "Join a Kaggle challenge with the community",
    "Publish your first data visualization notebook",
  ],
  security: [
    "Run a vulnerability scan on an open project",
    "Join a bug bounty simulation event",
    "Write a blog about OWASP Top 10",
  ],
  "product-design": [
    "Redesign a startup MVP prototype in Figma",
    "Join a UX review session",
    "Publish your first product case study",
  ],
  leadership: [
    "Mentor a new incubator team",
    "Host a community knowledge-sharing session",
    "Plan an architecture review workshop",
  ],
};

export default function RecommendedActions({ domain = "engineering" }: { domain?: string }) {
  const actions = actionsByDomain[domain] || [];

  return (
    <div className="p-4 border-b-current rounded-lg bg-white shadow-lg">
      <h2 className="font-semibold text-lg mb-3">Recommended Next Actions</h2>
      <div className="space-y-3">
        {actions.map((action, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-sm">{action}</CardTitle>
              <CardDescription>Curated for your current journey stage</CardDescription>
            </CardHeader>
            <CardContent>
              <button className="text-sm text-primary hover:underline">View Details →</button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
