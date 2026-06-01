import {
    Form,
    Button,
    Col,
    Alert
} from "react-bootstrap";

import IngredientRow from '../IngredientForm';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "../../index.css";

// component:
const MyRecipeForm = ({
    handleSubmit,
    handleChange,
    recipeForm,
    addRow,
    updateRow,
    deleteRow,
    ingredientForm,
    handleInstructionsChange,
    setSuccessMessage,
    successMessage,
    submitText
}) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean']
        ]
    }

    return (
        <Form onSubmit={handleSubmit} className='form-el'>
            {successMessage && (
                <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccessMessage}
                    className="mt-3"
                >
                    <strong>Success!</strong> {successMessage}
                </Alert>
            )}
            <Form.Row>
                <Form.Group as={Col} className="mb-4">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' type="text" placeholder="Give your recipe a title" value={recipeForm.title} onChange={handleChange} />
                </Form.Group>
            </Form.Row>

            <Form.Group className="mb-4">
                <Form.Label>Summary</Form.Label>
                <Form.Control name='summary' placeholder="Summary of your recipe..." value={recipeForm.summary} onChange={handleChange} as="textarea" rows={5} />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Instructions</Form.Label>
                <ReactQuill
                    theme='snow'
                    value={recipeForm.instructions}
                    onChange={handleInstructionsChange}
                    placeholder='Write your cooking instructions...'
                    modules={modules}
                />
            </Form.Group>
            {ingredientForm.map((row) => (
                <IngredientRow
                    key={row.id}
                    row={row}
                    deleteRow={deleteRow}
                    updateRow={updateRow}
                />
            ))}
            <Button type='button' onClick={addRow} variant='outline-primary'> + Add ingredient </Button>
            <Form.Group className="mb-4">
                <Form.Label>Image</Form.Label>
                <Form.Control name='image' placeholder="Provide a link to an image" value={recipeForm.image} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Link</Form.Label>
                <Form.Control name='link' value={recipeForm.link} onChange={handleChange} placeholder='video or site link' />
            </Form.Group>
            <div className='d-flex justify-content-end mt-4'>
                <Button variant="primary" type="submit" size='lg'>
                    {submitText}
                </Button>
            </div>
        </Form>
    )
}

export default MyRecipeForm;