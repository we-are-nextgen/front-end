
import ComponentBadge from "./Badge";

export default function ModuleBlock({ module }: { module: any }) {
  return (
    <div className="border-l-2 border-yellow-400 pl-4">
      <div className="font-medium text-sm text-gray-800">
        {module.name}
      </div>

      {module.objectives.length > 0 && (
        <ul className="list-disc pl-5 text-xs text-gray-600 mt-1">
          {module.objectives.map((o: string) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {module.components.map((c: any) => (
          <ComponentBadge key={c.id} type={c.type} />
        ))}
      </div>

      {module.linkedLabs.length > 0 && (
        <div className="text-xs text-gray-500 mt-2">
          Labs: {module.linkedLabs.join(", ")}
        </div>
      )}
    </div>
  );
}
