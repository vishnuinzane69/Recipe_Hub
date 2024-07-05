// Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeUser } from "../store/authSlice";

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const isSuperuser = useSelector(store => store.auth.isSuperuser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post('http://127.0.0.1:8000/recipeapi/logout/', {}, {
                headers: { 'Authorization': "Token " + user.token }
            })
            .then(() => {
                dispatch(removeUser());
                navigate('/login');
            })
            .catch(error => {
                console.error("Logout failed:", error);
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4 style={{ paddingLeft: '10px' }}>RECIPE HUB</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to={"/"} className="nav-link" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    {user ? (
                        <>
                            {isSuperuser && (
                                <li className="nav-item">
                                    <span className="nav-link" onClick={logout}>Logout</span>
                                </li>
                            )}
                            {!isSuperuser && (
                                <>
                                    <li className="nav-item">
                                        <NavLink to={"/recipes"} className="nav-link" activeClassName="active">
                                            Recipes
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={"/recipes/new"} className="nav-link" activeClassName="active">
                                            Add Recipe
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={"/user/UserList"} className="nav-link" activeClassName="active">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" onClick={logout}>Logout</span>
                                    </li>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to={"/register"} className="nav-link" activeClassName="active">
                                    Signup
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/login"} className="nav-link" activeClassName="active">
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
