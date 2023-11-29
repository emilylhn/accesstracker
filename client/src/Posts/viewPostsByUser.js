

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PostsContainer = styled.div`
  /* Add your styling for the posts container here */
`;

const PostCard = styled.div`
  /* Styling for individual post cards */
`;

const EditButton = styled.button`
  /* Styling for edit button */
`;

const DeleteButton = styled.button`
  /* Styling for delete button */
`;

const EditLink = styled(Link)`
  /* Optionally, add any additional styles for Link */
  /* This Link won't be displayed but used as a wrapper for navigation */
  /* display: none; */
`;

const ViewPostsByUser = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/users/${storedUserId}/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { posts } = await response.json();
          setUserPosts(posts);
        } else {
          console.error('Failed to fetch user posts');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Handle successful deletion, e.g., remove the post from the state
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

//   return (
//     <PostsContainer>
//       {userPosts.map((post) => (
//         <PostCard key={post._id}>
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           {/* Edit Post Link */}
//           <EditButton to={`/posts/${post._id}/edit`}>Edit</EditButton>
//           {/* Delete Post Button */}
//           <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
//         </PostCard>
//       ))}
//     </PostsContainer>
//   );
// };

return (
    <PostsContainer>
      {userPosts.map((post) => (
        <PostCard key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Edit Post Button */}
          <EditButton>
            <EditLink to={`/edit/${post._id}`}>Edit</EditLink>
          </EditButton>
          {/* Delete Post Button */}
          <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
        </PostCard>
      ))}
    </PostsContainer>
  );
};


export default ViewPostsByUser;
