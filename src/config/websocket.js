export const WS_CONFIG = {
    HOST: '192.168.196.126',
    PORT: 8765,
    get WS_URL() {
        return `ws://${this.HOST}:${this.PORT}`;
    }
}; 