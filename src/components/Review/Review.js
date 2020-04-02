import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';

import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     setOrderPlaced(true);
    //     processOrder();
    // }

    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);

        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        fetch('http://localhost:4000/getProductsByKey', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'      
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key ===key);
                product.quantity =savedCart[key];
                return product;
               
            });
            setCart(cartProducts);
        })
        
    }, [])

    // let thankyou;
    // if(orderPlaced){
    //         thankyou = <img src={happyImage} alt=""/>
    // } 
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                    key = {pd.key}
                    removeProduct = {removeProduct}
                    product ={pd}></ReviewItem>)
            }
            
            {
                !cart.length && <h1>Your cart is empty. <a href="/shop">Keep shopping</a></h1>
            }
            
            </div>
           
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to = '/shipment'>
                        {
                            auth.user ? 
                            <button className="main-button">Proceed checkout</button>
                            : 
                            <button className="main-button">Log in to proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;