import React from "react";
import { useQuery } from "@apollo/client";
import { MY_GROCERY_LISTS } from "../utils/queries";
const MyGroceryListPage = () => {
    const {loading, data, error} = useQuery(MY_GROCERY_LISTS);
    return (
        <h1>My Grocery List</h1>
    )
}

// page not used
// export default MyGroceryListPage;