"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { WarlordModel } from "./WarlordModel";
import { ParallaxLayers } from "./ParallaxLayers";

class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.7, 1.5], fov: 50 }}>
        <ambientLight intensity={2.0} color="#2a3b2a" />
        <spotLight position={[0, 8, 10]} intensity={6} color="#4ade80" castShadow penumbra={1} distance={25} angle={1.0} />
        <directionalLight position={[-5, 5, -5]} intensity={3} color="#94a3b8" />
        {/* Rim Light for glowing outline */}
        <spotLight position={[0, -5, -8]} intensity={8} color="#22c55e" distance={20} penumbra={0.5} />
        {/* Face/Front Illuminator */}
        <pointLight position={[0, 1.5, 3]} intensity={5} color="#ffffff" distance={10} />
        
        <Environment preset="studio" />
        
        <CameraRig />
        <ParallaxLayers />
        
        <Suspense fallback={null}>
          <ErrorBoundary fallback={<FallbackBox />}>
            <WarlordModel />
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
