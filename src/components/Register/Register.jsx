import React, { useContext, useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import method from './../../../node_modules/lodash-es/method';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function Register() { 
  let {userLogin , setuserLogin} = useContext(UserContext)
let navigate =useNavigate()
const[ApiError,setApiError] =useState("")
const[isLoading,setisLoading] =useState(false)

//  async function handleRegister(value){
//   console.log(value);
//  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
//   console.log(data);
//   if (data.message == "success"){
//     navigate ("/")
//   }
//   else{
//   }
// }
function handleRegister(values){
  setisLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
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
   setApiError(res.response.message)
    
});
}
// console.log(res.response.data.message)
let validationSchema = yup.object().shape({
  name: yup.string().min(3,"min length is 3").max(10,"max length is 10").required("name is required"),
  email: yup.string().email("not vaild email").required("email is required"),
  password: yup.string().min(6,"Password must be at least 6 characters long").required("Password is required"),
  rePassword: yup.string().oneOf([yup.ref("password")],"Passwords must match").required("Confirmation password is required"),
  phone: yup.string().matches(/^01[1025][0-9]{8}$/, "phone number is notValid").required()
});



let formik = useFormik({
initialValues :{
  name: "",
  email: "",
  password: "",
  rePassword:"",
  phone : "",
},
validationSchema,
// validate: myValidation,
onSubmit : handleRegister,
})
  return <>
{ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>{ApiError}</div> : null}
<h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>Register Now </h2>
<form className="max-w-md p-15  mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">

    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange}
      onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


    <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name
    </label>

    {formik.errors.name && formik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
      <span className="font-medium">{formik.errors.name}</span></div>
       :null }
  </div>

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


  <div className="relative z-0 w-full mb-5 group">

<input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


<label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Repassword</label>


{formik.errors.rePassword && formik.touched.rePassword ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
    <span className="font-medium">{formik.errors.rePassword} </span>
  </div> ): null }

</div>

  
  <div className="relative z-0 w-full mb-5 group">

    <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />


    <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone</label>
    

    {formik.errors.phone && formik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
        <span className="font-medium">{formik.errors.phone} </span>
      </div> : null }

  </div>

<div className='flex gap-2 items-center'>
<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? <i className='fas fa-spinner fa-spin'></i> :"resgister"}</button>
<Link to ={"/login"}><span className='text-blue-600 underline'> do you have an account? Login Now </span></Link>  
</div>

  
</form>   
  </>
}

