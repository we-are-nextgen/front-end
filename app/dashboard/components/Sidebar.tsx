"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge'


import { dashboardData } from "../data/dashboardData";

const stages = dashboardData.stages;
const color = "text-emerald-600";


export default function Sidebar() {
  const [active, setActive] = useState<number>(1);
  
  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white shadow-sm">
      <div className="p-4 text-lg font-semibold">Journey Stages</div>
      <Accordion type="single" collapsible className="w-full">
        {stages.map((stage) => (
          <AccordionItem key={stage.id} value={`stage-${stage.id}`}
            className="data-[state=open]:bg-background rounded-md border-1 border-gray-200 transition-colors duration-200">
            <AccordionTrigger
            className={cn(
                "px-4 py-2 font-medium flex items-start gap-2 justify-start text-left",
                active === stage.id ? `${color}` : "text-gray-700"
            )}
            onClick={() => setActive(stage.id)}
            >
                <Badge className="h-5 min-w-5 rounded-full px-1 mt-0.5 flex items-center justify-center">
                    {stage.id}
                </Badge>
                <div className="flex-1 text-left">{stage.name}</div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 px-4 py-3 text-xs text-muted-foreground bg-muted rounded-md">
            {stage.milestones.map((milestone) => (
                <p key={milestone.id}>• {milestone.name}</p>
            ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
