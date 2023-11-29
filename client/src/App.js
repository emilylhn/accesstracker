import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

// function RenderNavbarWithUserId() {
//   // Your existing code for rendering Navbar with userId
// }

function App() {
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <AuthProvider> {/* Wrap your Router with AuthProvider */}
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/locations/:locationId/posts" element={<LocationPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-location" element={<AddLocation />} />
          <Route path="/locations/:locationId/make-post" element={<MakePost />} />
          <Route path="/posts/:postId" element={<GetPostById />} />
          <Route path="/user/posts" element={<ViewPostsByUser />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          {/* <Route path="/user/posts" element={<RenderNavbarWithUserId />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
