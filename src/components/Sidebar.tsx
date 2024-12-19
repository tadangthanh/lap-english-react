import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Dữ liệu menu dưới dạng mảng
const menuItems = [
    // { to: "/", label: "Home", icon: "fas fa-home" },
    {
        label: "Grammar",
        icon: "fa-solid fa-folder-tree",
        children: [
            // { to: "/grammar", label: "Grammatical Structure" },
            { to: "/type-grammar", label: "Type Grammar" }
        ]
    },
    {
        label: "Topics",
        icon: "fa-solid fa-window-restore",
        children: [
            { to: "/topic", label: "Main Topic" },
            { to: "/sub-topic", label: "Sub Topic" }
        ]
    },
    {
        label: "Task",
        icon: "fa-solid fa-list-check",
        children: [
            // { to: "/grammar", label: "Grammatical Structure" },
            { to: "/daily-task", label: "Daily Task" },
            { to: "/title-task", label: "Title Task" }
        ]
    },
    {
        label: "Quizzes",
        icon: "fa-solid fa-check-double",
        children: [
            { to: "/manager-quiz", label: "Manager quiz" },
        ]
    }
];

// Component Sidebar chính
const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg">
            <div className="p-6 text-center border-b border-gray-700">
                <h1 className="text-xl font-bold text-gray-200">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <SidebarLink
                        key={index}
                        // to={item.to}
                        icon={item.icon}
                        label={item.label}
                        children={item.children}
                    />
                ))}
            </nav>
        </div>
    );
};

// Component link với dropdown menu
interface SidebarLinkProps {
    to?: string;
    icon: string;
    label: string;
    children?: { to: string; label: string }[];
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Mục menu có dropdown
    if (children) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                    <i className={`${icon} text-lg mr-3`}></i>
                    {label}
                    <span className="ml-auto">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                    <div className="ml-8">
                        {children.map((child, index) => (
                            <NavLink
                                key={index}
                                to={child.to}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive
                                        ? "text-white bg-blue-500"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                                    }`
                                }
                            >
                                {child.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Mục menu không có dropdown
    return (
        <NavLink
            to={to || "#"}
            className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border-l-4 border-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-gray-700 hover:border-l-4 hover:border-blue-400"
                }`
            }
        >
            <i className={`${icon} text-lg mr-3`}></i>
            {label}
        </NavLink>
    );
};

export default Sidebar;
