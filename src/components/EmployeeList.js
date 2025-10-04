import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FaTrashAlt, FaUser } from "react-icons/fa";

const EmployeeList = ({ employees, onSelect, onDelete, selectedId }) => {
  return (
    <div className="employee-list">
      <ListGroup variant="flush">
        {employees.map((emp) => (
          <ListGroup.Item
            key={emp.id}
            action
            active={selectedId === emp.id}
            onClick={() => onSelect(emp)}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <FaUser className="me-2 text-secondary" />
              {emp.name}
            </span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(emp.id);
              }}
            >
              <FaTrashAlt />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EmployeeList;
