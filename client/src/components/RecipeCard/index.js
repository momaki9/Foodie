import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import "../../index.css";

const RecipeCard = ({ id, imgLink, title, name, score, likes, source, to }) => {

    const showStats = score != null && likes != null;

    return (
        <Link to={to} className='recipe-link'>
            <Card className='recipe-card mb-4' key={id}>
                <Card.Img
                    variant="top"
                    src={imgLink}
                />
                <Card.Body>
                    <Card.Title className='recipe-title'>{title}</Card.Title>
                    <Card.Text className='recipe-author'>By {name}</Card.Text>
                    {showStats && (
                        <div className='recipe-stats'>
                            <div className='recipe-stat'>
                                <FaHeart className='heart-icon' />
                                <span>{likes} likes</span>
                            </div>
                            <div className='recipe-stat'>
                                <FaLeaf className='leaf-icon' />
                                <span>{Math.ceil(score || 0)}% score</span>
                            </div>
                        </div>
                    )}
                    {source && (
                        <Card.Text className="recipe-source">
                            From {source}
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </Link>
    )
};

export default RecipeCard;