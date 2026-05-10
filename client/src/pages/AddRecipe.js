import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import IngredientRow from '../components/IngredientForm';

function AddRecipePage() {

  const [ingredientForm, setIngredientForm] = useState([{ id: crypto.randomUUID(), ingredientName: "", amount: 0, unit: "" }]);

  const addRow = () => {
    setIngredientForm((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ingredientName: "",
        amount: 0,
        unit: ""
      }
    ]);
  };

  const deleteRow = (id) => {
    setIngredientForm((prev) =>
      prev.filter((row) => row.id !== id)
    );
  };

  const updateRow = (id, field, value) => {
    setIngredientForm((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [field]: value }
          : row
      )
    );
  };

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
      {ingredientForm.map((row) => (
        <IngredientRow
          key={row.id}
          row={row}
          deleteRow={deleteRow}
          updateRow={updateRow}
        />
      ))}
      <Button type='button' onClick={addRow}>Add Row</Button>
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

// function AddRecipePage() {
//   const [ingredientForm, setIngredientForm] = useState([
//     {
//       id: crypto.randomUUID(),
//       ingredientName: "",
//       amount: 0,
//       unit: ""
//     }
//   ]);

//   const addRow = () => {
//     setIngredientForm((prev) => [
//       ...prev,
//       {
//         id: crypto.randomUUID(),
//         ingredientName: "",
//         amount: 0,
//         unit: ""
//       }
//     ]);
//   };

//   const deleteRow = (id) => {
//     setIngredientForm((prev) =>
//       prev.filter((row) => row.id !== id)
//     );
//   };



//   return (
//     <Form>
//

//       <Button type="button" onClick={addRow}>
//         Add Row
//       </Button>
//     </Form>
//   );
// }