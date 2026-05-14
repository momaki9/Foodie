import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const HomePage = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me;

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {user ? (
                <h1>Welcome, {user.username}!</h1>
            ) : (
                <h1>Welcome!</h1>
            )}

        </section>
    )
}

export default HomePage;