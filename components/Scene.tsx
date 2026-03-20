"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Stage,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function LightTrail() {
  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-2, 0, 0),
          new THREE.Vector3(-1, 2, 1),
          new THREE.Vector3(1, 1, 2),
          new THREE.Vector3(2, 0, 0),
          new THREE.Vector3(1, -2, -1),
          new THREE.Vector3(-1, -1, -2),
        ],
        true,
      ),
    [],
  );

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.02, 8, true),
    [curve],
  );

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z += 0.005;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#ffffff"
        emissive="#93c5fd"
        emissiveIntensity={4.5}
        transparent
        opacity={0.72}
      />
    </mesh>
  );
}

function Model() {
  const { scene } = useGLTF("/sculpture.glb");
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!innerRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    innerRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 1;
    innerRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  useEffect(() => {
    if (!outerRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          endTrigger: "footer",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      tl.to(
        outerRef.current!.rotation,
        {
          y: Math.PI * 0.75,
          ease: "none",
        },
        0,
      )
        .to(
          outerRef.current!.position,
          {
            x: 1.1,
            z: -0.4,
            y: 0.15,
            ease: "none",
          },
          0,
        )
        .to(
          outerRef.current!.scale,
          {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            ease: "none",
          },
          "<",
        );

      tl.to(
        outerRef.current!.rotation,
        {
          y: Math.PI * 1.9,
          x: Math.PI * 0.05,
          ease: "none",
        },
        ">",
      )
        .to(
          outerRef.current!.position,
          {
            x: 1.85,
            z: -0.2,
            y: -0.25,
            ease: "none",
          },
          "<",
        )
        .to(
          outerRef.current!.scale,
          {
            x: 0.95,
            y: 0.95,
            z: 0.95,
            ease: "none",
          },
          "<",
        );

      tl.to(
        outerRef.current!.position,
        {
          x: 0.9,
          y: -0.1,
          z: 0.6,
          ease: "power2.inOut",
        },
        ">",
      )
        .to(
          outerRef.current!.rotation,
          {
            y: Math.PI * 2.55,
            x: 0,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          outerRef.current!.scale,
          {
            x: 1.08,
            y: 1.08,
            z: 1.08,
            ease: "power2.inOut",
          },
          "<",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={outerRef} position={[0.7, 0, 0]}>
      <group ref={innerRef}>
        <primitive
          object={scene}
          scale={2}
          position={[0, -1, 0]}
          castShadow
          receiveShadow
        />
        <LightTrail />
      </group>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="relative h-full w-full bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        {/* <color attach="background" args={["#020617"]} /> */}
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.32} />

        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.4}
          castShadow
        />
        <spotLight
          position={[-10, 5, 5]}
          angle={0.2}
          penumbra={1}
          intensity={0.7}
          color="#3b82f6"
        />

        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />

          <Stage environment="city" intensity={0.15} adjustCamera={1.15}>
            <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.4}>
              <Model />
            </Float>
          </Stage>

          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.32}
            scale={15}
            blur={2.5}
            far={4.5}
          />
        </Suspense>

        {/* <Environment preset="night" /> */}
      </Canvas>
    </div>
  );
}

useGLTF.preload("/sculpture.glb");
