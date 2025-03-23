import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const LAND = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 50px;
    position: absolute;
    top: 70px;
    bottom: 70px;
    align-items: center;
`;

export const FORM = styled.form`
    display: grid;
    gap: 30px;
    width: 500px;

    .loggo {
        display: flex;
        justify-content: center;
    }
    .header {
        text-align: center;
        color: #344054;
        font-weight: bold;
        font-size: 35px;
    }
    .description {
        text-align: center;
        color: #344054;
    }
    .label {
        display: block;
        font-size: 15px;
        color: #344054;
    }
    .form-input {
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #d0d5dd;
        color: #344054;
        font-size: 15px;
    }
    .form-input:focus {
        outline: none !important;
    }
    .click {
        background-color: green;
        color: white;
        font-weight: bold;
        width: 100%;
        height: 44px;
        gap: 8px;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dont {
        text-align: center;
    }
    .go {
        color: green;
        text-decoration: none;
        font-weight: bold;
    }
`;
const Login = () => {
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const nav = useNavigate()

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

                    {
                        email: email,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
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
                });
        }
    };

    return (
        <>
            <LAND>
                <FORM onSubmit={login}>
                    {/* <div className="loggo">
                        <img
                            src={logo}
                            alt="log"
                            className="logo"
                        />
                    </div> */}
                    <p className="header">Log in</p>

                    <p className="description">
                        Welcome back, Please enter your details.
                    </p>

                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {load ? (
                        <div className="click">Loading...</div>
                    ) : (
                        <button className="click" type="submit">
                            Sign in
                        </button>
                    )}

                    <p className="dont">
                        Don&apos;t have an account?{' '}
                        <span>
                            <Link to="/signup" className="go">
                                Sign up
                            </Link>
                        </span>
                    </p>
                </FORM>
            </LAND>
        </>
    );
};

export default Login;
