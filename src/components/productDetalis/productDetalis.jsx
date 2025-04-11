import React, { useEffect, useState } from 'react'
import style from "./ProductDetalis.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
// import Categories from './../Categories/Categories';
import Slider from "react-slick";


export default function ProductDetalis() {
 const [product, setproduct] =useState(null)

  const[relatedProducts,setrelatedProducts] =useState([])


  let { id, category } =  useParams()
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed:1000,
  }



  console.log(id);
  
  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      setproduct(res.data.data)
      

      
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let related= res.data.data.filter((product) => product.category?.name == category)
      setrelatedProducts(related)
    })
  }


  useEffect(()=>{
    getProduct(id);
    getAllProducts()
  }, [id, category])


  return <>
  <div className="row items-center">
  <div className="w-1/4">
   <Slider {...settings}> 
 {product?.images.map((src)=> <img src={src} className='w-full' alt="" /> ) }
  
   </Slider>
  </div>
  <div className="w-3/4 p-16 ">
    <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
    <h5 className='text-gray-500 my-5'>{product?.description}</h5>
    <span className='text-sm text-gray-600'>{product?.category.name}</span>
  <div className='flex justify-between p-3 my-5'>
    <span>{product?.price} EGP</span>
    <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingAverage}</span>
  </div>
  <button className='btn'> Add To Cart</button>
  </div>
  </div>



  <div className="row">

  {relatedProducts.length>0?  relatedProducts.map((product)=>(
    <div key={product.id} className="w-1/5 ">
    <div className="product p-3 m-3">
      
    <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
        <img src={product.imageCover} className='w-full' />
       <h3 className=' text-emerald-600'>{product.category.name}</h3>
        <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between'>
          <span> {product.price} EGP</span>
          <span> <i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
        </div>

    </Link>


        <button className='btn'>Add To Cart</button>
      </div>
    </div>

  )): <div className="spinner"></div>}
</div>




   

 
  </>
}

