'use client';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'

export default function Box3D({color}) {
    return (
        <div className="card m-4 bg-base-300 rounded-box place-items-center shadow-lg">
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
                <Box position={[0, 0, 0]} scale={[1, 1, 1]}>
                    <meshStandardMaterial 
                        color={color}
                        metalness={0.05}      // 金属质感程度(0-1)
                        roughness={0.6}      // 表面粗糙程度(0-1)
                        clearcoat={0.2}      // 清漆效果强度
                        transparent={true}        // 允许透明
                        opacity={0.5}             // 降低透明度
                    />
                </Box>
                <OrbitControls />
            </Canvas>
        </div>
    )
}
