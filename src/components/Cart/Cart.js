import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const total = cart.reduce((total, prd) =>total + prd.price , 0);'
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
        
    }
    let shipping = 0;
    if(total> 35 ){
        shipping = 0;
    }
    else if(total> 15){
        shipping = 4.99;
    }
    
    const tax = (total / 10);
    const grandTotal =(total +shipping + Number(tax)).toFixed();
    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h4>Order summery</h4>
            <p>Items Ordered {cart.length}:</p>
            <p>Product price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}
            <p><small>Tax + Vat: {formatNumber(tax)}</small></p>
            </small></p>
            <p>Total Price:{grandTotal}</p>
        </div>
    );
};

export default Cart;