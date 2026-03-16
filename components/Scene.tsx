"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useGLTF,
  PresentationControls,
  Stage
} from "@react-three/drei";
import * as THREE from "three";

function Model() {
  // Load the sculpture GLB model from the public directory
  const { scene } = useGLTF("/sculpture.glb");
  const modelRef = useRef<THREE.Group>(null);

  // useFrame((state) => {
  //   if (!modelRef.current) return;
  //   // Subtle floating rotation
  //   modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  // });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[0, -1, 0]}
      castShadow
      receiveShadow
    />
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full relative bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <color attach="background" args={["#050505"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />

        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.5}>
              <Model />
            </Stage>
          </PresentationControls>

          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4.5}
          />
        </Suspense>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

// Preload the model to avoid pop-in
useGLTF.preload("/sculpture.glb");
