import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import Signout from './../Signout/Signout';
import { CartContext } from '../../context/CartContext'

export default function Navbar() {
let {userLogin ,setuserLogin}= useContext(UserContext);
let navigate =useNavigate()

 let {cartNumber}= useContext(CartContext)

function Signout(){
  localStorage.removeItem("userToken");
  setuserLogin(null)
  navigate("/login")

}
  
  return <>
<div>
  <nav className="bg-yellow-400 fixed top-0 left-0 right-0 border-gray-200 z-40">
    <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className='flex items-center gap-5'>
      <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Flowbite Logo" />
      </Link>
    {userLogin != null ? <>
      <ul className='flex gap-3'>
    <li><Link className='text-slate-600' to="">Home </Link></li>
    <li><Link className='text-slate-600 relative' to="carts"> Cart
    <div className='absolute top-[-16px] right-[-16px] rounded-full size-5 flex items-center justify-center p-13  bg-amber-300 text-gray-500'>{cartNumber}</div>
     </Link></li>
    <li><Link className='text-slate-600' to="products">Products</Link></li>
    <li><Link className='text-slate-600' to="categories">categories</Link></li>
    <li><Link className='text-slate-600' to="brands">Brands</Link></li>

  </ul>
  </>: null}

      </div>


      <div className="flex items-center space-x-6 rtl:space-x-reverse">
       <ul className='flex gap-4'>
        <li><i className='fab fa-instagram'></i></li>
        <li><i className='fab fa-facebook'></i></li>
        <li><i className='fab fa-tiktok'></i></li>
        <li><i className='fab fa-twitter'></i></li>
        <li><i className='fab fa-linkedin'></i></li>
        <li><i className='fab fa-youtube'></i></li>
       </ul>

       {userLogin !=null ?  <li onClick={Signout}><Link>Signout</Link></li> :   <ul className='flex gap-4'>
        <li><Link to="login">Login</Link></li>
        <li><Link to="register">Register</Link></li>
      
       </ul>}
    
      </div>
    </div>
  </nav>
</div>


   
  </>
}

