import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = styled.div`
  /* Add your styling for the post container here */
`;

const PostTitle = styled.h2`
  /* Title styling */
`;

const PostContent = styled.p`
  /* Content styling */
`;

const GetPostById = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/posts/${postId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const postData = await response.json();
          setPost(postData.post);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      {/* Add styled components for other post details */}
    </PostContainer>
  );
};

export default GetPostById;
