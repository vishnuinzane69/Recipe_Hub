import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';
import checkAuth from '../auth/checkAuth';

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/recipeapi/categories/", {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [user.token]);

    const addRecipe = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('steps', steps);
        formData.append('cooking_time', cookingTime);
        formData.append('difficulty_level', difficultyLevel);
        formData.append('category', category); // Append category
        formData.append('image', image);

        axios.post("http://127.0.0.1:8000/recipeapi/recipes/create/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${user.token}`,
            },
        }).then(response => {
            navigate('/');
        }).catch(error => {
            console.error('Error adding new recipe:', error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div style={{ 
            backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-taobao-vector-cartoon-work-chef-cooking-apple-table-and-chair-poster-image_129030.jpg")', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            minHeight: '100vh', 
            padding: '20px 0' 
        }}>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add Recipe</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={title} 
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ingredients</label>
                                <textarea 
                                    className="form-control" 
                                    value={ingredients} 
                                    onChange={(event) => setIngredients(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Steps</label>
                                <textarea 
                                    className="form-control" 
                                    value={steps} 
                                    onChange={(event) => setSteps(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Cooking Time (in minutes)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={cookingTime} 
                                    onChange={(event) => setCookingTime(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Difficulty Level</label>
                                <select
                                    className="form-control"
                                    value={difficultyLevel}
                                    onChange={(event) => setDifficultyLevel(event.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Continental">Continental</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(CreateRecipe);
