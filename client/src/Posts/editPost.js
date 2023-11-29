import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EditPostForm = styled.form`
  /* Add your styling for the form here */
`;

const EditPost = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/posts/${postId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { post } = await response.json();
          setContent(post.content);
          setTags(post.tags.join(', ')); // Convert tags array to a string
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, tags: tags.split(',').map(tag => tag.trim()) }),
      });

      if (response.ok) {
        // Redirect to the updated post or any other desired route
        navigate(`/posts/${postId}`);
      } else {
        console.error('Failed to edit post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <EditPostForm onSubmit={handleEdit}>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label>
        Tags:
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <button type="submit">Update Post</button>
    </EditPostForm>
  );
};

export default EditPost;
