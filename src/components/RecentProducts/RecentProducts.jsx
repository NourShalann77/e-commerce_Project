import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../context/CartContext'
import useProducts from '../../Hooks/useProducts'
import toast from 'react-hot-toast';


export default function RecentProducts() {

  let {data ,isError , isLoading ,error}=useProducts();
  let {AddProductToCard} =useContext(CartContext);
 
  const [loading, setloading]= useState(false);

  const [currentId,setcurrentId] = useState(0)

  async function AddToCart(id){
    setcurrentId (id)
    setloading(true);
   let response= await AddProductToCard(id)
   
  if (response.data.status =="success"){
  toast.success(response.data.message)
  setloading(false);

}
else{
toast.error(response.data.message)
setloading(false);

}
  }


//   let {data, isError, isLoading ,error} =   useQuery({
//   queryKey: ["recentProduct"],
//   queryFn : getProducts ,
//   staleTime:10000
// })


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


        <button onClick={ ()=>AddToCart(product.id)} className='btn '>

          {loading &&currentId == product.id ? <>
           <i className='fas fa-spinner fa-spin'></i>
          
          </> :"Add To Cart"}
        </button>
      </div>
    </div>

  ))
}
</div>
   
  </>
}

