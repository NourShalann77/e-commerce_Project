import React from 'react'
import style from "./Notfound.module.css"
// import img from "../../assets/ops not found img.jpg"
// import img from "../../assets/opss not found.jpg"
import img from "../../assets/notfound.webp"
import { Link } from 'react-router-dom';
export default function Notfound() {
  return <>

  <div className='flex justify-center'>
    

    <Link to={"/"}>
        <button className='font-encode bg-red-500 hover:bg-red-700 transition-all rounded-xl px-2 py-2 mt-1 text-white'>Back to Home</button>
      </Link>
  </div>

<img className='py-4 m-auto w-90' src={img} alt="not found" />
   
  </>
}

