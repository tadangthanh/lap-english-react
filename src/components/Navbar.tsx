import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { WebSocketContext } from './websocket/WebSocketProvider';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const AppNavbar: React.FC = () => {
    const { lastMessage } = useContext(WebSocketContext)!;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (lastMessage) {
            const { status, message } = lastMessage;
            if (status === 201) {
                toast.success(message, { containerId: 'navbar', position: 'top-center' });
            } else {
                toast.error(message, { containerId: 'navbar', position: 'top-center' });
            }
        }
    }, [lastMessage]);
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
    }
    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full z-10 top-0 left-0">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left: Brand */}
                <a className="text-white text-2xl font-bold hover:text-blue-400 flex items-center">
                    <i className="fas fa-cogs mr-2"></i> {/* Font Awesome icon */}
                    Management
                </a>

                {/* Right: Navigation Links */}
                <div className="flex space-x-4 items-center relative">
                    {/* Profile with Dropdown */}
                    <div
                        className="relative p-2"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button

                            className="text-gray-300 hover:text-white transition duration-300 flex items-center cursor-pointer"
                        >
                            <i className="fas fa-gear mr-2"></i> {/* Profile Icon */}
                            Setting
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  items-center"
                                >
                                    <i className="fas fa-sign-out-alt mr-2"></i> {/* Logout Icon */}
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
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
