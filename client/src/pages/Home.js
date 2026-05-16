import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const HomePage = ({loggedIn}) => {

    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me;
    console.log(user)
    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {user ? (
                <h1 className="text-center mb-4">Welcome, {user.username}!</h1>
            ) : (
                <h1 className="text-center mb-4">Welcome!</h1>
            )}
            <h2 className="text-center mb-4">Something cool coming here soon!</h2>
        </section>
    )
}

export default HomePage;