import React, { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { WebSocketContext } from './websocket/WebSocketProvider';

const AppNavbar: React.FC = () => {
    const { lastMessage } = useContext(WebSocketContext)!;

    useEffect(() => {
        if (lastMessage) {
            const { status, message } = lastMessage;
            if (status === 201) {
                toast.success(message, { containerId: 'navbar', position: "top-center" });
            } else {
                toast.error(message, { containerId: 'navbar', position: "top-center" });
            }
        }
    }, [lastMessage]); // Lắng nghe thay đổi của lastMessage

    return (
        <nav className="bg-gray-800">
            <ToastContainer containerId="navbar" />
            <div className="container mx-auto px-4 py-3">
                <a href="#home" className="text-white text-lg font-semibold">
                    Management
                </a>
            </div>
        </nav>
    );
};

export default AppNavbar;
