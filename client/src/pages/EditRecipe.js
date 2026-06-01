import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_RECIPE_BY_ID } from "../utils/queries";
import { UPDATE_RECIPE } from "../utils/mutations";
import MyRecipeForm from "../components/MyRecipeForm";

const EditRecipe = () => {
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState("");
    const [recipeForm, setRecipeForm] = useState({
        title: "",
        summary: "",
        instructions: "",
        image: "",
        link: ""
    });
    const [ingredientForm, setIngredientForm] = useState([{
        name: "",
        amount: "",
        unit: ""
    }]);

    const { loading, data, error: queryError } = useQuery(GET_MY_RECIPE_BY_ID, {
        variables: {
            id: id
        }
    });

    const myRecipe = data?.getMyRecipeById;

    const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE);

    useEffect(() => {
        if (myRecipe) {
            setRecipeForm({
                title: myRecipe.title,
                summary: myRecipe.summary,
                instructions: myRecipe.instructions,
                image: myRecipe.image,
                link: myRecipe.link
            });

            setIngredientForm(
                myRecipe.ingredients.map((ingredient) => ({
                    id: crypto.randomUUID(),
                    name: ingredient.name || "",
                    amount: ingredient.amount || 0,
                    unit: ingredient.unit || ""
                }))
            );
        }
    }, [myRecipe]);

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

    const handleInstructionsChange = (value) => {
        setRecipeForm((prev) => ({
            ...prev,
            instructions: value
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRecipeForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            ...recipeForm,
            ingredients: ingredientForm.map(({ id, ...rest }) => rest)
        }

        try {
            const { data } = await updateRecipe({
                variables: {
                    recipeId: id,
                    recipeData: recipeData
                }
            });
            setSuccessMessage("Recipe updated!")

        } catch (error) {
            console.error(error)
        }
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (queryError) {
        return <p>Error loading recipe.</p>;
    }

    return (
        <MyRecipeForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            recipeForm={recipeForm}
            addRow={addRow}
            updateRow={updateRow}
            deleteRow={deleteRow}
            ingredientForm={ingredientForm}
            handleInstructionsChange={handleInstructionsChange}
            setSuccessMessage={setSuccessMessage}
            successMessage={successMessage}
            submitText={"Save changes"}
        />
    )
}

export default EditRecipe;