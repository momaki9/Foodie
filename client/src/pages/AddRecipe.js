import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import IngredientRow from '../components/IngredientForm';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import "../index.css";

function AddRecipePage() {

  const [recipeForm, setRecipeForm] = useState({ title: "", description: "", image: "", link: ""});
  const [ingredientForm, setIngredientForm] = useState([{ id: crypto.randomUUID(), name: "", amount: 0, unit: "" }]);
  const [successMessage, setSuccessMessage] = useState("");

  const [addRecipe, { error }] = useMutation(ADD_RECIPE);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipeForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addRow = () => {
    setIngredientForm((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipeData = {
      ...recipeForm,
      ingredients: ingredientForm.map(({id, ...rest}) => rest)
    }

    console.log(recipeData);
    
    try {
      const { data } = await addRecipe({
        variables: { recipeData }
      });

      setRecipeForm({
        title: "",
        description: "",
        image: "",
        link: ""
      });

      setIngredientForm([
        {
          id: crypto.randomUUID(),
          name: "",
          amount: 0,
          unit: ""
        }
      ]);
      setSuccessMessage("Recipe added!")

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className='form-el'>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control name='title' type="text" placeholder="Give your recipe a title" value={recipeForm.title} onChange={handleChange}/>
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' placeholder="Describe your recipe..."  value={recipeForm.description} onChange={handleChange} as="textarea" rows={5}/>
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
        <Form.Control name='image' placeholder="Provide a link to an image"  value={recipeForm.image} onChange={handleChange}/>
      </Form.Group>

      <Form.Group controlId="formGridLink">
        <Form.Label>Link</Form.Label>
        <Form.Control name='link'  value={recipeForm.link} onChange={handleChange} placeholder='video or site link'/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {successMessage && (
        <h4>{successMessage}</h4>
      )}
    </Form>
  );
};

export default AddRecipePage;