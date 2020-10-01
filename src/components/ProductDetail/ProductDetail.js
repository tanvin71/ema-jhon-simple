import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} =useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://morning-oasis-97097.herokuapp.com/product/' + productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey])
    console.log(product)
    
    return (
        <div>
            <h1>product  details is here</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>   
    );
};

export default ProductDetail;