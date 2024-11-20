import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getToken } from "../api/AuthenticationApi";

// URL WebSocket server
const token = getToken();
const WS_URL = "http://localhost:8080/ws?token=" + token;
export class WebSocketService {
    private client: Client;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS(WS_URL), // Sử dụng SockJS
            debug: (str: string) => console.log("WebSocket debug:", str),
            reconnectDelay: 5000, // Tự động kết nối lại sau 5 giây nếu bị mất
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    // Kết nối WebSocket
    connect(onMessage: (message: string) => void): void {
        this.client.onConnect = () => {
            console.log("Connected to WebSocket");
            // Subscribe vào topic
            this.client.subscribe("/user/topic/import-status", (message) => {
                if (message.body) {
                    onMessage(message.body);
                }
            });
        };

        this.client.onDisconnect = () => {
            console.log("Disconnected from WebSocket");
        };

        this.client.activate();
    }

    // Ngắt kết nối WebSocket
    disconnect(): void {
        if (this.client.active) {
            this.client.deactivate();
            console.log("WebSocket connection closed");
        }
    }
}

export default new WebSocketService();
