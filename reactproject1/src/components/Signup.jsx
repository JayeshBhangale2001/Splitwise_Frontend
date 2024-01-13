import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './styles/Login.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your signup API
            const response = await axios.post('http://localhost:1337/users/signup', {
                username: email, // Assuming your API expects "username" instead of "email"
                password: password,
            });

            console.log(response.data); // Log the response data
            if(response.ok){
                setSignupSuccess
            }
            // Handle success, e.g., redirect to login page
        } catch (error) {
            console.error('Signup failed:', error);

            // Handle error, e.g., display an error message to the user
        }
    };
    const SignupSuccessPage = () => {
        return (
            <div>
                <h2>SignUp Successful</h2>
            </div>
        );
    };

    return (
        <div className="form-container">
            {!signupSuccess ? (
                <>
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="form">
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
                    Signup
                </button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
            </>
            ):(
                <SignupSuccessPage/>
            )}
        </div>
    );
};

export default Signup;
