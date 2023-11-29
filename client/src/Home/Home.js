import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

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

const LandingPage = () => {
  return (
    <LandingContainer>
      <Content>
        <h1>Welcome to My AccessTracker Site</h1>
        <p>
          Search to view posts for a location or log in to contribute your own experiences!
        </p>
        <SearchBar />
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;
