"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Scene from "@/components/three/Scene";

export type Quality = "high" | "low";

/**
 * Canvas shell for the hero scene. Owns everything that touches the DOM:
 * - device heuristics → initial quality tier
 * - PerformanceMonitor → live downgrade if the GPU struggles
 * - IntersectionObserver → halts the frameloop entirely once scrolled past
 * - fade-in once the first frame is ready
 */
export default function HeroScene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const [quality, setQuality] = useState<Quality>("high");

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (coarse || lowCpu) setQuality("low");
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn(
        "absolute inset-0 transition-opacity duration-1000 ease-out",
        ready ? "opacity-100" : "opacity-0"
      )}
    >
      <Canvas
        dpr={quality === "high" ? [1, 1.75] : [1, 1.35]}
        camera={{ position: [0, 0, 9], fov: 38 }}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        fallback={null}
      >
        <PerformanceMonitor onDecline={() => setQuality("low")}>
          <Suspense fallback={null}>
            <Scene quality={quality} scrollProgress={scrollProgress} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
