
// import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';

// const Form = styled.form`
// `;

// const Input = styled.input`
// `;

// const Button = styled.button`
// `;

// const Login = () => {
//   const { handleLogin } = useContext(AuthContext); // Access the handleLogin function from the context
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log('Response Data:', data);
//         // console.log('UserID:', data.user.userId);

//         handleLogin(); 

//         const token = data.token;
//         localStorage.setItem('token', token);
//         console.log('Token set in localStorage:', token);

//         const userId = data.user.userId;
//         if (userId) {
//           localStorage.setItem('userId', userId);
//           console.log('UserID:', userId);
//         } else {
//           console.log('UserID not found in response');
//         }


//         navigate('/'); // Redirect after successful login
//       } else {
//         if (response.status === 401) {
//           console.log('Invalid email or password');
//         } else if (response.status === 500) {
//           console.log('Server error');
//         }
//         // Handle other status codes appropriately
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       console.log('Network error or unexpected exception');
//     }
//   };


//   return (
//     <Form onSubmit={handleLoginSubmit}>
//       <Input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <Input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <Button type="submit">Login</Button>
//     </Form>
//   );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Form = styled.form``;

const Input = styled.input``;

const Button = styled.button``;

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        handleLogin();

        const token = data.token;
        localStorage.setItem('token', token);
        console.log('Token set in localStorage:', token);

        const userId = data.user.userId;
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('UserID:', userId);
        } else {
          console.log('UserID not found in response');
        }

        navigate('/');
      } else {
        if (response.status === 401) {
          console.log('Invalid email or password');
        } else if (response.status === 500) {
          console.log('Server error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Network error or unexpected exception');
    }
  };

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default Login;
