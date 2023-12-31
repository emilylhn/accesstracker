import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import LandingPage from './Home/Home';
import LocationPosts from './Posts/LocationPosts';
import Login from './Login/LoginComponent';
import Signup from './Login/SignUpComponent';
import AddLocation from './Posts/addLocation';
import MakePost from './Posts/makePost';
import Navbar from './Home/NavBar';
import GetPostById from './Posts/getPostByID';
import ViewPostsByUser from './Posts/viewPostsByUser';
import EditPost from './Posts/editPost';
import SignInRequiredPage from './Login/ErrorComponent';
import About from './Home/About';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
       <GlobalStyles />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locations/:locationId/posts" element={<LocationPosts />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-location" element={<AddLocation />} />
        {isLoggedIn && <Route path="/locations/:locationId/make-post" element={<MakePost />} />}
        <Route path="/posts/:postId" element={<GetPostById />} />
        <Route path="/user/posts" element={<ViewPostsByUser />} />
        <Route path="/edit/:postId" element={<EditPost />} />
        <Route path="/signin-required" element={<SignInRequiredPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
