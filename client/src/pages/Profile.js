import React from "react";
import { USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const { data } = useQuery(USER, {
        variables: {
            id: id
        }
    });
    const user = data?.user;
    console.log(user)
    return (
        <div className="text-center">
        <h1>Profile</h1>
        <h2>If user not logged in:</h2>
        <ul style={{listStyleType: "none"}}>
            <li>Show username with + icon to add as a friend</li>
            <li>See created recipes</li>
            <li>See saved recipes?</li>
        </ul>
        <h2>For Logged in users (My profile):</h2>
        <ul style={{listStyleType: "none"}}>
            <li>Next to username, allow edit name? (future)</li>
            <li>My friends (future feature)</li>
            <li>My stuff?</li>
        </ul>
        </div>
    )
}

export default Profile;