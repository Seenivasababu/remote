import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ProjectCreationForm.css'; // Import custom CSS file


const ProjectCreationForm = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform additional validation or API calls here

    // Create a new project object with the provided details
    const newProject = {
      name: projectName,
      description: projectDescription,
      // Add other relevant details as needed
    };

    // Perform any desired actions with the new project object (e.g., save to localStorage)

    // Clear the form inputs after submission
    setProjectName('');
    setProjectDescription('');
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group controlId="projectName">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </Form.Group>

        <Form.Group controlId="projectDescription">
          <Form.Label>Project Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{margin:"10px"}}>
          Create Project
        </Button>
      </Form>
    
    </div>
  );
};

export default ProjectCreationForm;
