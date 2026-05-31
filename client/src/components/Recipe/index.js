import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Table from 'react-bootstrap/Table';
import "../../index.css";

const RecipeDetails = ({
    id,
    title,
    image,
    servings,
    readyInMinutes,
    cookingMinutes,
    sourceName,
    summary,
    extendedIngredients,
    instructions,
    spoonacularSourceUrl,
    actions
}) => {
    return (
        <Card key={id} bg="light" className="recipe-details-card mx-auto shadow-sm mb-5">
            <h1 className="recipe-title mb-3">{title}</h1>
            <Card.Img variant="top" src={image} />

            <Card.Body>
                <div className="mb-4">
                    {actions}
                </div>
                <Card.Title>By {sourceName}</Card.Title>

                <ListGroup className="mb-4">
                    {(cookingMinutes || readyInMinutes) && (
                        <ListGroup.Item>Cooking time: {cookingMinutes || readyInMinutes} minutes</ListGroup.Item>
                    )}
                    {servings && (
                        <ListGroup.Item>{servings} servings</ListGroup.Item>
                    )}
                </ListGroup>
                <div dangerouslySetInnerHTML={{ __html: summary || "" }} />
                <h4 className="mt-4 mb-3">Ingredients:</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Amount</th>
                            <th>unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extendedIngredients?.map((ingredient, index) => (
                            <tr key={ingredient.id || index}>
                                <td>{index + 1}</td>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount}</td>
                                <td>{ingredient.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h4 className="mt-4 mb-3">Instructions</h4>
                <div dangerouslySetInnerHTML={{ __html: instructions || "" }} />
            </Card.Body>
            {spoonacularSourceUrl && (
                <Card.Footer className="d-flex justify-content-end">
                    <a href={spoonacularSourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                        Spoonacular Link →
                    </a>
                </Card.Footer>
            )}
        </Card>
    )
}

export default RecipeDetails;