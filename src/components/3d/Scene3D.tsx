'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.z = Math.sin(clock.elapsedTime * 0.5) * 0.5;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 color1 = vec3(0.67, 0.33, 0.97); // Purple
      vec3 color2 = vec3(0.06, 0.65, 0.93); // Blue
      vec3 color3 = vec3(0.04, 0.71, 0.76); // Cyan

      float wave = sin(vUv.x * 5.0 + uTime) * 0.5 + 0.5;
      vec3 color = mix(color1, mix(color2, color3, vUv.y), wave);

      float light = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0)));
      color += light * 0.3;

      gl_FragColor = vec4(color, 0.9);
    }
  `;

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 8]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        wireframe={false}
      />
    </mesh>
  );
};

const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(clock.elapsedTime + positions[i]) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    colors[i] = 0.67 + Math.random() * 0.3;
    colors[i + 1] = 0.33 + Math.random() * 0.3;
    colors[i + 2] = 0.97;
  }

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors sizeAttenuation={true} />
      </points>
    </group>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <FloatingSphere />
        <ParticleField />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
