import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({product,handleAddProduct,showAddToCart} ) => {
    // console.log(props)
    // const {product,handleAddProduct} =  props
    const {img, name, seller,price,stock,key} = (product)
    return (
        <div className="product ">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
               <br/>
               <p><small>by: {seller}</small></p>
               <p>${price}</p>
               <p><small>Only{stock} left in stock -order soon</small></p>
               {showAddToCart === true && <button className="main-button" onClick = {() =>handleAddProduct(product)}><FontAwesomeIcon icon={faShoppingCart}/> Add to court</button>}
            </div>
            
        </div>
    );
};

export default Product;