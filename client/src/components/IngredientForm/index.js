import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "../../index.css";
import { FaTrash } from "react-icons/fa";

function IngredientRow({ row, updateRow, deleteRow }) {
  return (
    <Form.Row className="align-items-end">
      <Form.Group as={Col} xs={12} md={5}>
        <Form.Label>Ingredient Name</Form.Label>
        <Form.Control
          value={row.name}
          onChange={(e) =>
            updateRow(row.id, "name", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group as={Col} xs={6} md={3}>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={row.amount}
          onChange={(e) =>
            updateRow(row.id, "amount", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group as={Col} xs={6} md={3}>
        <Form.Label>Unit</Form.Label>
        <Form.Control
          as="select"
          value={row.unit}
          onChange={(e) =>
            updateRow(row.id, "unit", e.target.value)
          }
        >
          <option>Choose...</option>
          <option>Cup</option>
          <option>teaspoon (tsp)</option>
          <option>tablespoon (tbsp)</option>
          <option>ounce (oz)</option>
          <option>gram (g)</option>
          <option>pound (lb)</option>
          <option>fluid ounce (fl oz)</option>
          <option>milliliter (mL)</option>
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs="auto" className="d-flex align-items-center">
        <Button
          className="p-0 text-danger"
          variant="link"
          onClick={() => deleteRow(row.id)}
        >
          <FaTrash />
        </Button>
      </Form.Group>
    </Form.Row>
  );
}

export default IngredientRow;
