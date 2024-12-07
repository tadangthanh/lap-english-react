import React, { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { WebSocketContext } from './websocket/WebSocketProvider';
import 'react-toastify/dist/ReactToastify.css';

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
    }, [lastMessage]);

    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full z-10 top-0 left-0">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left: Brand */}
                <a href="#home" className="text-white text-2xl font-bold hover:text-blue-400">
                    Management
                </a>

                {/* Right: Navigation Links (Add icons or links if necessary) */}
                <div className="flex space-x-4">
                    <a href="#dashboard" className="text-gray-300 hover:text-white transition duration-300">
                        Dashboard
                    </a>
                    <a href="#profile" className="text-gray-300 hover:text-white transition duration-300">
                        Profile
                    </a>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                containerId="navbar"
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                className="mt-12" /* Adds margin to avoid overlap with navbar */
            />
        </nav>
    );
};

export default AppNavbar;
