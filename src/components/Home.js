import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Product from './Product';
import '../styling/home.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';

export const Home = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
         auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login');
            }
        })})

        // Cleanup subscription on unmount
       

    return (
        <div className="wrapper">
            <NavBar user={user} />
            <Product />
        </div>
    );
};

export default Home;
