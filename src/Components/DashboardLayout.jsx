import { useState, useEffect } from 'react';
import {
  Container, Navbar, Nav, Form, Button, Row, Col, Card, Badge, DropdownButton, Dropdown, Modal, ListGroup
} from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadMockupModal from './UploadMockupModal';

const DashboardLayout = () => {
  const [show, setShow] = useState(false);
  const [mockups, setMockups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Sort By');
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    Name: '',
    Tags: [],
    Domainname: '',
    Subdomainname: '',
    Image: ''
  });

  // Fetch mockups on component mount
  useEffect(() => {
    fetchMockups();
  }, []);

  // Sort mockups based on selected option
  useEffect(() => {
    if (sortOption) {
      sortMockups(sortOption);
    }
  }, [sortOption]);

  const fetchMockups = () => {
    axios.get('https://localhost:7231/api/FileUploadAPI/D96C72A5-990B-497A-974A-14611C77EDB0/mockups')
      .then(response => {
        const fetchedMockups = response.data.map(mockup => ({
          id: mockup.id,
          title: `${mockup.domainname} | ${mockup.subdomainname}`,
          description: mockup.name,
          image: mockup.filePath,
          tags: mockup.tags,
          domainname: mockup.domainname,
          subdomainname: mockup.subdomainname
        }));
        setMockups(fetchedMockups);
      })
      .catch(error => {
        console.error('Error fetching mockups:', error);
      });
  };

  const sortMockups = (sort) => {
    let sortedMockups = [...mockups];
    if (sort === 'Alphabetically') {
      sortedMockups.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Assuming there's a date field for sorting by date
      sortedMockups.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setMockups(sortedMockups);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpload = (newMockups) => {
    setMockups(prev => [...prev, ...newMockups]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://localhost:7231/api/FileUploadAPI/search?userId=D96C72A5-990B-497A-974A-14611C77EDB0&query=${searchQuery}`)
      .then(response => {
        const searchResults = response.data.map(mockup => ({
          id: mockup.id,
          title: `${mockup.domainname} | ${mockup.subdomainname}`,
          description: mockup.name,
          image: mockup.filePath,
          tags: mockup.tags,
          domainname: mockup.domainname,
          subdomainname: mockup.subdomainname
        }));
        setMockups(searchResults);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleSortSelect = (sort) => {
    setSortOption(sort);
    let apiUrl;
    if (sort === 'Alphabetically') {
      apiUrl = 'https://localhost:7231/api/FileUploadAPI/alphabetical?userId=D96C72A5-990B-497A-974A-14611C77EDB0';
    } else {
      apiUrl = 'https://localhost:7231/api/FileUploadAPI/recent?userId=D96C72A5-990B-497A-974A-14611C77EDB0';
    }

    axios.get(apiUrl)
      .then(response => {
        const sortedMockups = response.data.map(mockup => ({
          id: mockup.id,
          title: `${mockup.domainname} | ${mockup.subdomainname}`,
          description: mockup.name,
          image: mockup.filePath,
          tags: mockup.tags,
          domainname: mockup.domainname,
          subdomainname: mockup.subdomainname
        }));
        setMockups(sortedMockups);
      })
      .catch(error => {
        console.error('Error fetching sorted mockups:', error);
      });
  };

  const handleDomainFilter = (domainName) => {
    axios.get(`https://localhost:7231/api/FileUploadAPI/searchByDomain?userId=D96C72A5-990B-497A-974A-14611C77EDB0&domainName=${domainName}`)
      .then(response => {
        const filteredMockups = response.data.map(mockup => ({
          id: mockup.id,
          title: `${mockup.domainname} | ${mockup.subdomainname}`,
          description: mockup.name,
          image: mockup.filePath,
          tags: mockup.tags,
          domainname: mockup.domainname,
          subdomainname: mockup.subdomainname
        }));
        setMockups(filteredMockups);
      })
      .catch(error => {
        console.error('Error fetching filtered mockups:', error);
      });
  };

  const handleDelete = (mockup) => {
    axios.delete(`https://localhost:7231/api/FileUploadAPI/delete/${mockup.id}`)
      .then(() => {
        setMockups(prevMockups => prevMockups.filter(item => item.id !== mockup.id));
        console.log('Mockup deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting mockup:', error);
      });
  };

  const handleUpdate = (mockup) => {
    setSelectedMockup(mockup);
    setUpdateForm({
      Name: mockup.description,
      Tags: mockup.tags || [],
      Domainname: mockup.domainname,
      Subdomainname: mockup.subdomainname,
      Image: mockup.image
    });
    setUpdateModalShow(true);
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleUpdateTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setUpdateForm(prevForm => ({
      ...prevForm,
      Tags: tags
    }));
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple client-side validation
    if (!updateForm.Name.trim() || !updateForm.Tags.length || !updateForm.Domainname.trim() || !updateForm.Subdomainname.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('Name', updateForm.Name);
    formData.append('Tags', updateForm.Tags.join(','));
    formData.append('Domainname', updateForm.Domainname);
    formData.append('Subdomainname', updateForm.Subdomainname);
    formData.append('Image', updateForm.Image);

    if (selectedMockup) {
      axios.put(`https://localhost:7231/api/FileUploadAPI/update/${selectedMockup.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          fetchMockups(); // Refresh the page by re-fetching mockups
          setUpdateModalShow(false);
          alert('Mockup updated successfully');
        })
        .catch(error => {
          alert('Error updating mockup:', error);
        });
    }
  };

  const handleDownload = (mockup) => {
    // Handle download action
    console.log('Download clicked for', mockup);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#"><img src="logo.png" alt="Logo" width="50" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">UX</Nav.Link>
              <Nav.Link href="#">Chatbot</Nav.Link>
              <Nav.Link href="#">Process</Nav.Link>
              <Nav.Link href="#">Video</Nav.Link> */}
              <Nav.Link onClick={handleShow}>Upload Mockup? &nbsp;&nbsp;&nbsp;|</Nav.Link>
              <Nav.Link href="#"> George Smith</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Form onSubmit={handleSearchSubmit}>
          <Form.Group as={Row} controlId="formSearch">
            <Col sm={8}>
            <Form.Label><b>Keyword</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your keyword here..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Col>
            <Col sm={4} className="d-flex align-items-end">
              <Button variant="primary" type="submit">Search</Button>
            </Col>
          </Form.Group>
        </Form>

        <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
  <div className="d-flex flex-wrap">
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('All')}>All</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('Mobile')}>Mobile</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('Moodle')}>Moodle</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('WordPress')}>WordPress</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('Analytics')}>Analytics</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('HRTech')}>HRTech</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('EdTech')}>EdTech</Button>
    <Button variant="outline-secondary" className="me-2" onClick={() => handleDomainFilter('HealthTech')}>HealthTech</Button>
  </div>
  <div className="d-flex align-items-center">
    <Button variant="outline-primary" className="me-2">My Favorite</Button>
    <DropdownButton id="dropdown-basic-button" title={sortOption} className="me-2">
      <Dropdown.Item onClick={() => handleSortSelect('Alphabetically')}>Alphabetically</Dropdown.Item>
      <Dropdown.Item onClick={() => handleSortSelect('Recent')}>Recent</Dropdown.Item>
    </DropdownButton>
  </div>
</div>

       

        <Row className="mt-4">
          {mockups.map(mockup => (
            <Col sm={4} key={mockup.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={mockup.image}  />
                <Card.Body>
                  <Card.Title>{mockup.title}</Card.Title>
                  <Card.Text>{mockup.description}</Card.Text>
                  {/* <ListGroup className="list-group-flush">
                    {mockup.tags.map(tag => (
                      <ListGroup.Item key={tag}>
                        <Badge bg="secondary">{tag}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup> */}

        <ListGroup className="list-group-flush d-flex flex-row flex-wrap">
           {mockup.tags.map(tag => (
         <ListGroup.Item key={tag} className="border-0 p-0 me-2">
          <Badge bg="secondary">{tag}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

                  <div className="mt-2 d-flex justify-content-between">
                    <IconButton onClick={() => handleDownload(mockup)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton onClick={() => handleUpdate(mockup)}>
                      <UpdateIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(mockup)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <UploadMockupModal show={show} handleClose={handleClose} handleUpload={handleUpload} />

      <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Mockup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={updateForm.Name}
                onChange={handleUpdateFormChange}
                placeholder="Enter mockup name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Domainname</Form.Label>
              <Form.Control
                type="text"
                name="Domainname"
                value={updateForm.Domainname}
                onChange={handleUpdateFormChange}
                placeholder="Enter domain name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subdomainname</Form.Label>
              <Form.Control
                type="text"
                name="Subdomainname"
                value={updateForm.Subdomainname}
                onChange={handleUpdateFormChange}
                placeholder="Enter subdomain name"
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardLayout;
