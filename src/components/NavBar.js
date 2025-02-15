import React, { useContext } from 'react';
import logo from '../assests/e logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../config/Config';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../global/CartContext';

const NavBar = ({ user }) => {
    const navigate = useNavigate();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        });
    };


    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="Logo" />
            </div>
            {!user ? (
                <div className='rightside'>
                    <span><Link to="/signup" className='navlink'>SIGN UP</Link></span>
                    <span><Link to="/login" className='navlink'>LOGIN</Link></span>
                </div>
            ) : (
                <div className='rightside'>
                    <span><Link to="/" className='navlink'>{user}</Link></span>
                    <span><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                    <span className='no-of-products'>{totalQty}</span>
                    <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
                </div>
            )}
        </div>
    );
};

export default NavBar;
