"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Real Portal descriptions can run to several paragraphs — collapsed to 3
// lines by default with a toggle, instead of dumping the whole thing into
// the hero.
const COLLAPSE_THRESHOLD = 220;

export function ProjectSummary({ summary }: { summary: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = summary.length > COLLAPSE_THRESHOLD;

  return (
    <div className="max-w-2xl">
      <p
        className={cn(
          "text-muted-foreground text-body",
          isLong && !expanded && "line-clamp-3",
        )}
      >
        {summary}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-primary outline-none focus-visible:ring-ring/50 mt-2 rounded text-sm font-medium hover:underline focus-visible:ring-3"
        >
          {expanded ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
}
