"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Instances, Instance, PerformanceMonitor } from '@react-three/drei';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Mesh, BoxGeometry, SphereGeometry, TorusGeometry, OctahedronGeometry, IcosahedronGeometry, MeshStandardMaterial } from 'three';

// --- Start of optimizations ---

// 1. Create geometries and materials once and reuse them.
const geometries = {
    box: new BoxGeometry(),
    sphere: new SphereGeometry(0.6, 8, 8),
    torus: new TorusGeometry(0.5, 0.2, 8, 16),
    octahedron: new OctahedronGeometry(0.7),
    icosahedron: new IcosahedronGeometry(0.7)
};

const material = new MeshStandardMaterial({ vertexColors: true, toneMapped: false });

type ShapeData = {
  id: number;
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
  type: keyof typeof geometries;
  ref: React.MutableRefObject<Mesh | null>;
};

// --- End of optimizations ---

const Model3D: React.FC = () => {
  const [dpr, setDpr] = useState(1.5);

  const getInitialViewport = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const [viewport, setViewport] = useState<{ width: number; height: number }>(getInitialViewport);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shapes = useMemo(() => {
    const shapeTypes = Object.keys(geometries) as (keyof typeof geometries)[];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96f7d2', '#f7d794', '#786fa6', '#f8a5c2', '#63cdda'];
    const area = viewport.width * viewport.height;
    const numberOfShapes = Math.floor(viewport.width > 768 ? area / 120000 : area / 80000);
    const gridSize = Math.sqrt(numberOfShapes);
    const spacing = viewport.width > 768 ? 35 / gridSize : 30 / gridSize;

    return Array.from({ length: numberOfShapes }, (_, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        return {
            id: i,
            position: [
                (col - gridSize / 2) * spacing + (Math.random() - 0.5) * 4,
                (row - gridSize / 2) * spacing + (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 15
            ],
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 0.5 + Math.random() * 0.7,
            speed: 0.1 + Math.random() * 0.3,
            type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
            ref: React.createRef<Mesh>()
        } as ShapeData
    });
  }, [viewport]);

  // 2. Optimize useFrame loop
  const isVisible = useRef(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useFrame(({ clock }) => {
    if (!isVisible.current) return; // Don't run animation when tab is not visible
    const time = clock.getElapsedTime();
    shapes.forEach(shape => {
      if (shape.ref.current) {
        shape.ref.current.rotation.x += 0.002 * shape.speed;
        shape.ref.current.rotation.y += 0.003 * shape.speed;
        shape.ref.current.position.y = shape.position[1] + Math.sin(time * shape.speed) * 0.3;
      }
    });
  });

  const cameraPosition = useMemo<[number, number, number]>(() => {
    const zPosition = viewport.width < 768 ? 25 : 30;
    return [0, 0, zPosition];
  }, [viewport.width]);

  const groupedShapes = useMemo(() => {
    const groups: { [key in keyof typeof geometries]?: ShapeData[] } = {};
    shapes.forEach(shape => {
        if (!groups[shape.type]) {
            groups[shape.type] = [];
        }
        groups[shape.type]!.push(shape);
    });
    return groups;
  }, [shapes]);

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 60 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
      dpr={dpr}
      performance={{ min: 0.5 }}
    >
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />
      <ambientLight intensity={0.6} />
      <pointLight position={[20, 20, 20]} intensity={0.4} />
      
      {Object.entries(groupedShapes).map(([type, group]) => (
        <Instances key={type} geometry={geometries[type as keyof typeof geometries]} material={material}>
            {group.map((data) => (
                <Instance key={data.id} ref={data.ref} position={data.position} color={data.color} scale={data.size} />
            ))}
        </Instances>
      ))}
    </Canvas>
  );
};

export default Model3D;
