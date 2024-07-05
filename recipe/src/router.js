import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import './App.css';

import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import CreateRecipe from "./components/user/CreateRecipe";
import RecipeList from "./components/user/RecipeList";
import EditRecipe from "./components/user/EditRecipe";
import Rating from "./components/Rating";
import Usermanage from "./components/admin/Usermanage";
import UserList from "./components/user/UserList";
import RecipeDetails from "./components/user/RecipeDetails";


const router = createBrowserRouter([
    { path: '/', element: <App/> }, // Root route
    { path: '/register', element: <Register/> }, // Register route
    { path: '/login', element: <Login/> }, // Login route
    { path: '/recipes/new', element: <CreateRecipe/> }, // Create recipe route
    { path: '/recipes', element: <RecipeList/> },
    { path: "/recipe/:id", element: <RecipeDetails/> },
    { path: '/edit_recipe/:id', element: <EditRecipe/> }, // Edit recipe route

    { path: '/admin/Usermanage', element: <Usermanage/> }, 
    { path: '/user/UserList', element: <UserList/> }, 
    
    
]);


export default router
