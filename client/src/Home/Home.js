import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lavender;
`;

const Content = styled.div`
  text-align: center;
`;

const AddLocationButton = styled(Link)`
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;


const LandingPage = () => {
  return (
    <LandingContainer>
      <Content>
        <h1>Welcome to My AccessTracker Site</h1>
        <p>
          Search to view posts for a location or log in to contribute your own experiences!
        </p>
        <SearchBar />
        <p>Don't see the location you're looking for?</p>
        <AddLocationButton to="/add-location">Add it here</AddLocationButton>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;
