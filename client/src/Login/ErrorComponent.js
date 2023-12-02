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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #577f74;
  color: white;
  font-size: 16px;
  font-family: 'Silk Flower', serif;
  text-decoration: none;
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
