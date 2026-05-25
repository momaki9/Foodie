import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { MY_ACTIVE_GROCERY_LIST } from '../utils/queries';

const GroceryListsRedirect = () => {

    const navigate = useNavigate();

    const {
        loading,
        data
    } = useQuery(MY_ACTIVE_GROCERY_LIST, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {

        if (loading) return;

        const activeList =
            data?.myActiveGroceryList;

        if (activeList) {

            navigate(
                `/groceryList/${activeList._id}`
            );

        } else {

            navigate('/groceryList/new');
        }

    }, [loading, data, navigate]);

    return <p>Loading...</p>;
};

export default GroceryListsRedirect;