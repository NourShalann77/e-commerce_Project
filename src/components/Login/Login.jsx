import React, { useState} from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import method from './../../../node_modules/lodash-es/method';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';



export default function Login() { 
let {userLogin, setuserLogin}= useContext(UserContext)
let navigate =useNavigate()
const[ApiError,setApiError] =useState("")
const[isLoading,setisLoading] =useState(false)



function handleLogin(values){
  setisLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
  .then((res)=>{
    setisLoading(false)
    if(res.data.message ==="success"){
      localStorage.setItem("userToken", res.data.token)
      setuserLogin(res.data.token)
      navigate("/")
    }
    console.log(res);
  })
  .catch((res)=>{
    setisLoading(false)
    setApiError(res.response.data.message)
})
}
// console.log(res.response.data.message)
let validationSchema = yup.object().shape({
  email: yup.string().email("not vaild email").required("email is required"),
  password: yup.string().min(6,"Password must be at least 6 characters long").required("Password is required"),
  
});



let formik = useFormik({
initialValues :{
  email: "",
  password: ""
},
validationSchema,
// validate: myValidation,
onSubmit : handleLogin,
})
  return <>
{ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>{ApiError}</div> : null}
<h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>Login Now </h2>
<form className="max-w-md p-15  mx-auto" onSubmit={formik.handleSubmit}>
 

  <div className="relative z-0 w-full mb-5 group">

<input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>


{formik.errors.email && formik.touched.email ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
    <span className="font-medium">{formik.errors.email} </span>
  </div> ): null }

</div>


  <div className="relative z-0 w-full mb-5 group">

<input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>


{formik.errors.password && formik.touched.password ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
    <span className="font-medium">{formik.errors.password} </span>
  </div> ): null }

</div>

<div className='flex gap-2 items-center'>
<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className='fas fa-spinner fa-spin'></i> :"Login"}</button>
<Link to ={"/register"}><span className='text-blue-600 underline'> don't you have an account? Register Now </span></Link>  
</div>

  
</form>   
  </>
}

