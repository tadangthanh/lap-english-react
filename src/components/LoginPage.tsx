// Login.js
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../api/AuthenticationApi";
import { Loading } from "./common/LoadingSpinner";
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        try {
            const request = { email: email, password };
            const response = await login(request);
            if (response.status === 200) {
                console.log(response.data);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setLoading(false);
                toast.success(response.message, { containerId: 'page-login' });
                window.location.href = '/type-grammar';
            } else {
                setLoading(false);
                toast.error(response.message, { containerId: 'page-login' });
                focusFirstInputField();
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message, { containerId: 'page-login' });
        }
    };
    const focusFirstInputField = () => {
        const input = document.querySelector('input');
        if (input) {
            input.focus();
        }
    }
    return (
        <div className="container">
            <Loading loading={loading} />
            <ToastContainer containerId='page-login' />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-sm" style={{ width: "20rem" }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
