import ModuleBlock from "./Module";

function formatLayerName(name: string) {
  return name.replace("_", " ").toUpperCase();
}

export default function CurriculumSection({ layers }: { layers: any[] }) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm ml-2 mr-2">
      <h3 className="font-semibold text-gray-800 mb-4">
        Curriculum
      </h3>

      <div className="space-y-3 text-gray-400">
        {layers.map((layer) => (
          <details
            key={layer.id}
            className="border rounded-lg"
          >
            <summary className="cursor-pointer px-4 py-3 bg-gray-50 font-medium text-sm rounded-2xl shadow-lg">
              {formatLayerName(layer.name)}
            </summary>

            <div className="px-4 py-4 space-y-4">
              {layer.modules.map((module: any) => (
                <ModuleBlock key={module.id} module={module} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
