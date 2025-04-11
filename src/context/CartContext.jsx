import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Checkout from './../components/Checkout/Checkout';

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartId ,setcartId] =useState (0)

  const [ cartNumber , setcartNumber ] = useState(0)
  // let [cartId , setcartId]=useState(0);


  function AddProductToCard(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        {
          headers
        }
      )
      .then((res) => res)

      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) =>{
          // console.log(res.data.numOfCartItems);
          setcartNumber(res.data.numOfCartItems)
          setcartId(res.data.data._id)
          return res
          }) 
      .catch((err) => err);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        {headers}
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deletleCartItem (productid){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`, {headers})
    .then((res) => res)
      .catch((err) => err);
  }

  function Checkout(cardId ,url,formData) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
      {
        shippingAddress : formData
      },
      {
        headers
      }
       
      )
      .then((res) => res)
      .catch((err) => err);
  }


  useEffect (()=>{
    getLoggedUserCart()
  },[]
)


  return (
    <CartContext.Provider value={{Checkout, deletleCartItem,AddProductToCard, getLoggedUserCart ,updateCartProductQuantity,cartId ,cartNumber,setcartNumber}}>
      {props.children}
    </CartContext.Provider>
  );
}
