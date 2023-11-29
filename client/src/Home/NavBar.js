import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  color: white;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;

    li {
      margin: 0 10px;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const myPostsLink = isLoggedIn ? '/user/posts' : '/login';

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to={myPostsLink}>My Posts</Link>
            </li>
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default Navbar;