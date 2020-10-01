import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
        <nav>
            <Link to="/shop">Shop</Link>
            <Link to="/review">Review</Link>
            <Link to="/inventory">Manage </Link>
            <button onClick={() => setLoggedInUser({})}>Sign out</button>
        </nav>
        </div>
    );
};

export default Header;