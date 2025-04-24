'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import usePlyStore from '@/app/store/plyStore';


function Model({ fileData }) {
    const geometry = useMemo(() => {
        if (!fileData) return null;
        const loader = new PLYLoader();
        return loader.parse(fileData);
    }, [fileData]);

    if (!geometry) return null;

    // 检查几何体是否包含颜色属性
    const hasColors = geometry.attributes.color !== undefined;

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial 
                vertexColors={hasColors}
                color={hasColors ? "#ffffff" : "#ffffff"}
                metalness={0.1}
                roughness={0.5}
                // wireframe={true}
                transparent={true}
                opacity={0.5}
            />
        </mesh>
    );
}

export default function LoadScene() {
    const { fileData, isLoading, error } = usePlyStore();

    if (error) {
        return (
            <div className="card m-4 bg-base-300 h-96 rounded-box place-items-center shadow-lg p-4">
                <div className="text-error">{error}</div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="card m-4 bg-base-300 h-96 rounded-box place-items-center shadow-lg p-4">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="card m-4 bg-base-300 h-96 rounded-box place-items-center shadow-lg">
            <Canvas shadows>
                <ambientLight intensity={0.5} />
                <directionalLight 
                    position={[-5, 5, 5]} 
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Suspense fallback={null}>
                    <Model fileData={fileData} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
} 