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
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" style={{ background: colorConfirm }} onClick={onConfirm}>
                            {labelConfirm}
                        </button>
                        <button className="btn btn-secondary" onClick={onCancel}>
                            {labelCancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
