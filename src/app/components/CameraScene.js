import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import useCameraStore from '@/app/store/cameraStore';
import { 
    CAMERA_INTRINSICS, 
    CAMERA_EXTRINSICS, 
    BASE_TRANSFORM, 
    calculateFOV,
    CAMERA_ANIMATION 
} from '@/config/cameraConfig';

// PLY模型组件
const PLYModel = () => {
  const geometry = useLoader(PLYLoader, '/bim_mesh.ply');

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        vertexColors={true}
        metalness={0.1}
        roughness={0.5}
        transparent={true}
        opacity={0.8}
        // wireframe={true}
      />
    </mesh>
  );
};

// 相机动画组件（保留用于测试）
const CameraAnimation = () => {
  const cameraRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // 相机绕 y 轴旋转
    const x = CAMERA_ANIMATION.xMultiplier * Math.sin(time) * CAMERA_ANIMATION.radius;
    const z = Math.cos(time) * CAMERA_ANIMATION.radius;
    
    // 更新相机位置
    cameraRef.current.position.set(x, 0, z);
    
    // 让相机始终看向立方体
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={calculateFOV()}
      aspect={CAMERA_INTRINSICS.imageWidth / CAMERA_INTRINSICS.imageHeight}
      near={0.1}
      far={1000}
    />
  );
};

// 使用cameraStore状态的相机组件
const CameraPose = () => {
  const cameraRef = useRef();
  const poseData = useCameraStore((state) => state.poseData);

  useFrame(() => {
    if (poseData && poseData.position && poseData.orientation) {
      // 创建相机变换矩阵
      const poseMatrix = new THREE.Matrix4();
      const position = new THREE.Vector3(
        poseData.position.x,
        poseData.position.y,
        poseData.position.z
      );
      const quaternion = new THREE.Quaternion(
        poseData.orientation.x,
        poseData.orientation.y,
        poseData.orientation.z,
        poseData.orientation.w
      );
      poseMatrix.compose(position, quaternion, new THREE.Vector3(1, 1, 1));
      
      // 计算最终变换矩阵：pose @ inv(camera_ext) @ base_tsfm
      const camera_ext = new THREE.Matrix4();
      camera_ext.setFromMatrix3(CAMERA_EXTRINSICS.rotation);
      camera_ext.setPosition(CAMERA_EXTRINSICS.translation);
      
      const finalMatrix = new THREE.Matrix4();
      finalMatrix.multiplyMatrices(poseMatrix, camera_ext.invert());
      finalMatrix.multiply(BASE_TRANSFORM);
      
      // 从最终矩阵中提取位置和旋转
      const finalPosition = new THREE.Vector3();
      const finalQuaternion = new THREE.Quaternion();
      const finalScale = new THREE.Vector3();
      finalMatrix.decompose(finalPosition, finalQuaternion, finalScale);
      
      // 更新相机
      cameraRef.current.position.copy(finalPosition);
      cameraRef.current.quaternion.copy(finalQuaternion);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={calculateFOV()}
      aspect={CAMERA_INTRINSICS.imageWidth / CAMERA_INTRINSICS.imageHeight}
      near={0.1}
      far={1000}
    />
  );
};

const CameraScene = () => {
    return (
        <div style={{ 
            width: '100%',
            position: 'relative',
            paddingTop: '100%', // 1:1 比例
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}>
                <Canvas
                    shadows
                    gl={{ antialias: true }}
                    dpr={[1, 2]}
                >
                    <CameraPose />
                    {/* <CameraAnimation /> */}
                    <ambientLight intensity={0.7} />
                    <directionalLight castShadow position={[5, 5, 5]} intensity={1.5} />
                    <Suspense fallback={null}>
                        <PLYModel />
                    </Suspense>
                    {/* <OrbitControls /> */}
                </Canvas>
            </div>
        </div>
    );
};

export default CameraScene;
