import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Rating from '../Rating';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { FaInfoCircle } from 'react-icons/fa'; // Import the icon

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/recipeapi/recipes/", {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                });
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                if (error.response && error.response.status === 401) {
                    setError('Unauthorized access. Please log in.');
                } else if (error.response && error.response.status === 500) {
                    setError('Internal Server Error. Please try again later.');
                } else {
                    setError('Error fetching recipes. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [user.token]);

    const openModal = (recipe) => {
        setRecipeToDelete(recipe);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setRecipeToDelete(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        if (recipeToDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/recipeapi/recipes/${recipeToDelete.id}/delete/`, {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                });
                setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete.id));
                closeModal();
            } catch (error) {
                console.error('Error deleting recipe:', error);
                // Optionally, handle the error in the UI
            }
        }
    };

    const handleLike = async (recipeId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/recipeapi/recipes/${recipeId}/like/`, {}, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });

            setRecipes(recipes.map(recipe =>
                recipe.id === recipeId 
                    ? { 
                        ...recipe, 
                        liked: !recipe.liked, 
                        likes_count: recipe.liked ? recipe.likes_count - 1 : recipe.likes_count + 1 
                    } 
                    : recipe
            ));
        } catch (error) {
            console.error('Error liking/unliking recipe:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="recipe-list-container">
            <Navbar />
            <div className="container">
                <h1 className="text-center">Recipes</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="row">
                    {filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="col-12 col-md-6 col-lg-4 mb-4">
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
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">Ingredients: {recipe.ingredients}</p>
                                    <p className="card-text">Cooking Time: {recipe.cooking_time} minutes</p>
                                    <p className="card-text">Difficulty Level: {recipe.difficulty_level}</p>
                                    <p className="card-text">Category: {recipe.category}</p>
                                    <p className="card-text">Likes: {recipe.likes_count}</p>
                                    <Rating initialRating={recipe.rating} />
                                    {recipe.enabled ? (
                                        <Link to={`/edit_recipe/${recipe.id}`} className="btn btn-primary">Edit</Link>
                                    ) : (
                                        <button className="btn btn-primary" disabled>Edit</button>
                                    )}
                                    <button className="btn btn-danger" onClick={() => openModal(recipe)}>Delete</button>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={() => handleLike(recipe.id)}
                                    >
                                        {recipe.liked ? 'Liked' : 'Like'}
                                    </button>
                                    <Link to={`/recipe/${recipe.id}`} className="btn btn-info ml-2">
                                        <FaInfoCircle /> Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete"
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this recipe?</p>
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </Modal>
        </div>
    );
}

export default RecipeList;
