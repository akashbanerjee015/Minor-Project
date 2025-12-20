"use client";

type Node = {
  id?: number;
  title: string;
  description: string;
};

export default function RoadmapCanvas({ nodes }: { nodes: Node[] }) {
  const leftX = 360;
  const rightX = 720;
  const startY = 100;
  const gap = 140;

  const positioned = nodes.map((node, index) => ({
    ...node,
    x: index % 2 === 0 ? leftX : rightX,
    y: startY + index * gap,
  }));

  return (
    <div
      className="relative w-full"
      style={{ height: `${nodes.length * 160 + 200}px` }}
    >
      {/* Dotted Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {positioned.map((node, i) => {
          const next = positioned[i + 1];
          if (!next) return null;

          return (
            <line
              key={i}
              x1={node.x + 75}
              y1={node.y + 90}
              x2={next.x + 75}
              y2={next.y}
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        })}
      </svg>

      {/* Cards */}
      {positioned.map((node, i) => (
        <div
          key={i}
          className="absolute bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4 shadow-md w-[160px]"
          style={{
            left: node.x,
            top: node.y,
          }}
        >
          <h3 className="text-xs font-semibold mb-2 text-gray-900">
            {node.title}
          </h3>
          <p className="text-[10px] text-gray-600 leading-relaxed">
            {node.description}
          </p>
        </div>
      ))}
    </div>
  );
}
