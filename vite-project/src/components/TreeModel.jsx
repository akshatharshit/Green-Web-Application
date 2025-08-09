import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import earthModel from '../assets/earth.glb';

function Earth({ autoRotate }) {
  const { scene } = useGLTF(earthModel);
  const group = useRef();

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />
      {/* Glow ring around the Earth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 0]}>
        <ringGeometry args={[1.6, 1.9, 64]} />
        <meshBasicMaterial color="#00ffcc" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function EarthModel() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-[700px] h-[500px] mt-16 bg-black rounded-xl shadow-2xl overflow-hidden relative">
      {/* Toggle Button */}
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className="absolute top-4 right-4 z-10 bg-white text-black px-4 py-1 rounded shadow hover:bg-gray-100"
      >
        {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
      </button>

      <Canvas camera={{ position: [4, 2, 5], fov: 45 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <Earth autoRotate={autoRotate} />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            blur={1.5}
            scale={10}
          />
        </Suspense>

        <OrbitControls enableZoom={true} autoRotate={false} />
      </Canvas>
    </div>
    </div>
  );
}
