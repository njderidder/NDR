import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Mode A: Abstract (Torus) ---
const AbstractObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#a0a0a0"
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// --- Mode B: Global Network (Lines) ---
const NetworkObject = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 40;
  
  // Create random points on a sphere surface
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      const x = 3 * Math.sin(theta) * Math.cos(phi);
      const y = 3 * Math.sin(theta) * Math.sin(phi);
      const z = 3 * Math.cos(theta);
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#888888"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {/* Visual Lines connecting center to some points would be complex, 
          simulating "Network" via a wireframe sphere for simplicity and elegance */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh scale={2.5}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial wireframe color="#444" transparent opacity={0.1} />
         </mesh>
      </Float>
    </group>
  );
};

// --- Mode C: Minimal Particles ---
const ParticlesObject = () => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.001;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#888888"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

interface ThreeSceneProps {
  mode: 'abstract' | 'network' | 'particles';
  theme: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ mode, theme }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {mode === 'abstract' && <AbstractObject />}
      {mode === 'network' && <NetworkObject />}
      {mode === 'particles' && <ParticlesObject />}
      
      <Environment preset={theme === 'dark' ? 'city' : 'studio'} />
    </Canvas>
  );
};

export default ThreeScene;