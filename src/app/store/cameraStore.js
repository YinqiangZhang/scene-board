import { create } from 'zustand';

const useCameraStore = create((set) => ({
    poseData: {
        timestamp: 0,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1
        }
    },
    setPoseData: (data) => set((state) => ({
        poseData: {
            ...state.poseData,
            timestamp: data.timestamp || state.poseData.timestamp,
            position: {
                x: data.position?.x || state.poseData.position.x,
                y: data.position?.y || state.poseData.position.y,
                z: data.position?.z || state.poseData.position.z
            },
            orientation: {
                x: data.orientation?.x || state.poseData.orientation.x,
                y: data.orientation?.y || state.poseData.orientation.y,
                z: data.orientation?.z || state.poseData.orientation.z,
                w: data.orientation?.w || state.poseData.orientation.w
            }
        }
    })),
    // 为了方便使用，也提供单独设置位置和方向的方法
    setPosition: (position) => set((state) => ({
        poseData: {
            ...state.poseData,
            position: {
                x: position.x,
                y: position.y,
                z: position.z
            }
        }
    })),
    setOrientation: (orientation) => set((state) => ({
        poseData: {
            ...state.poseData,
            orientation: {
                x: orientation.x,
                y: orientation.y,
                z: orientation.z,
                w: orientation.w
            }
        }
    }))
}));

export default useCameraStore;