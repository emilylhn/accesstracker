import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/backgroundImage.jpg';
import { useNavigate } from 'react-router-dom';

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
  width: 50%;
  text-align: center;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;
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

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  if (response.ok) {
    // Navigate back to the login page after successful signup
    navigate('/login');
  } else {
    const data = await response.json();
    console.log(data); // Log any response data in case of non-successful signup
    console.error('Signup failed');
  }
} catch (error) {
  console.error('Error:', error);
}
};

return (
  <FormContainer>
    <Form onSubmit={handleSignup}>
      <Title>Sign Up</Title>
      <Description>Sign up to make posts and share your accessibility experiences with the community. If successful you will be redirected to the login page to sign in.</Description>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <Button type="submit">Signup</Button>
    </Form>
  </FormContainer>
);
};

export default Signup;