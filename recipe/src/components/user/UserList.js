import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/recipeapi/users/', {
                    headers: {
                        Authorization: `Token ${currentUser.token}`,
                    },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users. Please try again later.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser.token]);

    const handleFollow = async (userId) => {
        try {
            await axios.post(
                'http://127.0.0.1:8000/recipeapi/follow/',
                { user_id: userId },
                {
                    headers: {
                        Authorization: `Token ${currentUser.token}`,
                    },
                }
            );
            setUsers(users.map(user => user.id === userId ? { ...user, is_followed: true, followers_count: user.followers_count + 1 } : user));
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            await axios.post(
                'http://127.0.0.1:8000/recipeapi/unfollow/',
                { user_id: userId },
                {
                    headers: {
                        Authorization: `Token ${currentUser.token}`,
                    },
                }
            );
            setUsers(users.map(user => user.id === userId ? { ...user, is_followed: false, followers_count: user.followers_count - 1 } : user));
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list-container">
            <Navbar />
            <div className="container">
                <h1 className="text-center">Users</h1>
                <div className="row">
                    {users.map((user) => (
                        <div key={user.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.username}</h5>
                                    <p className="card-text">Email: {user.email}</p>
                                    <p className="card-text">Date Joined: {new Date(user.date_joined).toLocaleDateString()}</p>
                                    <p className="card-text">Followers: {user.followers_count}</p>
                                    
                                    {user.is_followed ? (
                                        <button
                                            className="btn btn-secondary ml-2"
                                            onClick={() => handleUnfollow(user.id)}
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success ml-2"
                                            onClick={() => handleFollow(user.id)}
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserList;
