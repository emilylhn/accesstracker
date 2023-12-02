import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #577F74;
  color: white;
  padding: 20px;
  margin: 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;

    li {
      margin: 0 10px;
      font-family: 'Silk Flower', serif;
      font-size: 20px;
      display: inline;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const LogoutLink = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {

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
      </ul>
    </Nav>
  );
};

export default Navbar;