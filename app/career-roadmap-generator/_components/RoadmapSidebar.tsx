export default function RoadmapSidebar() {
  return (
    <div className="p-6 rounded-xl border bg-white">
      <h1 className="text-xl font-bold">
        Full Stack React Developer Roadmap
      </h1>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        This roadmap outlines a structured path to becoming
        a proficient Full Stack React Developer, covering
        frontend, backend, and best practices.
      </p>

      <div className="mt-4 text-sm">
        <span className="font-medium">Duration:</span>{" "}
        <span className="text-blue-600">
          12+ months
        </span>
      </div>

      <button className="mt-6 w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-900">
        + Create Another Roadmap
      </button>
    </div>
  );
}
