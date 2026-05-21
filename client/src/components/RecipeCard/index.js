import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import "../../index.css";

const RecipeCard = ({ id, imgLink, title, name, score, likes }) => {

    return (
        <Link to={`/explore/${id}`} className='recipe-link'>
            <Card className='recipe-card mb-4' key={id}>
                <Card.Img
                    variant="top"
                    src={imgLink}
                />
                <Card.Body>
                    <Card.Title className='recipe-title'>{title}</Card.Title>
                    <Card.Text className='recipe-author'>By {name}</Card.Text>
                    <div className='recipe-stats'>
                        <span>
                            <FaHeart className='heart-icon' />
                            {" "}
                            {likes}
                        </span>
                        <span>
                            <FaLeaf className='leaf-icon' />
                            {" "}
                            Spoonacular Score: {Math.ceil(score || 0)}%
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default RecipeCard;