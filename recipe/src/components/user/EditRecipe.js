import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth';

function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        steps: '',
        cooking_time: '',
        difficulty_level: '',
        category: '',
        image: null,
    });
    const [categories, setCategories] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.token) {
            axios.get(`http://127.0.0.1:8000/recipeapi/recipes/${id}/`, {
                headers: { 'Authorization': `Token ${user.token}` }
            })
            .then(response => {
                const { title, ingredients, steps, cooking_time, difficulty_level, category, image } = response.data;
                setRecipe({ title, ingredients, steps, cooking_time, difficulty_level, category, image });
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });

            axios.get("http://127.0.0.1:8000/recipeapi/categories/", {
                headers: { 'Authorization': `Token ${user.token}` }
            })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
        }
    }, [id, user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleImageChange = (event) => {
        setRecipe({ ...recipe, image: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user && user.token) {
            const formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('ingredients', recipe.ingredients);
            formData.append('steps', recipe.steps);
            formData.append('cooking_time', recipe.cooking_time);
            formData.append('difficulty_level', recipe.difficulty_level);
            formData.append('category', recipe.category);
            if (recipe.image) {
                formData.append('image', recipe.image);
            }

            axios.put(`http://127.0.0.1:8000/recipeapi/recipes/${id}/update/`, formData, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                navigate('/recipes');
            })
            .catch(error => {
                console.error('Error updating recipe:', error);
            });
        }
    };

    return (
        <div style={{ 
            backgroundImage: 'url("https://i0.wp.com/e7.pngegg.com/pngimages/1016/591/png-clipart-chef-chef-cartoon-characters.png?ssl=1.jpg")', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            minHeight: '100vh', 
            padding: '20px 0' 
        }}>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Recipe</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={recipe.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ingredients</label>
                                <textarea
                                    className="form-control"
                                    name="ingredients"
                                    value={recipe.ingredients}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Steps</label>
                                <textarea
                                    className="form-control"
                                    name="steps"
                                    value={recipe.steps}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Cooking Time</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="cooking_time"
                                    value={recipe.cooking_time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Difficulty Level</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="difficulty_level"
                                    value={recipe.difficulty_level}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={recipe.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chineese">Chineese</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Continental">Contienental</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditRecipe);
