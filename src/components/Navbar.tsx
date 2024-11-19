import React from 'react';

const AppNavbar: React.FC = () => {
    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto px-4 py-3">
                <a href="#home" className="text-white text-lg font-semibold">
                    Quản lý
                </a>
            </div>
        </nav>
    );

};

export default AppNavbar;
