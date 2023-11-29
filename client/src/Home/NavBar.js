
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { AuthContext } from '../AuthContext';

// const Nav = styled.nav`
//   background-color: #333;
//   color: white;

//   ul {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//     display: flex;
//     justify-content: space-around;

//     li {
//       margin: 0 10px;
//     }
//   }

//   a {
//     color: white;
//     text-decoration: none;
//   }
// `;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, handleLogout } = useContext(AuthContext);

//   const handleLogoutClick = () => {
//     localStorage.clear(); // Clear user data from local storage
//     console.log('Local Storage Cleared');
//     navigate('/login'); // Redirect to the login page after logout
//   };

//   const myPostsLink = isLoggedIn ? '/user/posts' : '/login';

//   return (
//     <Nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {isLoggedIn ? (
//           <>
//             <li>
//               <Link to={myPostsLink}>My Posts</Link>
//             </li>
//             <li>
//               <Link to="/login" onClick={handleLogoutClick}>Logout</Link>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </Nav>
//   );
// };

// export default Navbar;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../AuthContext';

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
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    localStorage.clear(); // Clear user data from local storage
    console.log('Local Storage Cleared');
    handleLogout(); // Call handleLogout function from context
    console.log('Logout function called');
    navigate('/login'); // Redirect to the login page after logout
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
              <Link to="/login" onClick={handleLogoutClick}>Logout</Link>
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
