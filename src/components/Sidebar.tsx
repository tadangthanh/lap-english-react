import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg">
            <div className="p-6 text-center border-b border-gray-700">
                <h1 className="text-xl font-bold text-gray-200">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-4">
                <SidebarLink to="/" icon="fas fa-home" label="Home" />
                <SidebarLink
                    to="/grammar"
                    icon="fa-solid fa-folder-tree"
                    label="Grammatical Structure"
                />
                <SidebarLink to="/topic" icon="fa-solid fa-window-restore" label="Main Topic" />
                <SidebarLink to="/sub-topic" icon="fa-solid fa-window-restore" label="Sub Topic" />
                <SidebarLink
                    to="/type-grammar"
                    icon="fa-solid fa-spell-check"
                    label="Type Grammar"
                />
            </nav>
        </div>
    );
};

// Component link với icon và label
const SidebarLink: React.FC<{
    to: string;
    icon: string;
    label: string;
}> = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border-l-4 border-blue-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:border-l-4 hover:border-blue-400'
            }`
        }
    >
        <i className={`${icon} text-lg mr-3`}></i>
        {label}
    </NavLink>
);

export default Sidebar;
