import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const GlobeWireframe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    const count = 2000;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, []);

  return (
    <group>
      {/* Wireframe sphere */}
      <Sphere ref={meshRef} args={[2, 32, 32]}>
        <meshBasicMaterial
          color="#A3FF47"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Points on surface */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#A3FF47"
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Inner glow sphere */}
      <Sphere args={[1.95, 32, 32]}>
        <meshBasicMaterial
          color="#A3FF47"
          transparent
          opacity={0.05}
        />
      </Sphere>
    </group>
  );
};

const WireframeGlobe = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default WireframeGlobe;
