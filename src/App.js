// src/App.js
import React, { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeModal from "./components/EmployeeModal";
import data from "./data/data.json";
import { Container, Row, Col, Button } from "react-bootstrap";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    setEmployees(data);
    if (data && data.length) setSelectedEmployee(data[0]);
  }, []);

  const handleSelect = (emp) => setSelectedEmployee(emp);

  const handleDelete = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    if (selectedEmployee?.id === id) setSelectedEmployee(null);
  };

  const handleSave = (empData) => {
    if (empData.id) {
      const updated = employees.map((e) => (e.id === empData.id ? empData : e));
      setEmployees(updated);
      setSelectedEmployee(empData);
    } else {
      const newEmp = { ...empData, id: Date.now() };
      setEmployees((prev) => [...prev, newEmp]);
      setSelectedEmployee(newEmp);
    }
    setShowModal(false);
    setEditEmployee(null);
  };

  return (
    <Container fluid className="p-4">
      {/* Header with Add button top-right */}
      <div className="d-flex align-items-center justify-content-center position-relative mb-4">
        <h3 className="fw-bold">Employee Database Management</h3>
        <Button
          variant="dark"
          size="sm"
          className="position-absolute top-0 end-0 m-4"
          onClick={() => {
            setEditEmployee(null);
            setShowModal(true);
          }}
        >
          <i className="bi bi-person-plus-fill"></i> Add
        </Button>
      </div>

      <Row>
        {/* Sidebar */}
        <Col md={4} className="pe-0">
          <div className="px-3">
            <h6 className="fw-bold mb-3">Employee List</h6>
            <EmployeeList
              employees={employees}
              onSelect={handleSelect}
              onDelete={handleDelete}
              selectedId={selectedEmployee?.id}
            />
          </div>
        </Col>

        {/* Main */}
        <Col md={8}>
          <h6 className="fw-bold border-bottom pb-2 mb-3">
            Employee Information
          </h6>
          {selectedEmployee ? (
            <EmployeeDetails
              employee={selectedEmployee}
              onEdit={() => {
                setEditEmployee(selectedEmployee);
                setShowModal(true);
              }}
            />
          ) : (
            <p className="text-muted">Select an employee to view details</p>
          )}
        </Col>
      </Row>

      <EmployeeModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditEmployee(null);
        }}
        onSave={handleSave}
        employee={editEmployee}
      />
    </Container>
  );
};

export default App;
