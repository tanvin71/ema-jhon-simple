import React, { useState, useEffect } from 'react';
import'./Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] =useState([])
    const [cart , setCart] = useState([]);
    useEffect(() => {
        fetch('https://morning-oasis-97097.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys =  Object.keys(savedCart);
        fetch('https://morning-oasis-97097.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data)
        )
    },[])
    const handleAddProduct = (product) =>{
        const toBeAdded =  product.key;
        const sameProduct = cart.find(pd =>pd.key === toBeAdded);
        let count =  1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart =  [...others, sameProduct];
        }
        else{

            product.quantity  = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key,count);
    }
    return (
        <div class="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart  ={true}
                        handleAddProduct ={handleAddProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button"> Review cart</button>
                     </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;