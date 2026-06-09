"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Quality } from "@/components/three/HeroScene";

/** Matches --color-void; fed to the transmission material as its backdrop. */
const VOID = new THREE.Color("#05060a");

/* ------------------------------ Camera rig ------------------------------ */
/** Mouse parallax + scroll dolly, critically damped for that "heavy camera" feel. */
function Rig({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  useFrame((state, delta) => {
    const scroll = scrollProgress.get();
    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, px * 0.65, 2.6, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, py * 0.4 - scroll * 0.7, 2.6, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 9 + scroll * 2.4, 2.6, delta);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/* ----------------------------- Hero artifact ----------------------------- */
/** The Prism: refractive glass icosahedron with a glowing core and facet wires. */
function Prism({ quality }: { quality: Quality }) {
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.74, 0)),
    []
  );

  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.16;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.22) * 0.18;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.45} floatIntensity={0.85}>
      <group>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.7, 0]} />
          {quality === "high" ? (
            <MeshTransmissionMaterial
              transmission={1}
              thickness={2.1}
              roughness={0.14}
              ior={1.45}
              chromaticAberration={0.5}
              anisotropicBlur={0.3}
              distortion={0.22}
              distortionScale={0.5}
              temporalDistortion={0.08}
              samples={6}
              resolution={512}
              background={VOID}
              attenuationDistance={2.6}
              attenuationColor="#8f9bff"
              color="#c9cfff"
            />
          ) : (
            <meshStandardMaterial
              color="#8a90ff"
              metalness={0.92}
              roughness={0.18}
              flatShading
            />
          )}
        </mesh>
        {/* glowing core, refracted through the glass */}
        <mesh scale={0.52}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#564ef0" toneMapped={false} />
        </mesh>
        {/* hairline facet wires */}
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#aab2ff" transparent opacity={0.16} />
        </lineSegments>
      </group>
    </Float>
  );
}

/* ------------------------------ Orbit rings ------------------------------ */
function Ring({
  radius,
  tilt,
  speed,
  color,
  satellite,
  satelliteSize,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  satellite: string;
  satelliteSize: number;
}) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[radius, 0.011, 12, 220]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.32}
            emissive={color}
            emissiveIntensity={0.22}
          />
        </mesh>
        {/* satellite riding the ring */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[satelliteSize, 16, 16]} />
          <meshBasicMaterial color={satellite} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------------------------- Floating shards ---------------------------- */
const SHARDS: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}[] = [
  { position: [-3.5, 1.5, -2.2], scale: 0.46, speed: 1.7, color: "#3f3c8f" },
  { position: [3.3, -1.3, -1.6], scale: 0.3, speed: 2.3, color: "#1d4f63" },
  { position: [2.7, 2, -3.2], scale: 0.4, speed: 2, color: "#37347e" },
  { position: [-2.9, -1.9, -2.6], scale: 0.27, speed: 2.5, color: "#1a4356" },
];

function Shards() {
  return (
    <>
      {SHARDS.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.1} floatIntensity={1.4}>
          <mesh position={s.position} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.color}
              metalness={0.95}
              roughness={0.22}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* -------------------------------- Scene --------------------------------- */
export default function Scene({
  quality,
  scrollProgress,
}: {
  quality: Quality;
  scrollProgress: MotionValue<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();

  // Push the artifact right on wide screens, center it (smaller) on narrow ones.
  const offsetX = THREE.MathUtils.clamp((viewport.width - 7.5) * 0.42, 0, 2.5);
  const scale = THREE.MathUtils.clamp(viewport.width / 11, 0.6, 1);

  useFrame((_, delta) => {
    if (root.current && !reduced) root.current.rotation.y += delta * 0.04;
  });

  return (
    <>
      <Rig scrollProgress={scrollProgress} />

      {/* lighting: cool key, spectrum rims */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 8, 5]} intensity={1.3} color="#dfe4ff" />
      <pointLight position={[-6, -3, -6]} intensity={2.4} decay={0} color="#6e66ff" />
      <pointLight position={[6, 2, -4]} intensity={1.7} decay={0} color="#22d3ee" />

      <group ref={root} position={[offsetX, 0.1, 0]} scale={scale}>
        <Prism quality={quality} />
        <Ring
          radius={2.75}
          tilt={[Math.PI / 2.2, 0.32, 0]}
          speed={0.16}
          color="#6e66ff"
          satellite="#b7bcff"
          satelliteSize={0.07}
        />
        <Ring
          radius={3.45}
          tilt={[Math.PI / 1.8, -0.42, 0.25]}
          speed={-0.11}
          color="#22d3ee"
          satellite="#9eecff"
          satelliteSize={0.05}
        />
        <Shards />
        {quality === "high" && (
          <ContactShadows
            position={[0, -2.7, 0]}
            opacity={0.42}
            scale={13}
            blur={2.8}
            far={4.2}
            resolution={256}
            frames={1}
            color="#02020a"
          />
        )}
      </group>

      <Sparkles
        count={quality === "high" ? 130 : 55}
        scale={[15, 9, 10]}
        position={[0, 0, -2]}
        size={1.9}
        speed={reduced ? 0 : 0.3}
        opacity={0.4}
        color="#9bb2ff"
      />

      {/* Studio environment built from light planes — no external HDR fetch. */}
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={1.4}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={2.2}
          position={[-5, 1, -1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[20, 0.7, 1]}
          color="#7c6cff"
        />
        <Lightformer
          intensity={1.8}
          position={[5, -1, -1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[20, 0.8, 1]}
          color="#22d3ee"
        />
        <Lightformer
          intensity={0.8}
          position={[0, -5, 2]}
          scale={[12, 2, 1]}
          color="#312e81"
        />
      </Environment>
    </>
  );
}
