import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/backgroundImage.jpg';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  min-height: 100vh;
  padding: 20px;
`;

const Heading = styled.h2`
  font-family: 'Silk Flower', serif;
  margin-bottom: 20px;
  font-size: 45px;
  color: white;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
    font-family: 'Silk Flower', serif;
    color: white;
    font-size: 25px;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #577f74;
    color: white;
    font-size: 19px;
    font-family: 'Silk Flower', serif;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
  }
`;

const PostItem = styled.div`
  margin-bottom: 20px;
  padding: 30px;
  border-radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  width: 60%;
  background-color: ${({ experience }) =>
    experience === 'positive'
      ? '#C8E6C9'
      : experience === 'neutral'
      ? '#FFF9C4'
      : experience === 'negative'
      ? '#FFCDD2'
      : 'transparent'};
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const Title = styled.h3`
  font-family: 'Silk Flower', serif;
  font-size: 30px;
  margin-bottom: 30px;
`;

const TagsExperience = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 15px 0;

  span {
    margin-right: 10px;
    background-color: white;
    color: #003227;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    font-family: 'Silk Flower', serif;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
  }
`;


const LocationPosts = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleMakePost = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin-required');
    } else {
      navigate(`/locations/${locationId}/make-post`);
    }
  };

  useEffect(() => {
    setIsLoggedIn(true);

    fetch(`/locations/${locationId}/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts for this location');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLocationName(data.name);
        setFilteredPosts(data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [locationId]);

  useEffect(() => {
    if (selectedTag) {
      const filtered = posts.filter((post) => post.tags.includes(selectedTag));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <PostsContainer>
            <Heading>Posts for {locationName}</Heading>
      <FilterContainer>
        <label htmlFor="tagFilter">Filter by Tag:</label>
        <select id="tagFilter" onChange={handleTagChange}>
          <option value="">All</option>
          <option value="Mobility">Mobility</option>
          <option value="Vision">Vision</option>
          <option value="Hearing">Hearing</option>
          <option value="Sensory">Sensory</option>
          <option value="Size">Size</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleMakePost}>Make a Post for this Location</button>
      </FilterContainer>
        {filteredPosts.slice().reverse().map((post) => (
          <PostItem key={post._id} experience={post.experience}>
            <Title>{post.title}</Title>
            <p>{post.content}</p>
            <TagsExperience>
              {post.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </TagsExperience>
            <span>This user said their experience was {post.experience}.</span>
          </PostItem>
        ))}
    </PostsContainer>
  );
};

export default LocationPosts;
