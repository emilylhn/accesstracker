import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom'; 
import backgroundImage from '../assets/backgroundImage.jpg';


const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 50px;
  background-color: #577F74;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const Title = styled.h1`
font-size: 50px;
  margin-bottom: 20px;
  margin-top: 30px; 
  font-family: 'Silk Flower', serif; 
`;

const Description = styled.p`
font-size: 20px;
  margin-bottom: 20px;
  margin-top: 20px; 
  font-family: Arial, Helvetica, sans-serif;
    `;

const AddLocationButton = styled(Link)`
  margin-top: 5px;
  display: inline-block;
  padding: 15px 30px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-family: 'Silk Flower', serif;
  font-size: 25px;
`;


const LandingPage = () => {
  return (
    <LandingContainer>
      <Content>
        <Title>Welcome to the AccessTracker</Title>
        <Description>
          Search to view posts for a location or log in to contribute your own experiences!
        </Description>
        <SearchBar />
        <Description>Don't see the location you're looking for?</Description>
        <AddLocationButton to="/add-location">Add it here</AddLocationButton>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;