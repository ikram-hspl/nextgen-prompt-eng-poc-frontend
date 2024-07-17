import React from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import './App.css';

const mockups = [
  {
    title: 'HRTech | Benefits',
    description: 'Recommended plans',
    image: 'mockup1.jpg',
    tags: ['Mobile', 'Web']
  },
  {
    title: 'HRTech | Benefits',
    description: 'Plan Comparison',
    image: 'mockup2.jpg',
    tags: ['Mobile', 'Web']
  },
  {
    title: 'HRTech | Benefits',
    description: 'Benefits Summary',
    image: 'mockup3.jpg',
    tags: ['Mobile', 'Web']
  }
  // Add more mockups as needed
];

const App = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#"><img src="logo.png" alt="Logo" width="50"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">UX</Nav.Link>
              <Nav.Link href="#">Chatbot</Nav.Link>
              <Nav.Link href="#">Process</Nav.Link>
              <Nav.Link href="#">Video</Nav.Link>
              <Nav.Link href="#">George Martin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Form className="mb-4">
          <Form.Control type="text" placeholder="Type your keyword here..." />
        </Form>
        <div className="d-flex justify-content-between mb-4">
          <div>
            <Button variant="outline-secondary" className="me-2">All</Button>
            <Button variant="outline-secondary" className="me-2">Mobile</Button>
            <Button variant="outline-secondary" className="me-2">Moodle</Button>
            <Button variant="outline-secondary" className="me-2">WordPress</Button>
            <Button variant="outline-secondary" className="me-2">Analytics</Button>
            <Button variant="outline-secondary" className="me-2">HRTech</Button>
            <Button variant="outline-secondary" className="me-2">EdTech</Button>
            <Button variant="outline-secondary" className="me-2">HealthTech</Button>
          </div>
          <div>
            <Button variant="outline-primary" className="me-2">My Favorite</Button>
            <Button variant="outline-primary">Sort By</Button>
          </div>
        </div>

        <Row>
          {mockups.map((mockup, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={mockup.image} />
                <Card.Body>
                  <Card.Title>{mockup.title}</Card.Title>
                  <Card.Text>{mockup.description}</Card.Text>
                  {mockup.tags.map((tag, idx) => (
                    <Badge bg="secondary" className="me-2" key={idx}>{tag}</Badge>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
