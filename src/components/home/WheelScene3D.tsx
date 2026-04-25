"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll as useFramerScroll, useTransform } from "framer-motion";

function Spoke({ angle }: { angle: number }) {
  const x = Math.cos(angle) * 1.35;
  const y = Math.sin(angle) * 1.35;
  const length = 1.35;
  const midX = x / 2;
  const midY = y / 2;

  return (
    <mesh position={[midX, midY, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
      <cylinderGeometry args={[0.008, 0.008, length, 4]} />
      <meshStandardMaterial color="#9CA3AF" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function BicycleWheel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = scrollProgress * Math.PI * 4;
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
    }
    (camera as THREE.PerspectiveCamera).position.z = 8 - scrollProgress * 4;
    camera.updateProjectionMatrix();
  });

  const spokes = Array.from({ length: 32 }, (_, i) => (i / 32) * Math.PI * 2);

  return (
    <group ref={groupRef}>
      {/* Tyre */}
      <mesh>
        <torusGeometry args={[2, 0.35, 16, 100]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Rim */}
      <mesh>
        <torusGeometry args={[1.7, 0.07, 12, 100]} />
        <meshStandardMaterial color="#2a3a6e" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Spokes */}
      {spokes.map((angle, i) => (
        <Spoke key={i} angle={angle} />
      ))}
      {/* Hub */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#1E5FFF" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Hub detail ring */}
      <mesh>
        <torusGeometry args={[0.28, 0.04, 8, 32]} />
        <meshStandardMaterial color="#4A8FFF" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

const LABELS = [
  { text: "PRECISIÓN", position: [-4.5, 0, 0] as [number, number, number], threshold: 0.15 },
  { text: "TECNOLOGÍA", position: [3.5, 1, 0] as [number, number, number], threshold: 0.5 },
  { text: "RENDIMIENTO", position: [-4, -1.2, 0] as [number, number, number], threshold: 0.8 },
];

function SceneLabels({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {LABELS.map(({ text, position, threshold }) => (
        <Text
          key={text}
          position={position}
          fontSize={0.35}
          color="#F5F7FA"
          font="/fonts/Syne-Bold.ttf"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={scrollProgress > threshold ? Math.min(1, (scrollProgress - threshold) * 3) : 0}
          letterSpacing={0.15}
        >
          {text}
        </Text>
      ))}
    </>
  );
}

export function WheelScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useFramerScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#0A0E1A" }}
      >
        {/* Section label */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "#1E5FFF" }}>
            Ingeniería de precisión
          </p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
            Cada componente, perfecto.
          </h2>
        </div>

        <motion.div
          style={{ width: "100%", height: "100%", opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
        >
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            </div>
          }>
            <CanvasScene scrollYProgress={scrollYProgress} />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}

function CanvasScene({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useFramerScroll>["scrollYProgress"] }) {
  const progress = useRef(0);

  scrollYProgress.on("change", (v) => { progress.current = v; });

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.3} color="#0A0E1A" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 2, 3]} color="#1E5FFF" intensity={3} />
      <pointLight position={[5, -2, -3]} color="#3B82F6" intensity={2} />
      <Environment preset="night" />

      <ScrollComponent progress={progress} />
    </Canvas>
  );
}

function ScrollComponent({ progress }: { progress: React.MutableRefObject<number> }) {
  const sp = useRef(0);

  useFrame(() => {
    sp.current += (progress.current - sp.current) * 0.05;
  });

  return (
    <>
      <BicycleWheel scrollProgress={sp.current} />
      <SceneLabels scrollProgress={sp.current} />
    </>
  );
}
