import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Carousel, Button, Row, Col } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import leftImg from '../assets/left.svg';

const MockupDetailsPage = () => {
    const { state } = useLocation();
    const { mockup } = state;

    if (!mockup) return <div>Mockup not found</div>;

    return (
        <Container fluid className="p-4">
            <HeaderComponent showModal={() => {}} />
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className='mt-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={leftImg} alt="Image" style={{ marginRight: '10px' }} onClick={() => window.history.back()} />
                    <h5>{mockup.title}</h5>
                </div>
                <div>
                    {/* <Button variant="outline-primary" className="me-2">
                        Full Screen
                    </Button>
                    <Button variant="outline-primary">
                        Edit
                    </Button> */}
                </div>
            </header>
            <Row>
                <Col md={8}>
                    <div className="bg-light p-3 rounded">
                        <Carousel className="mb-3">
                            {mockup.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100 detailcardImg" src={image} alt={`Slide ${index}`} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="d-flex justify-content-center">
                            {mockup.images.map((_, index) => (
                                <div key={index} className="mx-1 bg-secondary rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <h5 className="mt-4">{mockup.domainname}| {mockup.subdomainname}</h5>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text...</p>
                    <h5 className="mt-4">About Project</h5>
                    <p>{mockup.description}</p>
                    <h5 className="mt-4">About Screen</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                </Col>
            </Row>
        </Container>
    );
};

export default MockupDetailsPage;