import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import MyRecipeForm from '../components/MyRecipeForm';
import "../index.css";

function AddRecipe() {

  const [recipeForm, setRecipeForm] = useState({ title: "", summary: "", instructions: "", image: "", link: "" });
  const [ingredientForm, setIngredientForm] = useState([{ id: crypto.randomUUID(), name: "", amount: 0, unit: "" }]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [addRecipe, { loading: updating }] = useMutation(ADD_RECIPE);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipeForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInstructionsChange = (value) => {
    setRecipeForm((prev) => ({
      ...prev,
      instructions: value
    }));
  };

  // addRow
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
  // deleteRow
  const deleteRow = (id) => {
    setIngredientForm((prev) =>
      prev.filter((row) => row.id !== id)
    );
  };
  // updateRow
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
      ingredients: ingredientForm.map(({ id, ...rest }) => rest)
    }

    try {
      const { data } = await addRecipe({
        variables: { recipeData }
      });

      setRecipeForm({
        title: "",
        summary: "",
        instructions: "",
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

      setSuccessMessage("Recipe added!");
      setShowToast(true);

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MyRecipeForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      recipeForm={recipeForm}
      addRow={addRow}
      updateRow={updateRow}
      deleteRow={deleteRow}
      ingredientForm={ingredientForm}
      handleInstructionsChange={handleInstructionsChange}  
      successMessage={successMessage}
      submitText={"Submit"}
      showToast={showToast}
      setShowToast={setShowToast}
      updating={updating}
    />
  );
};

export default AddRecipe;