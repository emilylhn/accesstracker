import React, { useState,useEffect } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9); 
  margin-bottom: 0px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + 0px);
  left: 0;
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px;
  border-top: 1px solid #ccc;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  margin:0;
  border-radius: 10px;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  let timeoutId;

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    console.log('Search term:', value);
    clearTimeout(timeoutId);

    if (value.length >= 2) {
      timeoutId = setTimeout(async () => {
        try {
          const response = await fetch(`/locations/search?searchTerm=${value}`);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }

          const data = await response.json();
          setSuggestions(data.locations);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 500); 
    } else {
      setSuggestions([]); 
    }
    if (value.length === 0) {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (locationId) => {
    window.location.href = `/locations/${locationId}/posts`;
  };


  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search by name or address..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {suggestions.length > 0 && searchTerm.length >= 2 && (
  <SuggestionsList>
    {suggestions.map((location) => (
      <SuggestionItem
        key={location._id}
        onClick={() => handleSuggestionClick(location._id)}
      >
        {location.name} - {location.address}
      </SuggestionItem>
    ))}
  </SuggestionsList>
)}
    </SearchContainer>
  );
};

export default SearchBar;
