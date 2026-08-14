import React from "react";
import { USER, MY_SENT_REQUESTS, MY_PENDING_REQUESTS } from "../utils/queries";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const { data } = useQuery(USER, {
        variables: {
            id: id
        }
    });
    const { loading, data: requestData} = useQuery(MY_PENDING_REQUESTS)
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
    const user = data?.user;
    // admin2 6a5d3377b37132e13dab5f6a
    // admin 
    const handleClick = async () => {
        // console.log(user)
        // try {
        //     const { data } = await sendFriendRequest({
        //         variables: {
        //             recipientId: "6a5d3377b37132e13dab5f6a"
        //         }
        //     })
        //     console.log(data)
        // } catch (err) {
        //     console.error(err)
        // }
        console.log(requestData?.myPendingRequests)
    }

    return (
        <div className="text-center">
            <button onClick={handleClick}>test</button>
            <h1>Profile</h1>
            <h2>If user not logged in:</h2>
            <ul style={{ listStyleType: "none" }}>
                <li>Show username with + icon to add as a friend</li>
                <li>See created recipes</li>
                <li>See saved recipes?</li>
            </ul>
            <h2>For Logged in users (My profile):</h2>
            <ul style={{ listStyleType: "none" }}>
                <li>Next to username, allow edit name? (future)</li>
                <li>My friends (future feature)</li>
                <li>My stuff?</li>
            </ul>
        </div>
    )
}

export default Profile;