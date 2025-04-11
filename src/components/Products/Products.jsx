import React, { useContext, useState } from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import axios from 'axios';




export default function Products() {
    
 let {data ,isError , isLoading ,error}=useProducts();
 if(isError){
   return <h3>{error}</h3>
 }
 if (isLoading){
   return <div className="spinner"></div>
 }
   // const [products,setProducts] =useState([])
 
   // function getProducts(){
   //   axios.get('https://ecommerce.routemisr.com/api/v1/products')
   //   .then((res)=>{
   //     setProducts(res.data.data)
   //   })
   //   .catch((res)=>{})
   // }
 
 
   // useEffect(()=>{
   //   getProducts()
   // })
 
   return <>
 <div className="row">
 
   {data?.data?.data.map((product)=>(
     <div key={product.id} className=" w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/5 ">
     <div className="product p-3 m-3">
       
     <Link to={`productdetalis/${product.id}/${product.category.name}`}>
         <img src={product.imageCover} className='w-full md:w-32 lg:w-48' />
        <h3 className=' text-emerald-600'>{product.category.name}</h3>
         <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
         <div className='flex justify-between'>
           <span> {product.price} EGP</span>
           <span> <i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
         </div>
 
     </Link>
 
 
         <button className='btn '>Add To Cart</button>
       </div>
     </div>
 
   ))
 }
 </div>
    
   </>
 }
 
 
