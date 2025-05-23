import React, { useState} from 'react'
import { useContext } from 'react';
import { useFormik } from 'formik'
import method from './../../../node_modules/lodash-es/method';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Checkout() { 
 
let {cartId}=useContext(CartContext)
let {Checkout} = useContext (CartContext )


let formik = useFormik({
  initialValues :{
    details: "",
    phone: "",
    city: "",
  },
 
 onSubmit :()=> handleCheckout (cartId,`http://localhost:5173`),
  })
 
 

async function handleCheckout(cartId, url){
  let {data}= await Checkout(cartId , url ,formik.values);
  window.location.href= data.session.url
  
}





  return <>


<h2 className='font-bold text-2xl capitalize text-center my-4 text-amber-500'> checkout now</h2>
<form className="max-w-md p-15  mx-auto" onSubmit={formik.handleSubmit}>
 

  <div className="relative z-0 w-full mb-5 group">

<input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="details" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>



</div>


  <div className="relative z-0 w-full mb-5 group">

<input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>



</div>




<div className="relative z-0 w-full mb-5 group">

<input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="city" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>



</div>







<div className='flex gap-2 items-center'>
<button type="submit" className="text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
  checkout now
</button>

</div>

  
</form>   
  </>
}

