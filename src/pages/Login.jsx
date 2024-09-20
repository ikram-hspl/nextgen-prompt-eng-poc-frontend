import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../App.css';
import logo from '../assets/logo.JPG'; // Make sure you have the logo image in the src folder
import useAuth from '../hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

import { useCookies } from 'react-cookie';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const { user, login , isLoggedIn} = useContext(AuthContext);
    // const loogedInUser = cookies.user;



    

    if (user && isLoggedIn) {
        console.log("login page USER->>>>>",user);
        if (user.role === "ADMIN") {
          return <Navigate to="/admin" />;
        } else {
          return <Navigate to="/dashboard" />;
        }
        return <Navigate to="/dashboard" />
      }

    // const validateEmail = (email) => {
    //     const re = /^[a-zA-Z0-9._%+-]+@harbingergroup\.com$/;
    //     return re.test(email);
    // };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        // if (!validateEmail(email)) {
        //     setEmailError('Please enter a valid email address ending with @harbingergroup.com.');
        //     valid = false;
        // } else {
        //     setEmailError('');
        // }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            try {
                await login(email, password);

                console.log('Login successful');

                console.log("login page user",loogedInUser)
                console.log(loogedInUser.role)
                if(loogedInUser.role==="ADMIN") {
                <Navigate to="/admin" />

                }

                else {
                    <Navigate to="/dashboard" />;

                }
                
                // Redirect to a protected route or homepage after successful login
            } catch (error) {
                setGeneralError(error);
            }
        }
    };

    return (
        <div className="App">
            <Container fluid className="login-container">
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Card className="login-card">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <img src={logo} alt="HX Studio Logo" className="logo" />
                                </div>
                                <h4 className="text-center mb-4">Login into Your Account</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email ID*</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="yourname@harbingergroup.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={!!emailError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {emailError}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword" className="mt-3">
                                        <Form.Label>Password*</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="**************"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            isInvalid={!!passwordError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {passwordError}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicCheckbox" className="mt-3">
                                        <Form.Check type="checkbox" label="Keep me signed in" />
                                    </Form.Group>

                                    <div className="text-right mt-2 mb-3">
                                        <a href="#" className="forgot-password">Forgot Password?</a>
                                    </div>

                                    {generalError && (
                                        <div className="alert alert-danger" role="alert">
                                            {generalError}
                                        </div>
                                    )}

                                    <Button variant="primary" type="submit" className="w-100">
                                        Login
                                    </Button>
                                  
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
