import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "../../index.css";

function IngredientRow({ row, updateRow, deleteRow }) {
  return (
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Ingredient Name</Form.Label>
        <Form.Control
          value={row.name}
          onChange={(e) =>
            updateRow(row.id, "name", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={row.amount}
          onChange={(e) =>
            updateRow(row.id, "amount", Number(e.target.value))
          }
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Unit</Form.Label>
        <Form.Control
          as="select"
          value={row.unit}
          onChange={(e) =>
            updateRow(row.id, "unit", e.target.value)
          }
        >
          <option value="">Choose...</option>
          <option>Cup</option>
          <option>Tsp</option>
          <option>Tbs</option>
          <option>Oz</option>
        </Form.Control>
      </Form.Group>

      <Button
        id="remove-btn"
        type="button"
        onClick={() => deleteRow(row.id)}
      >
        X
      </Button>
    </Form.Row>
  );
}

export default IngredientRow;
