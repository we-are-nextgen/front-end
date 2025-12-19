

export default function DescriptionSection({ bootcamp }: { bootcamp: any }) {
  return (
    <div className="border rounded-xl border-gray-700 shadow-sm shadow-gray-400 p-5 bg-background space-y-1">
      <p className="text-sm text-gray-400">
        {bootcamp.description}
      </p>

      <div>
        <h3 className="font-medium text-foreground mb-2">
          What you’ll learn
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
          {bootcamp.outcomes.map((o: string) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
