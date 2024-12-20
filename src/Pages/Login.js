// AdminLogin.js
import './Css/login.css';
import React, { useState, useEffect } from 'react';
import { auth, provider, database } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { ReactComponent as GoogleIcon } from './Css/google.svg';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                navigate("/studentreg");
            } else {
                setError('User does not exist in the database.');
            }

            setEmail('');
            setPassword('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user.email));
            navigate('/studentreg');
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <button onClick={handleGoogleSignIn} className="google-signin-button">
                <GoogleIcon className="google-icon" />
                Sign In with Google
            </button>
        </div>
    );
};

export default AdminLogin;
