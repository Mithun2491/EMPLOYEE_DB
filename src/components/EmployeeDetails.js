import React from "react";
import { Card, Button } from "react-bootstrap";

const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const EmployeeDetails = ({ employee, onEdit }) => {
  return (
    <Card className="border-0">
      <Card.Body className="text-center">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="rounded-circle mb-3"
          style={{ width: "130px", height: "130px", objectFit: "cover" }}
        />
        <h4 className="fw-bold text-uppercase">
          {employee.name} ({calculateAge(employee.dob)})
        </h4>
        <p className="mb-1 text-muted">{employee.position}</p>
        <p className="text-secondary mb-2">{employee.country}</p>
        <p className="mb-1">{employee.email}</p>
        <p className="text-muted mb-1">DOB: {employee.dob}</p>
        <div className="mb-3">
          <strong>Skills:</strong> {employee.skills.join(", ")}
        </div>
        <Button variant="dark" onClick={onEdit}>
          <i className="bi bi-pencil-square"></i> Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmployeeDetails;
