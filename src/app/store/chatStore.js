import { create } from 'zustand';
import { WS_CONFIG } from '@/config/websocket';

const useChatStore = create((set) => ({
    messages: [],
    inputMessage: '',
    connectionStatus: '未连接',
    wsUrl: WS_CONFIG.WS_URL,

    setMessages: (newMessages) => set((state) => ({ 
        messages: [...state.messages, ...newMessages] 
    })),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
    setWsUrl: (wsUrl) => set({ wsUrl }),

    clearState: () => set({ 
        messages: [],
        inputMessage: '',
        connectionStatus: '未连接',
        wsUrl: WS_CONFIG.WS_URL,
    }),
}));

export default useChatStore;
