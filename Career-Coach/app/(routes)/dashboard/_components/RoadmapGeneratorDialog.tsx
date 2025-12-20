"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

export default function CareerRoadmapGenerator() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="p-8">
      {/* ✅ Button to open dialog */}
      <Button onClick={() => setOpenDialog(true)}>
        <SparklesIcon className="mr-2 h-4 w-4" />
        Generate Career Roadmap
      </Button>

      {/* ✅ Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Enter Position / Skills to Generate Roadmap
            </DialogTitle>
            <DialogDescription>
              <Input placeholder="e.g. Full Stack Developer" />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              <SparklesIcon className="mr-2 h-4 w-4" />
              Generate Roadmap
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
