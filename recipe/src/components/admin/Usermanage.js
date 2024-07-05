import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const isSuperuser = useSelector((state) => state.auth.isSuperuser);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/recipeapi/recipes/", {
            headers: {
                "Authorization": `Token ${user.token}`,
            },
        }).then(response => {
            setRecipes(response.data);
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }, [user.token]);

    function toggleRecipeStatus(event, recipeId, enabled) {
        event.preventDefault(); // Prevent default behavior
        setLoading(true);
        axios
          .put(`http://127.0.0.1:8000/recipeapi/toggle_recipe_status/${recipeId}/`, { enabled }, {
            headers: { Authorization: `Token ${user.token}` },
          })
          .then(() => {
            setRecipes(prevRecipes => prevRecipes.map(recipe => 
              recipe.id === recipeId ? { ...recipe, enabled: !recipe.enabled } : recipe
            ));
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error toggling recipe status:', error);
            setError('Failed to toggle recipe status. Please try again later.');
            setLoading(false);
          });
      }

    return (
        <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh', padding: '20px 0' }}>
            <Navbar />
            <div className="container">
                <h1 className="text-center">Recipes</h1>
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <div style={{ height: '300px', overflow: 'hidden' }}>
                                    <img
                                        src={`http://127.0.0.1:8000${recipe.image}`}
                                        className="card-img-top"
                                        alt={recipe.title}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%', filter: recipe.enabled ? 'none' : 'grayscale(100%)' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">Ingredients: {recipe.ingredients}</p>
                                    <p className="card-text">Cooking Time: {recipe.cooking_time} minutes</p>
                                    <p className="card-text">Difficulty Level: {recipe.difficulty_level}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit_recipe/${recipe.id}`} className={`btn btn-primary ${!recipe.enabled && 'disabled'}`} tabIndex={recipe.enabled ? 0 : -1}>Edit</Link>
                                        {isSuperuser && (
                                            <button onClick={(event) => toggleRecipeStatus(event, recipe.id, !recipe.enabled)} className="btn btn-danger">
                                                {recipe.enabled ? 'Disable' : 'Enable'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <div className="text-center">Processing...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
}

export default checkAuth(RecipeList);
