import { create } from 'zustand';

const usePlyStore = create((set) => ({
    meshData: null,
    pointCloudData: null,
    isLoading: false,
    error: null,
    
    setMeshData: (data) => set({ meshData: data }),
    setPointCloudData: (data) => set({ pointCloudData: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    
    clearState: () => set({ 
        meshData: null,
        pointCloudData: null,
        isLoading: false, 
        error: null 
    }),
}));

export default usePlyStore; 