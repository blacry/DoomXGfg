"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "@/lib/scrollProgress";
import { useCursorTarget } from "@/lib/useCursorTarget";

export function WarlordModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  const { nodes, materials, animations, scene } = useGLTF("/models/doom.glb", true) as any;
  const { actions, mixer } = useAnimations(animations, group);

  const cursorTarget = useCursorTarget();
  
  const [hasAnimations, setHasAnimations] = useState(false);
  const boneRefs = useRef<any>({});

  useEffect(() => {
    if (animations && animations.length > 0) {
      setHasAnimations(true);
    }
    
    scene.traverse((child: any) => {
      // Modify existing material to preserve textures while making it menacing
      if (child.isMesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.metalness = 0.8;
        mat.roughness = 0.4; // Increase roughness slightly so it's not like glossy plastic
        mat.envMapIntensity = 2.0;
        
        // Force the base color to a bright metallic green/silver to prevent it from being pitch black
        if (mat.color) {
           mat.color.set("#5a6b5c"); // Lighter metallic green
        }
      }

      // Catalog bones for procedural animation
      if (child.isBone) {
        const name = child.name.toLowerCase();
        if (name.includes("spine01") || name.includes("spine_01")) boneRefs.current.spine = child;
        if (name.includes("l_shoulder") || name.includes("leftshoulder")) boneRefs.current.lShoulder = child;
        if (name.includes("r_shoulder") || name.includes("rightshoulder")) boneRefs.current.rShoulder = child;
        if (name.includes("l_upperarm") || name.includes("leftarm") || name === "mixamorigleftarm") boneRefs.current.lArm = child;
        if (name.includes("r_upperarm") || name.includes("rightarm") || name === "mixamorigrightarm") boneRefs.current.rArm = child;
        if (name.includes("l_forearm") || name.includes("leftforearm") || name === "mixamorigleftforearm") boneRefs.current.lForearm = child;
        if (name.includes("r_forearm") || name.includes("rightforearm") || name === "mixamorigrightforearm") boneRefs.current.rForearm = child;
        if (name.includes("head") && !name.includes("nub")) boneRefs.current.head = child;
      }
    });

    if (animations && animations.length > 0) {
      const action = actions[Object.keys(actions)[0]];
      if (action) {
        action.play();
        action.paused = true; 
      }
    } else {
      // Character Creator (CC) rigs often require specific rotations to lower arms from A/T pose
      // Usually, Z or X axis needs about -70 degrees (approx -1.2 rad) for shoulders/upperarms
      if (boneRefs.current.lArm) {
        boneRefs.current.lArm.rotation.z = -1.2;
        boneRefs.current.lArm.rotation.x = -0.3; // Bring arm forward slightly
        boneRefs.current.lArm.rotation.y = -0.5; // Twist arm in
      }
      if (boneRefs.current.rArm) {
        boneRefs.current.rArm.rotation.z = 1.2;
        boneRefs.current.rArm.rotation.x = -0.3; 
        boneRefs.current.rArm.rotation.y = 0.5; 
      }
      // Bend elbows slightly
      if (boneRefs.current.lForearm) {
        boneRefs.current.lForearm.rotation.y = -0.5;
        boneRefs.current.lForearm.rotation.x = -0.2;
      }
      if (boneRefs.current.rForearm) {
        boneRefs.current.rForearm.rotation.y = 0.5;
        boneRefs.current.rForearm.rotation.x = -0.2;
      }
    }
  }, [animations, actions, scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    const progress = useScrollStore.getState().progress;
    const isHero = progress < 0.1;
    const transitionWeight = Math.max(0, 1 - (progress / 0.1));
    const time = state.clock.elapsedTime;

    // 1. Cursor Tracking (Hero State)
    if (transitionWeight > 0) {
      // Track with the head if available, otherwise track with the whole body
      const tracker = boneRefs.current.head || group.current;
      
      const targetYaw = cursorTarget.x * (Math.PI / 4); // Wider tracking range
      const targetPitch = -cursorTarget.y * (Math.PI / 6); // Inverted so looking UP looks UP
      
      const currentRotation = new THREE.Euler().setFromQuaternion(tracker.quaternion);
      const newYaw = THREE.MathUtils.lerp(currentRotation.y, targetYaw, 0.1);
      const newPitch = THREE.MathUtils.lerp(currentRotation.x, targetPitch, 0.1);
      
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(newPitch, newYaw, tracker.rotation.z));
      tracker.quaternion.slerp(q, transitionWeight);
    }

    // 2. Scroll-driven Translation (In/Out, Up/Down, Left/Right)
    // Camera is at [0, 1.0, 3.0] and looks at [0, 1.0, 0]
    let targetX = 0;
    
    // HERO SECTION (progress 0 - 0.2)
    // "only his head in the hero section"
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let targetY = isMobile ? -0.9 : -0.75; // Align head exactly with camera center
    let targetZ = isMobile ? 1.5 : 2.4; // Push back on mobile so it fits the narrow FOV

    if (progress > 0.2 && progress < 0.5) {
      // Transition back to full body
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : -1.0, (progress - 0.2) / 0.3);
      targetY = THREE.MathUtils.lerp(isMobile ? -0.9 : -0.75, -1.2, (progress - 0.2) / 0.3);
      targetZ = THREE.MathUtils.lerp(isMobile ? 1.5 : 2.4, isMobile ? -1.5 : -0.5, (progress - 0.2) / 0.3); 
    } else if (progress >= 0.5 && progress < 0.8) {
      // Move to right side
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : -1.0, isMobile ? 0 : 1.0, (progress - 0.5) / 0.3);
      targetY = THREE.MathUtils.lerp(-1.2, -1.0, (progress - 0.5) / 0.3);
      targetZ = THREE.MathUtils.lerp(isMobile ? -1.5 : -0.5, isMobile ? -1.5 : -1.0, (progress - 0.5) / 0.3); 
    } else if (progress >= 0.8) {
      // Loom menacingly in the center for the CTA
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.0, 0, (progress - 0.8) / 0.2);
      targetY = THREE.MathUtils.lerp(-1.0, isMobile ? -0.3 : -0.3, (progress - 0.8) / 0.2);
      targetZ = THREE.MathUtils.lerp(isMobile ? -1.5 : -1.0, isMobile ? 0.2 : 1.0, (progress - 0.8) / 0.2); 
    }
    
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1);
    
    // Add breathing float to Y
    const floatY = Math.sin(time * 1.5) * 0.08;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY + floatY, 0.1);

    // 3. Procedural Bone Animation (Shifting Poses)
    if (!hasAnimations) {
      // Breathing / swaying
      if (boneRefs.current.spine) {
        // Leans forward as you scroll down
        const targetSpinePitch = progress * 0.6;
        boneRefs.current.spine.rotation.x = THREE.MathUtils.lerp(boneRefs.current.spine.rotation.x, targetSpinePitch, 0.05);
        boneRefs.current.spine.rotation.y = Math.sin(time * 0.5) * 0.05;
      }

      if (boneRefs.current.lArm) {
        // Arms raise up and fold inward as you scroll
        const targetArmZ = -1.2 + (progress * 1.5);
        boneRefs.current.lArm.rotation.z = THREE.MathUtils.lerp(boneRefs.current.lArm.rotation.z, targetArmZ, 0.05);
        boneRefs.current.lArm.rotation.x = Math.sin(time * 2) * 0.05;
      }
      
      if (boneRefs.current.rArm) {
        const targetArmZ = 1.2 - (progress * 1.5);
        boneRefs.current.rArm.rotation.z = THREE.MathUtils.lerp(boneRefs.current.rArm.rotation.z, targetArmZ, 0.05);
        boneRefs.current.rArm.rotation.x = Math.sin(time * 2 + Math.PI) * 0.05;
      }

      if (boneRefs.current.lForearm) {
        boneRefs.current.lForearm.rotation.z = THREE.MathUtils.lerp(boneRefs.current.lForearm.rotation.z, progress * -2, 0.05);
      }
      
      if (boneRefs.current.rForearm) {
        boneRefs.current.rForearm.rotation.z = THREE.MathUtils.lerp(boneRefs.current.rForearm.rotation.z, progress * 2, 0.05);
      }
    } else {
      const duration = animations[0]?.duration || 1;
      mixer.setTime((progress * 5) % duration);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/doom.glb");
