"use client";

import { FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
    useGLTF,
    Stage,
    Float,
    OrbitControls,
    PerspectiveCamera,
    ContactShadows,
    Html,
    useProgress
} from '@react-three/drei';
import * as THREE from 'three';

interface SculptureSceneProps {
    url: string;
    offsetX?: number;
    offsetY?: number;
    defaultZoom?: number;
}

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center space-y-4 whitespace-nowrap">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
                <div className="text-[9px] uppercase tracking-[0.4em] font-display text-white/30">
                    Loading {Math.round(progress)}%
                </div>
            </div>
        </Html>
    );
};

const SingleModel: FC<{ url: string; offsetX: number; offsetY: number }> = ({ url, offsetX, offsetY }) => {
    const { scene } = useGLTF(url);
    const { invalidate } = useThree();

    // Create a local clone of the scene so we don't mutate the global cache
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        if (!clonedScene) return;

        // Normalize the model to a 1-unit sphere
        const box = new THREE.Box3().setFromObject(clonedScene);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const scale = 1 / (sphere.radius * 2 || 1);

        clonedScene.position.set(-sphere.center.x * scale, -sphere.center.y * scale, -sphere.center.z * scale);
        clonedScene.scale.setScalar(scale);

        invalidate();
    }, [clonedScene, invalidate]);

    useEffect(() => {
        invalidate();
    }, [clonedScene, invalidate]);

    return (
        <group position={[offsetX, offsetY, 0]}>
            <primitive
                object={clonedScene}
                castShadow
                receiveShadow
            />
        </group>
    );
};

const SculptureScene: FC<SculptureSceneProps> = ({
    url,
    offsetX = 0,
    offsetY = 0,
    defaultZoom = 1
}) => {
    // With 1-unit normalized models, a distance of 4-5 provides a good "Gallery View"
    // that never clips. We use 4.0 as our baseline zoom-1 distance.
    const camZ = 4.0 / (defaultZoom <= 0 ? 1 : defaultZoom);

    return (
        <div className="w-full cursor-target! h-full relative cursor-grab active:cursor-grabbing group/sculpture bg-transparent">
            {/* Ambient Background Hint */}
            {/* <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none rounded-3xl" /> */}

            <Canvas
                shadows
                frameloop="demand"
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
                className="w-full h-full cursor-target!"
            >
                <PerspectiveCamera makeDefault position={[0, 0, camZ]} fov={35} />
                <ambientLight intensity={0.6} />

                <Suspense fallback={<Loader />}>
                    <Stage
                        intensity={0.25}
                        environment="city"
                        adjustCamera={false}
                    >
                        <Float
                            speed={1.6}
                            rotationIntensity={0.6}
                            floatIntensity={0.5}
                        >
                            <SingleModel url={url} offsetX={offsetX} offsetY={offsetY} />
                        </Float>
                    </Stage>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.4}
                        maxPolarAngle={Math.PI / 1.6}
                        minPolarAngle={Math.PI / 3}
                    />

                    <ContactShadows
                        position={[0, -0.6, 0]}
                        opacity={0.3}
                        scale={5}
                        blur={2}
                        far={2}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default SculptureScene;
