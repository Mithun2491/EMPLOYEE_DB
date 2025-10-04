import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EmployeeModal = ({ show, onHide, onSave, employee }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    position: "",
    country: "",
    dob: "",
    skills: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        skills: employee.skills ? employee.skills.join(", ") : "",
      });
    } else {
      setFormData({
        name: "",
        avatar: "",
        position: "",
        country: "",
        dob: "",
        skills: "",
        email: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? "Edit Employee" : "Add Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Position</Form.Label>
            <Form.Control
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Skills (comma-separated)</Form.Label>
            <Form.Control
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
