import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './App.css';
import logo from './logo.JPG'; // Make sure you have the logo image in the src folder

const App = () => {
  return (
    <div className="App">
      <Container fluid className="login-container">
        <Row className="justify-content-md-center">
          <Col md={12}>
            <Card className="login-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <img src={logo} alt="HX Studio Logo" className="logo"/>
                </div>
                <h4 className="text-center mb-4">Login into Your Account</h4>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email ID*</Form.Label>
                    <Form.Control type="email" placeholder="yourname@harbingergroup.com" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="**************" />
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox" className="mt-3">
                    <Form.Check type="checkbox" label="Keep me signed in" />
                  </Form.Group>

                  <div className="text-right mt-2 mb-3">
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>

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
}

export default App;
