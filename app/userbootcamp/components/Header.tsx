

export default function HeaderSection({ bootcamp }: { bootcamp: any }) {

  return (
    <div className="relative border rounded-xl p-5 bg-background shadow-sm">
      
      {/* Title */}
      <h1 className="text-2xl font-semibold text-foreground">
        {bootcamp.name}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-foreground mt-2">
        <span>Version {bootcamp.version}</span>
        <span>⏳ {bootcamp.durationWeeks} weeks</span>
        <span>
          🗓 Starts{" "}
          {new Date(bootcamp.expectedStartDate).toLocaleDateString()}
        </span>
      </div>

      {/* Audience */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Audience</h2>
        <div className="flex flex-wrap gap-2">
          {bootcamp.audience?.map((a: string, i: number) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
