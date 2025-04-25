import { create } from 'zustand';

const useChatStore = create((set) => ({
    messages: [],
    inputMessage: '',
    connectionStatus: '未连接',

    setMessages: (newMessages) => set((state) => ({ 
        messages: [...state.messages, ...newMessages] 
    })),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

    clearState: () => set({ 
        messages: [],
        inputMessage: '',
        connectionStatus: '未连接',
    }),
}));

export default useChatStore;
