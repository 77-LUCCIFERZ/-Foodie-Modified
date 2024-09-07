/**
 * Creates a context for storing and sharing data between components.
 *
 * @example
 * import React from 'react';
 * import { StoreContextProvider } from './StoreContext';
 *
 * const App = () => (
 *   <StoreContextProvider>
 *     <MyComponent />
 *   </StoreContextProvider>
 * );
 *
 * const MyComponent = () => {
 *   const store = useContext(StoreContext);
 *   return <div>{store.data}</div>;
 * };
 */



/**
 * The StoreContext object.
 *
 * @type {React.Context<any>}
 */

/**
 * The StoreContextProvider component.
 *
 * This component wraps the StoreContext.Provider component and provides a way to
 * share data between components.
 *
 * @returns {React.ReactElement} The StoreContextProvider component.
 */







import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  /**
   * The value to be shared between components.
   *
   * @type {object}
   */
  

    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);

const addToCart =async (itemId)=>{
  if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}))
  }
  else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) //it increases the count if id of item is matched 
  }
  if(token){
    await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
  }
}
const removeFromCart = async (itemId)=>{
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
  if (token) {
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  }
}
const getTotalCartAmount =()=>{
  let totalAmount = 0;
  for(const item in cartItems){
    if(cartItems[item]>0){
      let itemInfo =food_list.find((product)=>product._id===item);
      totalAmount += itemInfo.price * cartItems[item];
    }
   
  }
  return totalAmount;
}

const fetchFoodList=async()=>{
  const response=await axios.get(url+"/api/food/list");
  setFoodList(response.data.data);
}

const loadCartData=async(token)=>{
  const response =await axios.post(url+"/api/cart/get",{},{headers:{token}});
  setCartItems(response.data.data);
}

  useEffect(()=>{

async function loadData(){
  await fetchFoodList(); 
  // to extract from data of db not assets so while rendering it is used here also yele bina image wala ko dido raixa like format and div only without image tyo solve garna foofitem.jsx ma and evry ehere image is used pass url in param usecontext and use 

  if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"));
    await loadCartData(localStorage.getItem("token"));
  }
}
loadData(); 
//function  call

  },[])

  
  // yo chai very important so it will store token of localstore and hook will prevent from logged out at afterpage refresh again n again   



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

// a way to pass data through the component tree without having to pass props down manually at every level. When we use Context to manage state globally across your application, it's often referred to as a "store" or "state container."

// Creates a context for sharing data between components
// Uses createContext from React
// Initial value is null
// StoreContextProvider

// A component that wraps StoreContext.Provider
// Provides a way to share data between components
// Takes children prop, which is the component tree that will access the shared data
// Creates an empty object contextValue to hold the shared data
// Returns a StoreContext.Provider component with the contextValue and children
// How it works

// Components wrap their children with StoreContextProvider
// Components that need to access the shared data use useContext hook with StoreContext
// The shared data is stored in the contextValue object
// Benefits

// Decouples components from each other
// Allows easy data sharing between components
// Flexible and efficient way to share data