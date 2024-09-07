import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import { StoreContext } from '../../context/StoreContext'; // Import StoreContext

const Home = () => {
  const { token } = useContext(StoreContext); // Get token from context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    // Check if the user is logged in
    const storedToken = localStorage.getItem('token'); // Check localStorage for token
    if (token || storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
          <AppDownload />
        </>
      ) : (
        <div className="not-logged-in">
        <Header />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
          <AppDownload />
        </div>
      )}
    </div>
  );
};

export default Home;
