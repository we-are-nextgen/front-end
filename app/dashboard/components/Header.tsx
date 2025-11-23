"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Layout } from "lucide-react";
import { CsvBadges } from "@/components/ui/CsvBadges"

export default function Header({ profile = null}: { profile?: null}) {
  const [domain, setDomain] = useState("engineering");
  const [track] = useState(profile?.profile?.name);

  const domains = [
    { value: "engineering", label: "Engineering & Development" },
    { value: "data-ai", label: "Data & AI" },
    { value: "security", label: "Security" },
    { value: "product-design", label: "Product & Design" },
    { value: "leadership", label: "Leadership & Strategy" },
    { value: "education", label: "Education & Community" },
  ];

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-primary">IT Pro Dashboard</span>

        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Domain" />
          </SelectTrigger>
          <SelectContent>
            {domains.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


      <Popover>
      <PopoverTrigger asChild>
        <Badge variant="secondary" className="ml-2 text-sm font-medium">
          <Layout className="w-1"></Layout> {track}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-3 space-y-1">
        <div className="text-xs text-gray-400">
          {profile?.profile?.description}
        </div>
        <div className="text-[10px] text-gray-200">
          <CsvBadges csv={profile?.profile?.skills} />
        </div>
      </PopoverContent>
      </Popover>



        
      </div>

      <div className="flex items-center gap-3">
        <button className="text-gray-600 hover:text-gray-900">🔔</button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/wael2000.png" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
