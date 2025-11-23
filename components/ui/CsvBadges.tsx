import { Badge } from "@/components/ui/badge";

const variants = ["default", "destructive"] as const;

function getRandomVariant() {
  return variants[Math.floor(Math.random() * variants.length)];
}

export function CsvBadges({ csv }: { csv: string }) {
  if (!csv) return null;

  const items = csv.split(",").map(i => i.trim());

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, index) => (
        <Badge
          key={index}
          variant={getRandomVariant()}
          className="text-xs px-2 py-1.0 rounded-full">
          {item}
        </Badge>
      ))}
    </div>
  );
}
