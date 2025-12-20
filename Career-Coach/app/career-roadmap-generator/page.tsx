"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2Icon } from "lucide-react";
import RoadmapCanvas from "./_components/RoadmapCanvas";

type RoadmapStep = {
  id: number;
  title: string;
  description: string;
};

type RoadmapResult = {
  title: string;
  description: string;
  duration: string;
  nodes: RoadmapStep[];
};

export default function CareerRoadmapGeneratorPage() {
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async () => {
    if (!role) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/openrouter/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to generate roadmap");
      }

      //  ALREADY PARSED JSON
      setResult(data);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-[380px] p-6 bg-white border-r">
        <h1 className="text-2xl font-bold mb-3">
          {result?.title || "Career Roadmap Generator"}
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          {result?.description ||
            "Generate a professional career roadmap powered by AI."}
        </p>

        {result && (
          <p className="text-sm text-blue-600 mb-6">
            Duration: {result.duration}
          </p>
        )}

        <Button
          className="w-full bg-black text-white"
          onClick={() => setOpen(true)}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Another
        </Button>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 relative bg-gray-50">
        {result && <RoadmapCanvas nodes={result.nodes} />}

      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Position / Skills</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="e.g. Full Stack React Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button disabled={!role || loading} onClick={generateRoadmap}>
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                <Sparkles className="mr-2" />
              )}
              Generate Roadmap
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error && (
        <p className="absolute bottom-6 left-6 text-red-500">{error}</p>
      )}
    </div>
  );
}
