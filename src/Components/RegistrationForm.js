// src/Components/RegistrationForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../firebaseConfig'; // Adjust the import path if necessary
import { ref, set, get } from 'firebase/database'; // Import required Firebase Database functions

function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        degree: '',
        branch: '',
        cgpa: '',
        resume: null,
        skills: '',
    });
    const [isRegistered, setIsRegistered] = useState(false); // Track if the user is already registered

    // Check for mailData in local storage when the component mounts
    useEffect(() => {
        const mailData = localStorage.getItem('user');
        if (!mailData) {
            // Redirect to login page if mailData is null
            navigate('/login'); // Adjust the path as needed
            return; // Exit the effect if no user is found
        }

        // Fetch user data from Realtime Database
        const userId = auth.currentUser.uid; // Get current user's UID
        const userRef = ref(database, `users/${userId}`);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setFormData(snapshot.val()); // Populate form with existing data
                    setIsRegistered(true); // Set registered status to true
                }
            })
            .catch((error) => {
                console.error('Error fetching user data: ', error);
            });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = auth.currentUser.uid; // Get current user's UID

        // Save user data to Realtime Database
        const userRef = ref(database, `users/${userId}`);
        await set(userRef, formData)
            .then(() => {
                console.log('User data saved successfully!');
                navigate('/studentresults'); // Redirect to student results or another page
            })
            .catch((error) => {
                console.error('Error saving user data: ', error);
            });

        // Clear the form
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            degree: '',
            branch: '',
            cgpa: '',
            resume: null,
            skills: '',
        });
        setIsRegistered(false); // Reset registration status
    };

    return (
        <div className="registration-form">
            <h2>Student Registration</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Full Name*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="10-digit number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formDegree">
                    <Form.Label>Degree*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., B.Tech, M.Sc"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formBranch">
                    <Form.Label>Branch*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., Computer Science"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formCGPA">
                    <Form.Label>CGPA*</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter CGPA"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formResume">
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                        type="file"
                        name="resume"
                        onChange={handleChange}
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Form.Group controlId="formSkills">
                    <Form.Label>Skills*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., Java, React"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        disabled={isRegistered} // Disable if already registered
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isRegistered}>
                    {isRegistered ? 'Registered' : 'Register'}
                </Button>
            </Form>
        </div>
    );
}

export default RegistrationForm;
