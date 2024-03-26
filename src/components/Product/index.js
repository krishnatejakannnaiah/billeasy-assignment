import React from 'react'
import "./product.css";
import { Rating, Typography } from '@mui/material';


function Product({data, handleProductSelect}) {
    const {id, title, price, description, category, image, rating} = data;
  return (
    <div onClick={() => {handleProductSelect(data)}} className='product-wrap'>
        <img src={image} alt='product image' className='product-img' />
        <div className='product-desc-section'>
            <Typography sx={{fontSize: "14px", marginBottom: "4px"}}>{title}</Typography>
            <Rating name="read-only" value={rating?.rate} readOnly />
            <Typography sx={{fontSize: "16px", fontWeight: 600, marginBottom: "4px"}}>{`$ ${price}`}</Typography>
        </div>
    </div>
  )
}

export default Product