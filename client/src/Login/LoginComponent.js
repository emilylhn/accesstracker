
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  /* Your form styling */
`;

const Input = styled.input`
  /* Your input styling */
`;

const Button = styled.button`
  /* Your button styling */
`;

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        setIsLoggedIn(true); // Update login status
        navigate('/');
        window.location.reload();
      } else {
        // Handle error cases
      }
    } catch (error) {
      console.error('Error:', error);
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
