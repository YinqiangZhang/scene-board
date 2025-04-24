import { create } from 'zustand';

const usePlyStore = create((set) => ({
    fileData: null,
    isLoading: false,
    error: null,
    
    setFileData: (data) => set({ fileData: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    
    clearState: () => set({ 
        fileData: null,
        isLoading: false, 
        error: null 
    }),
}));

export default usePlyStore; 