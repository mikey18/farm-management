import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FiLoader } from 'react-icons/fi';

export const LAND = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f4f7fe;
`;

export const FORM = styled.form`
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 400px;

    .header {
        text-align: center;
        color: #333;
        font-weight: bold;
        font-size: 30px;
        margin-bottom: 10px;
    }

    .description {
        text-align: center;
        color: #555;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 15px;
    }

    .label {
        font-size: 14px;
        color: #555;
        font-weight: 500;
    }

    .form-input {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #d0d5dd;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
    }

    .form-input:focus {
        outline: none;
        border-color: green;
        box-shadow: 0px 0px 6px rgba(74, 144, 226, 0.2);
    }

    .error {
        color: #d9534f;
        font-size: 14px;
        text-align: center;
        margin-bottom: 15px;
    }

    .click {
        background: green;
        color: white;
        font-weight: bold;
        width: 100%;
        height: 44px;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        transition: 0.3s ease-in-out;
    }

    .click:hover {
        background: green;
    }

    .loading-icon {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .dont {
        text-align: center;
        font-size: 14px;
        margin-top: 15px;
    }

    .go {
        color: green;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease-in-out;
    }

    .go:hover {
        color: #3b7ed0;
    }
`;

const Login = () => {
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const login = (e) => {
        e.preventDefault();
        setLoad(true);
        setError(null);

        if (email.trim().length === 0 || password.trim().length === 0) {
            setError('Fields cannot be empty');
            setLoad(false);
        } else {
            axios
                .post(
                    'http://localhost:8000/login_user',
                    { email, password },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then((res) => {
                    if (res.data.status === 400) {
                        setError(res.data.msg);
                        setLoad(false);
                    }
                    if (res.data.status === 200) {
                        localStorage.setItem(
                            'auth',
                            JSON.stringify(res.data.data)
                        );
                        window.location.reload();
                    }
                })
                .catch(() => {
                    setError('An error occurred. Please try again.');
                    setLoad(false);
                });
        }
    };

    return (
        <LAND>
            <FORM onSubmit={login}>
                <p className="header">Log in</p>
                <p className="description">
                    Welcome back, please enter your details.
                </p>

                <div className="input-group">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button className="click" type="submit" disabled={load}>
                    {load ? (
                        <FiLoader className="loading-icon" size={20} />
                    ) : (
                        'Sign in'
                    )}
                </button>

                <p className="dont">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="go">
                        Sign up
                    </Link>
                </p>
            </FORM>
        </LAND>
    );
};

export default Login;
