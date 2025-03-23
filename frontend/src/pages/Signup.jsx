import { LAND } from './Login';
import { FORM } from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const NAME_DIV = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Signup = () => {
    const [load, setLoad] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const nav = useNavigate()

    const onclick = (e) => {
        e.preventDefault();
        setLoad(true);
        setError(null);

        if (
            firstname.trim().length === 0 ||
            lastname.trim().length === 0 ||
            password.trim().length === 0
        ) {
            setError('Fields cannot be empty');
            setLoad(false);
        } else {
            axios
                .post(
                    'http://localhost:8000/create_user',
                    {
                        firstname: firstname,
                        lastname: lastname,
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
                    } else {
                        localStorage.setItem(
                            'auth',
                            JSON.stringify(res.data.data)
                        );
                        navigate('/');
                        window.location.reload();
                    }
                });
        }
    };

    return (
        <>
            <LAND>
                <FORM onSubmit={onclick}>
                    <p className="header">Sign up to YieldWise</p>

                    <p className="description">
                        Welcome back, Please enter your details.
                    </p>
                    <NAME_DIV>
                        <div>
                            <label className="label">First Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter first name"
                                required
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Last Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter last name"
                                required
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </NAME_DIV>

                    <div>
                        <label className="label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter email address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p>{error}</p>}
                    {load ? (
                        <div className="click">Loading...</div>
                    ) : (
                        <button className="click" type="submit">
                            Sign up
                        </button>
                    )}

                    <p className="dont">
                        Already have an account?{' '}
                        <span>
                            <Link to="/" className="go">
                                Log in
                            </Link>
                        </span>
                    </p>
                </FORM>
            </LAND>
        </>
    );
};

export default Signup;
