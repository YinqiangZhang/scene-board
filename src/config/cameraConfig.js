import * as THREE from 'three';

// 相机内参矩阵参数
export const CAMERA_INTRINSICS = {
    fx: 568.63,
    fy: 568.875,
    cx: 508.741,
    cy: 517.754,
    imageWidth: 1024,
    imageHeight: 1024
};

// 相机外参矩阵参数
export const CAMERA_EXTRINSICS = {
    rotation: new THREE.Matrix3().set(
        0.0259682, -0.999662, -0.00153385,
        -0.0035678, 0.00144168, -0.999993,
        0.999656, 0.0259735, -0.00352916
    ),
    translation: new THREE.Vector3(-0.0659464, -0.00722525, 0.0257663)
};

// 基础变换矩阵（ZYX欧拉角 [0, 0, -180]）
export const BASE_TRANSFORM = new THREE.Matrix4().makeScale(1, -1, -1);

// 计算视场角
export const calculateFOV = () => {
    return 2 * Math.atan(CAMERA_INTRINSICS.imageHeight / (2 * CAMERA_INTRINSICS.fy)) * (180 / Math.PI);
};

// 相机动画参数
export const CAMERA_ANIMATION = {
    radius: 4,
    xMultiplier: 1.5
}; 