import { create } from 'zustand';


const usePanoStore = create((set) => ({
    isLoading: false,
    coordinates: null,
    showCoordinates: false,
    depth: null,
    isLoadingDepth: false,

    setIsLoading: (isLoading) => set({ isLoading }),
    setCoordinates: (coordinates) => set({ coordinates }),
    setShowCoordinates: (showCoordinates) => set({ showCoordinates }),
    setDepth: (depth) => set({ depth }),
    setIsLoadingDepth: (isLoadingDepth) => set({ isLoadingDepth }),

    clearState: () => set({ 
        isLoading: false,
        coordinates: null,
        showCoordinates: false,
        depth: null,
        isLoadingDepth: false,
    }),
}));

export default usePanoStore;