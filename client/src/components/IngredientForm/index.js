import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import "../../index.css";
import { FaTrash } from "react-icons/fa";

function IngredientRow({ row, updateRow, deleteRow }) {
  return (
    <Row className="align-items-center ingredient-row">
      <Col md={5}>
        <Form.Control
          placeholder="ingredient"
          value={row.name}
          onChange={(e) =>
            updateRow(row.id, "name", e.target.value)
          }
        />
      </Col>

      <Col md={3}>
        <Form.Control
          type="number"
          placeholder="Amount"
          value={row.amount}
          onChange={(e) =>
            updateRow(row.id, "amount", e.target.value)
          }
        />
      </Col>

      <Col md={3}>
        <Form.Control
          as="select"
          className="unit-select"
          value={row.unit}
          onChange={(e) =>
            updateRow(row.id, "unit", e.target.value)
          }
        >
          <option value="">No unit</option>
          <option value="cup">Cup</option>
          <option value="teaspoon">Teaspoon</option>
          <option value="tablespoon">Tablespoon</option>
          <option value="ounce">Ounce</option>
          <option value="gram">Gram</option>
          <option value="pound">Pound</option>
          <option value="fluid ounce">Fluid Ounce</option>
          <option value="milliliter">Milliliter</option>
        </Form.Control>
      </Col>

      <Col md={1}>
        <Button
          className="p-0 text-danger"
          variant="link"
          onClick={() => deleteRow(row.id)}
        >
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
}

export default IngredientRow;
