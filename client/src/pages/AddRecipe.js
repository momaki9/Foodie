import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';

function AddRecipePage() {

  const ingredientField = (
    <>
      <Form.Group as={Col} controlId="formGridName">
        <Form.Label>Ingredient Name</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridUnit">
        <Form.Label>Unit</Form.Label>
        <Form.Control as="select" defaultValue="Choose...">
          <option>Choose...</option>
          <option>Cup</option>
          <option>Tsp</option>
          <option>Tbs</option>
          <option>Oz</option>
        </Form.Control>
      </Form.Group>
    </>
  );

  const [ingredientForm, setIngredientForm] = useState([ingredientField]);

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Give your recipe a title" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Describe your recipe..." />
      </Form.Group>
      {ingredientForm.map((item, i) => (
        <Form.Row key={i}>
          {item}
          {/* <Button value={i} onClick={(e) => console.log(e.target.value)}>Delete row</Button> */}
        </Form.Row>
        
      ))}
      <Button onClick={() => setIngredientForm((prev) => prev.concat([ingredientField]))}>Add Row</Button>
      <Form.Group controlId="formGridImage">
        <Form.Label>Image</Form.Label>
        <Form.Control placeholder="Provide a link to an image" />
      </Form.Group>

      <Form.Group controlId="formGridLink">
        <Form.Label>Link</Form.Label>
        <Form.Control />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddRecipePage;