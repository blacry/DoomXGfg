"use client";

import { useFrame } from "@react-three/fiber";
import { useScrollStore } from "@/lib/scrollProgress";
import * as THREE from "three";
import { useRef } from "react";

export function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  useFrame((state) => {
    if (!cameraRef.current) {
      cameraRef.current = state.camera as THREE.PerspectiveCamera;
    }
    
    const progress = useScrollStore.getState().progress;

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, 1.0, 0);

    // Subtle parallax effect based on cursor
    targetPos.set(
      (state.pointer.x * state.viewport.width) / 10, // ~1 unit left/right
      1.0 + (state.pointer.y * state.viewport.height) / 10,
      3.0
    );

    state.camera.position.lerp(targetPos, 0.05);
    
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    currentLookAt.lerp(targetLookAt, 0.05);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}
