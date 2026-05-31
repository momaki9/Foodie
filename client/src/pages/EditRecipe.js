import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MY_RECIPE_BY_ID } from "../utils/queries";

const EditRecipe = () => {
    const { id } = useParams();
    const { loading, data, error } = useQuery(GET_MY_RECIPE_BY_ID, {
        variables: {
            id: id
        }
    })

    console.log(data?.getMyRecipeById);

    console.log(id)
    return (
        <h1>
            Edit Recipe Page
        </h1>
    )
}

export default EditRecipe;