import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #003227;
`;

const ErrorMessage = styled.h2`
  font-family: 'Silk Flower', serif;
  font-size: 36px;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 20px;
`;

const AuthButton = styled(Link)`
  padding: 20px 30px;
  border: none;
  border-radius: 5px;
  background-color: #577f74;
  color: white;
  font-size: 35px;
  font-family: 'Silk Flower', serif;
  text-decoration: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const SignInRequiredPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>Uh Oh! You need to be signed in to do that.</ErrorMessage>
      <ButtonContainer>
        <AuthButton to="/login">Login</AuthButton>
        <AuthButton to="/signup">Sign Up</AuthButton>
      </ButtonContainer>
    </ErrorContainer>
  );
};

export default SignInRequiredPage;
