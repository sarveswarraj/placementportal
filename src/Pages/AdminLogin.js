import './Css/login.css'; // Ensure the path is correct
import React, { useEffect, useState } from 'react';
import { auth, provider, database } from '../firebaseConfig'; // Adjust the import path if necessary
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database'; // Import required Firebase Database functions
import { ReactComponent as GoogleIcon } from './Css/google.svg'; // Import your Google icon SVG

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
            // Authenticate user with Firebase
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Check if user exists in the Realtime Database
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                console.log('User exists in database:', snapshot.val());
                navigate("/studentreg"); // Redirect to student registration
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
            const user = result.user.email;
            // Store user info in localStorage
            localStorage.setItem('adminuser', JSON.stringify(user));
            navigate('/admin'); // Redirect to student registration after Google sign-in
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Store user info in localStorage
                localStorage.setItem('adminuser', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('adminuser'); // Remove user info on sign-out
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
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
