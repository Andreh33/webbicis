"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll as useFramerScroll, useTransform } from "framer-motion";

function Spoke({ angle, side }: { angle: number; side: 1 | -1 }) {
  const x = Math.cos(angle) * 1.6;
  const y = Math.sin(angle) * 1.6;
  return (
    <mesh position={[x / 2, y / 2, side * 0.18]} rotation={[0, 0, angle + Math.PI / 2]}>
      <cylinderGeometry args={[0.011, 0.011, 1.6, 6]} />
      <meshStandardMaterial color="#D4D8DE" metalness={1} roughness={0.18} />
    </mesh>
  );
}

function Tire() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[2.05, 0.34, 28, 96]} />
        <meshStandardMaterial color="#070809" roughness={0.92} metalness={0.02} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.05, 0.345, 28, 96]} />
        <meshStandardMaterial color="#1E5FFF" emissive="#1E5FFF" emissiveIntensity={0.05} roughness={0.6} metalness={0.1} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function Rim() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.74, 1.74, 0.22, 96, 1, true]} />
        <meshStandardMaterial color="#161E36" metalness={0.95} roughness={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.66, 1.66, 0.18, 96, 1, true]} />
        <meshStandardMaterial color="#0B1226" metalness={0.95} roughness={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.7, 0.022, 8, 96]} />
        <meshStandardMaterial color="#9CA3AF" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

function Hub() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.55, 32]} />
        <meshStandardMaterial color="#1E5FFF" metalness={0.95} roughness={0.08} />
      </mesh>
      {[0.18, -0.18].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.05, 32]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      {[0.3, -0.3].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.08, 24]} />
          <meshStandardMaterial color="#0A0E1A" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function BrakeDisc() {
  const slots = useMemo(() => Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2), []);
  return (
    <group position={[0, 0, 0.4]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.92, 96, 1]} />
        <meshStandardMaterial color="#A8AEB6" metalness={1} roughness={0.28} side={THREE.DoubleSide} />
      </mesh>
      {slots.map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.65, Math.sin(angle) * 0.65, 0.005]} rotation={[Math.PI / 2, 0, angle]}>
          <boxGeometry args={[0.06, 0.005, 0.32]} />
          <meshStandardMaterial color="#0A0E1A" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.41, 24, 1]} />
        <meshStandardMaterial color="#1E5FFF" metalness={0.95} roughness={0.12} side={THREE.DoubleSide} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.27, Math.sin(a) * 0.27, 0.01]}>
            <cylinderGeometry args={[0.022, 0.022, 0.04, 12]} />
            <meshStandardMaterial color="#9CA3AF" metalness={1} roughness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

function BicycleWheel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.18 + scrollProgress * Math.PI * 2.5;
    groupRef.current.rotation.y = -0.35 + scrollProgress * 0.7;
    groupRef.current.rotation.x = -0.05 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
  });

  const spokes = useMemo(() => {
    const arr: { angle: number; side: 1 | -1 }[] = [];
    for (let i = 0; i < 32; i++) {
      arr.push({ angle: (i / 32) * Math.PI * 2, side: i % 2 === 0 ? 1 : -1 });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      <Tire />
      <Rim />
      {spokes.map((s, i) => (
        <Spoke key={i} angle={s.angle} side={s.side} />
      ))}
      <Hub />
      <BrakeDisc />
    </group>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = 7.5 - scrollProgress * 1.8;
    const targetY = 0.4 + scrollProgress * 0.4;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function CanvasScene({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useFramerScroll>["scrollYProgress"] }) {
  const progress = useRef(0);
  scrollYProgress.on("change", (v) => { progress.current = v; });

  return (
    <Canvas camera={{ position: [0, 0.4, 7.5], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#0A0E1A"]} />
      <fog attach="fog" args={["#0A0E1A", 8, 22]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 8, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-6, 2, -2]} color="#1E5FFF" intensity={6} distance={12} />
      <pointLight position={[5, -2, 3]} color="#4A8FFF" intensity={3} distance={10} />
      <pointLight position={[0, 5, -4]} color="#ffffff" intensity={1.5} distance={15} />

      <Environment preset="city" environmentIntensity={0.35} />

      <ScrollComponent progress={progress} />
      <ProgressCamera progress={progress} />

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.55}
        scale={12}
        blur={2.8}
        far={5}
        resolution={512}
        color="#000814"
      />
    </Canvas>
  );
}

function ScrollComponent({ progress }: { progress: React.MutableRefObject<number> }) {
  const sp = useRef(0);
  useFrame(() => {
    sp.current += (progress.current - sp.current) * 0.06;
  });
  return <BicycleWheel scrollProgress={sp.current} />;
}

function ProgressCamera({ progress }: { progress: React.MutableRefObject<number> }) {
  const sp = useRef(0);
  useFrame(() => {
    sp.current += (progress.current - sp.current) * 0.06;
  });
  return <CameraRig scrollProgress={sp.current} />;
}

export function WheelScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useFramerScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#0A0E1A" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 50% 50%, rgba(30,95,255,0.08) 0%, transparent 60%)"
        }} />

        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "#1E5FFF" }}>
            Ingeniería de precisión
          </p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
            Cada componente, perfecto.
          </h2>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex gap-8 md:gap-16">
          {[
            { num: "20", label: "Años de experiencia" },
            { num: "100%", label: "Servicio Öhlins" },
            { num: "24h", label: "Diagnóstico" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-xl md:text-3xl" style={{ color: "#4A8FFF" }}>{num}</p>
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
            </div>
          ))}
        </div>

        <motion.div style={{ width: "100%", height: "100%", opacity }}>
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
