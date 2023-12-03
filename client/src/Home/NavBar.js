import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #577f74;
  color: white;
  padding: 20px;
  margin: 0;
  font-size: 25px;
  font-family: 'Silk Flower', serif;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-links {
    display: flex;
    align-items: center;
  }

  .right-links {
    display: flex;
    align-items: center;
  }

  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
  }
`;

const LogoutLink = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
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
        <div className="left-links">
          <li>
            <Link to="/">Access Tracker</Link>
          </li>
        </div>
        <div className="right-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={myPostsLink}>My Posts</Link>
              </li>
              <li>
                <LogoutLink to="/login" onClick={handleLogoutClick}>
                  Logout
                </LogoutLink>
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
        </div>
      </ul>
    </Nav>
  );
};

export default Navbar;
