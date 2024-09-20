import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const UploadMockupModal = ({ show, handleClose, onUpload }) => {
  const [mockups, setMockups] = useState([]);
  const userId = 'd96c72a5-990b-497a-974a-14611c77edb0';

  const tagOptions = ['Mobile', 'Web', 'Desktop', 'Tablet'];

  // Fetch mockup data on component mount
  useEffect(() => {
    const fetchMockups = async () => {
      try {
        const response = await axios.get(`https://localhost:7231/api/FileUploadAPI/${userId}/mockups`);
        //setMockups(response.data);
      } catch (error) {
        console.error('Error fetching mockups:', error);
      }
    };

    fetchMockups();
  }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newMockups = newFiles.map(file => ({
      file,
      title: '',
      domain:'',
      subdomain:'',
      
      tags: [] // Initialize as an empty array
    }));
    setMockups(prevMockups => [...prevMockups, ...newMockups]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setMockups(prevMockups => 
      prevMockups.map((mockup, i) => 
        i === index ? { ...mockup, [name]: value } : mockup
      )
    );
  };

  const handleTagChange = (index, tag) => {
    setMockups(prevMockups => 
      prevMockups.map((mockup, i) => {
        if (i === index) {
          const updatedTags = mockup.tags.includes(tag)
            ? mockup.tags.filter(t => t !== tag)
            : [...mockup.tags, tag];
          return { ...mockup, tags: updatedTags };
        }
        return mockup;
      })
    );
  };

  const handleRemoveFile = (index) => {
    setMockups(prevMockups => prevMockups.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (mockups.length === 0) {
      alert('Please add at least one file.');
      return;
    }

    try {
      const uploadPromises = mockups.map(mockup => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              ...mockup,
              image: e.target.result,
              fileName: mockup.file.name
            });
          };
          reader.readAsDataURL(mockup.file);
        });

      });

      const newMockups = await Promise.all(uploadPromises);

      const formData = new FormData();
      //formData.append('Name', mockup.title);
      //formData.append('Domainname', mockup.domain );
     // formData.append('Subdomainname', mockup.subdomain);
     // formData.append('Name', "title");
     // formData.append('Domainname', "HR" );
     // formData.append('Subdomainname', "Data");
      newMockups.forEach((mockup, index) => {
        formData.append('files', mockup.file);
        formData.append('Name', mockup.title);
      formData.append('Domainname', mockup.domain );
      formData.append('Subdomainname', mockup.subdomain);
        mockup.tags.forEach(tag => {
          formData.append(`Tags[${index}]`, tag);
        });
      });

      await axios.post(`https://localhost:7231/api/FileUploadAPI/upload?userId=${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Files uploaded sucessfully.');
     onUpload(newMockups);
      handleClose();
     setMockups([]);
    // window.location.reload();

    } catch (error) {
      //console.error('Error uploading files:', error);
     // alert('An error occurred while uploading the files.');
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Upload Mockups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Add files</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>
        <ListGroup>
          {mockups.map((mockup, index) => (
            <ListGroup.Item key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{mockup.file ? mockup.file.name : mockup.name}</strong>
                <Button variant="outline-danger" size="sm" onClick={() => handleRemoveFile(index)}>Remove</Button>
              </div>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="title"
                  value={mockup.title || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter mockup title"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="domain"
                  value={mockup.domain || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Domain"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="subdomain"
                  value={mockup.subdomain || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Subdomain"
                />
              </Form.Group>
            
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <div>
                  {tagOptions.map((tag) => (
                    <Form.Check
                      inline
                      type="checkbox"
                      label={tag}
                      id={`tag-${index}-${tag}`}
                      checked={mockup.tags ? mockup.tags.includes(tag) : false}
                      onChange={() => handleTagChange(index, tag)}
                      key={tag}
                    />
                  ))}
                </div>
              </Form.Group>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadMockupModal;
