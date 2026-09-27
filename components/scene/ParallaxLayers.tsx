"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/scrollProgress";
import { Float } from "@react-three/drei";

function FloatingShape({ position, rotation, speed }: any) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2} position={position}>
      <mesh rotation={rotation}>
        <octahedronGeometry args={[Math.random() * 0.3 + 0.1]} />
        <meshStandardMaterial 
          color="#22c55e" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#22c55e"
          emissiveIntensity={0.2}
          wireframe={Math.random() > 0.7}
        />
      </mesh>
    </Float>
  );
}

export function ParallaxLayers() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random floating shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2 // Mostly behind the main character
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 2 + 0.5
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const progress = useScrollStore.getState().progress;
    
    // Background moves slowly based on scroll to create parallax
    groupRef.current.position.y = progress * 8;
    
    // Slow overall rotation
    groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </group>
  );
}
