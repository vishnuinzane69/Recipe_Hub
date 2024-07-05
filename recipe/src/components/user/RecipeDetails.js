import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/recipeapi/recipes/${id}/`, {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                });
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                if (error.response && error.response.status === 401) {
                    setError('Unauthorized access. Please log in.');
                } else if (error.response && error.response.status === 500) {
                    setError('Internal Server Error. Please try again later.');
                } else {
                    setError('Error fetching recipe. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, user.token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="recipe-details-container">
            <Navbar />
            <div className="container">
                <h1 className="text-center">{recipe.title}</h1>
                <div className="card">
                    <div style={{ height: '300px', overflow: 'hidden', filter: recipe.enabled ? 'none' : 'grayscale(100%)' }}>
                        {recipe.image && (
                            <img
                                src={`http://127.0.0.1:8000${recipe.image}`}
                                className="card-img-top"
                                alt={recipe.title}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        )}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Ingredients</h5>
                        <p className="card-text">{recipe.ingredients}</p>
                        <h5 className="card-title">Steps</h5>
                        <p className="card-text">{recipe.steps}</p>
                        <p className="card-text">Cooking Time: {recipe.cooking_time} minutes</p>
                        <p className="card-text">Difficulty Level: {recipe.difficulty_level}</p>
                        <p className="card-text">Category: {recipe.category}</p>
                        <p className="card-text">Likes: {recipe.likes_count}</p>
                        <Link to="/recipes" className="btn btn-primary">Back to Recipes</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;
