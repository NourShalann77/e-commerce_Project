import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";

import slide1 from "../../assets/slider-image-1.jpeg"
import slide2 from "../../assets/slider-image-2.jpeg"
import slide3 from "../../assets/slider-image-3.jpeg"
import slide4 from "../../assets/grocery-banner.png"
import slide5 from "../../assets/grocery-banner-2.jpeg"



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed:1000,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]

  }
  


  return <>

  <div className="row ">
    <div className="w-3/4  ">
    
  { <Slider {...settings}>
    <img src={slide3} className='w-full h-[400px] object-cover ' alt="" />
    <img src={slide4} className='w-full h-[400px] object-cover ' alt="" />
    <img src={slide5} className='w-full h-[400px] object-cover' alt="" />
    
     </Slider>}
    
    </div>
    <div className="w-1/4 ">
    <img src={slide2} className='w-full  h-[200px] cursor-pointer' alt="" />
    <img src={slide3} className='w-full  h-[200px]  cursor-pointer' alt="" />

    </div>
  </div>






   
  </>
}

