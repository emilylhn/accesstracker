import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  font-size: 18px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  border-top: 1px solid #ccc;
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

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

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
      {suggestions.length > 0 && (
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
