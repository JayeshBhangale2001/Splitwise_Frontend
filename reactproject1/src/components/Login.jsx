/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1337/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setLoginSuccess(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    };

    const LoginSuccessPage = () => {
        return (
            <div>
                <h2>Login Successful</h2>
            </div>
        );
    };

    return (
        <div className="form-container">
            {!loginSuccess ? (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} className="form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <button type="submit" className="button">
                            Login
                        </button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p>
                        Don't have an account? <Link to="/Signup">Signup</Link>
                    </p>
                </>
            ) : (
                <LoginSuccessPage />
            )}
        </div>
    );
};

export default Login;
