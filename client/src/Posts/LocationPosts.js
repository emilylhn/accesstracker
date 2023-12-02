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
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #577f74;
    color: white;
    font-size: 16px;
    font-family: 'Silk Flower', serif;
    cursor: pointer;
  }
`;

const PostItem = styled.div`
  margin-bottom: 20px;
  padding: 30px;
  border-radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  width: 70%;
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
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-family: 'Silk Flower', serif;
  font-size: 30px;
`;

const TagsExperience = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 10px 0;

  span {
    margin-right: 10px;
    background-color: #577f74;
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;
  }
`;

const PostsList = styled.div`
/* list-style-type: none; */
  /* margin: 0 auto; 
  width: 70%; 
  display: inline-block;  
  text-align: left; 
  padding: 0;  */
`;


const LocationPosts = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Check if a valid token exists in localStorage to determine if the user is logged in
  //   const token = localStorage.getItem('token');
  //   const userLoggedIn = token ? true : false;
  //   setIsLoggedIn(userLoggedIn);
  // }, []);

  const handleMakePost = () => {
    if (isLoggedIn) {
      navigate(`/locations/${locationId}/make-post`);
    } else {
      navigate('/signin-required');
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
        <button onClick={handleMakePost}>Make a Post</button>
      </FilterContainer>
      <PostsList>
        {filteredPosts.map((post) => (
          <PostItem key={post._id} experience={post.experience}>
            <Title>{post.title}</Title>
            <p>Content: {post.content}</p>
            <TagsExperience>
              {post.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </TagsExperience>
            <span>This user said their experience was {post.experience}.</span>
          </PostItem>
        ))}
      </PostsList>
    </PostsContainer>
  );
};

export default LocationPosts;
