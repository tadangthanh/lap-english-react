import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ConfirmationModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    title: string;
    labelConfirm: string;
    labelCancel: string;
    colorConfirm: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onConfirm, onCancel, title, message, labelConfirm, labelCancel, colorConfirm }) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            tabIndex={-1}
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h5 className="text-lg font-semibold">{title}</h5>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={onCancel}
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-4 py-5">
                    <p className="text-sm text-gray-700">{message}</p>
                </div>
                <div className="flex justify-end items-center px-4 py-3 border-t space-x-2">
                    <button
                        className="px-4 py-2 text-white rounded bg-red-500 hover:bg-red-600 focus:outline-none"
                        style={{ backgroundColor: colorConfirm }}
                        onClick={onConfirm}
                    >
                        {labelConfirm}
                    </button>
                    <button
                        className="px-4 py-2 text-gray-700 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none"
                        onClick={onCancel}
                    >
                        {labelCancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
