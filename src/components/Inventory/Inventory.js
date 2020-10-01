import React from 'react';
import fakeData from '../../fakeData';
const Inventory = () => {
    const handleAddProduct = () => {
        const  product = {}
        fetch('https://morning-oasis-97097.herokuapp.com/addProduct', {
             method: 'POST',
             headers: { 
                 'content-type' : 'application/json'
             },
             body: JSON.stringify(product)
                
            })
    }
    return (
        <div>


            <form action="">
                <p><span>Name: </span><input type="2"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add product</button>
            </form>
            
            
        </div>
    );
};

export default Inventory;