import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";




export default function CategoriesSlider() {
  const [categories,setCategories] = useState([])



  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplayspeed:1000,

  };


  function getCatergories (){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data);
      setCategories(res.data.data)
      
    })
    .catch((res)=>{
      console.log(res);
      
    })
  }
useEffect(()=>{ 
  getCatergories()
}, [])



  return <>
<h2 className='text-gray-600 font-mono my-4 capitalize'>shop popular categories</h2>

   <Slider {...settings}>
    {categories.map((category, index)=>
    <div key={index}>
      <img src={category.image} className='w-full h-[200px]  p-2 object-cover cursor-pointer '  alt="" />
      <h4 className='font-mono text-center text-emerald-900 '>{category.name}</h4>


    </div>)}

   </Slider>
   
  </>
}

