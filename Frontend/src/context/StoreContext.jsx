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
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  /**
   * The value to be shared between components.
   *
   * @type {object}
   */
  

    const [cartItems,setCartItems]=useState({})
const addToCart =(itemId)=>{
  if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}))
  }
  else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) //it increases the count if id of item is matched 
  }
}
const removeFromCart = (itemId)=>{
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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
  
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
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