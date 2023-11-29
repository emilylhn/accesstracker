// import {React, useContext, useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { AuthContext } from '../AuthContext';

// const PostsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const PostItem = styled.li`
//   margin-bottom: 20px;
// `;

// const LocationPosts = () => {
//   const { locationId } = useParams(); 
//   const navigate = useNavigate(); 
//   const { isLoggedIn } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [locationName, setLocationName] = useState('');
//   const [selectedTag, setSelectedTag] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   const handleMakePost = () => {
//     if (isLoggedIn) {
//       navigate(`/locations/${locationId}/make-post`);
//     } else {
//       // Redirect to the login page or show a message to log in
//       // For example:
//       navigate('/login');
//       // Or show an alert to log in
//       // alert('Please log in to make a post');
//     }
//   }
//   useEffect(() => {
//     console.log('isLoggedIn in LocationPosts:', isLoggedIn);
//     fetch(`/locations/${locationId}/posts`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts for this location');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setPosts(data.posts);
//         setLocationName(data.name);
//         setFilteredPosts(data.posts); 
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [locationId, isLoggedIn]);

//   useEffect(() => {
//     if (selectedTag) {
//       const filtered = posts.filter((post) => post.tags.includes(selectedTag));
//       setFilteredPosts(filtered);
//     } else {
//       setFilteredPosts(posts);
//     }
//   }, [selectedTag, posts]);

//   const handleTagChange = (e) => {
//     setSelectedTag(e.target.value);
//   };


//   return (
//     <PostsContainer>
//       <h2>Posts for {locationName}</h2>
//       <label htmlFor="tagFilter">Filter by Tag:</label>
//       <select id="tagFilter" onChange={handleTagChange}>
//         <option value="">All</option>
//         <option value="Mobility">Mobility</option>
//         <option value="Vision">Vision</option>
//         <option value="Hearing">Hearing</option>
//         <option value="Sensory">Sensory</option>
//         <option value="Size">Size</option>
//         <option value="Other">Other</option>
//       </select>
//       <ul>
//         {filteredPosts.map((post) => (
//           <PostItem key={post._id}>
//             <p>Content: {post.content}</p>
//             <p>Tags: {post.tags.join(', ')}</p>
//           </PostItem>
//         ))}
//       </ul>

//       <button onClick={handleMakePost}>Make a Post</button>
//     </PostsContainer>
//   );
// };

// export default LocationPosts;


import { React, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostItem = styled.li`
  margin-bottom: 20px;
`;

const LocationPosts = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated logged-in state

  const handleMakePost = () => {
    if (isLoggedIn) {
      navigate(`/locations/${locationId}/make-post`);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    // Simulated logged-in state changes after fetching data
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
      <h2>Posts for {locationName}</h2>
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
      <ul>
        {filteredPosts.map((post) => (
          <PostItem key={post._id}>
            <p>Content: {post.content}</p>
            <p>Tags: {post.tags.join(', ')}</p>
          </PostItem>
        ))}
      </ul>
      <button onClick={handleMakePost}>Make a Post</button>
    </PostsContainer>
  );
};

export default LocationPosts;
