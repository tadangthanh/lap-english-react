import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100 border-r p-4">
            <nav className="flex flex-col">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mb-3 rounded ${isActive ? 'bg-gray-200 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                >
                    <i className="fas fa-home mr-2"></i>
                    Home
                </NavLink>
                <NavLink
                    to="/grammar"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mb-3 rounded ${isActive ? 'bg-gray-200 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                >
                    <i className="fa-solid fa-folder-tree mr-2"></i>
                    Grammatical structure
                </NavLink>
                <NavLink
                    to="/topic"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mb-3 rounded ${isActive ? 'bg-gray-200 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                >
                    <i className="fa-solid fa-window-restore mr-2"></i>
                    MainTopic
                </NavLink>
                <NavLink
                    to="/sub-topic"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mb-3 rounded ${isActive ? 'bg-gray-200 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                >
                    <i className="fa-solid fa-window-restore mr-2"></i>
                    SubTopic
                </NavLink>
                <NavLink
                    to="/type-grammar"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mb-3 rounded ${isActive ? 'bg-gray-200 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                >
                    <i className="fa-solid fa-spell-check mr-2"></i>
                    Type Grammar
                </NavLink>
            </nav>
        </div>
    );

};

export default Sidebar;
