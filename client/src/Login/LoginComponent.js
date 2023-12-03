import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/backgroundImage.jpg';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #577F74;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Silk Flower', serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 10px;
  font-family: 'Silk Flower', serif;
`;

const Description = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
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

        setIsLoggedIn(true); 
        navigate('/');
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <FormContainer>
    <Form onSubmit={handleLoginSubmit}>
      <Title>Login</Title>
      <Description>Login to make posts and share your accessibility experiences with the community.</Description>
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>
    </Form>
  </FormContainer>
);
};

export default Login;