import React from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    useEffect(() => {
        fetch('http://localhost:4000/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [productKey])
    return (
        <div className="details_container">
            <h1>Your product details.</h1>
            {
              product &&  <Product showAddToCart ={false} product = {product}></Product>
            }
        </div>
    );
};

export default ProductDetail;