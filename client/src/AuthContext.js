// import React, { createContext, useState, useEffect } from 'react';

// // Create the context
// export const AuthContext = createContext();

// // Create a provider component to wrap your app
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     console.log('User logged in:', isLoggedIn);
//   }, [isLoggedIn]);

//   const handleLogin = () => {
//     // Logic for handling login
//     setIsLoggedIn(true);
//     console.log('User logged in:', isLoggedIn);
//   };

//   const handleLogout = () => {
//     // Logic for handling logout
//     setIsLoggedIn(false);
//     console.log('User logged in:', isLoggedIn);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
