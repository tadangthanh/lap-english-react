import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-light border-end p-3">
            <nav className="flex-column">
                <NavLink
                    to="/"
                    className="nav-link fw-bold text-primary mb-3 d-flex align-items-center px-3 py-2"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                        borderRadius: '5px',
                    })}
                >
                    <i className="fas fa-home me-2"></i>
                    Home
                </NavLink>
                <NavLink
                    to="/word"
                    className="nav-link text-secondary mb-3 d-flex align-items-center px-3 py-2"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                        borderRadius: '5px',
                    })}
                >
                    <i className="fas fa-book-open me-2"></i>
                    Vocabulary
                </NavLink>
                <NavLink
                    to="/grammar"
                    className="nav-link text-secondary mb-3 d-flex align-items-center px-3 py-2"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                        borderRadius: '5px',
                    })}
                >
                    <i className="fa-solid fa-folder-tree me-2"></i>
                    Grammatical structure
                </NavLink>
                <NavLink
                    to="/topic"
                    className="nav-link text-secondary mb-3 d-flex align-items-center px-3 py-2"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                        borderRadius: '5px',
                    })}
                >
                    <i className="fa-solid fa-window-restore me-2"></i>
                    MainTopic
                </NavLink>
                <NavLink
                    to="/sub-topic"
                    className="nav-link text-secondary mb-3 d-flex align-items-center px-3 py-2"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                        borderRadius: '5px',
                    })}
                >
                    <i className="fa-solid fa-window-restore me-2"></i>
                    SubTopic
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
