
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #003227;
  min-height: 100vh;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px;
  margin: 15px;
  width: 70%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  background-color: #FFF9EF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
  font-size: 36px;
`;

const TagsExperience = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom:10px;
  padding-top: 10px;

  span {
    margin-right: 10px;
    background-color: #577F74;
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;

  }
`;

const EditButton = styled.button`
  margin-right: 10px;
  background-color: #577F74;
    color: white;
    padding: 15px;
    border-radius: 5px;
    font-size: 17px;
    border: none;
    font-family: 'Silk Flower', serif;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const DeleteButton = styled.button`
    background-color: #577F74;
    color: white;
    padding: 15px;
    border-radius: 5px;
    font-size: 17px;
    border: none;
    font-family: 'Silk Flower', serif;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const EditLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
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
          // setUserPosts(posts);
          setUserPosts(posts.slice().reverse());
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
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PostsContainer>
      {userPosts.map((post) => (
        <PostCard key={post._id}>
          <PostHeader>
            <Title>{post.title}</Title>
          </PostHeader>
          <p>{post.content}</p>
          <TagsExperience>
            {post.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </TagsExperience>
          <span>You said your experience was {post.experience}.</span>
          <PostFooter>
            <EditButton>
              <EditLink to={`/edit/${post._id}`}>Edit</EditLink>
            </EditButton>
            <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
          </PostFooter>
        </PostCard>
      ))}
    </PostsContainer>
  );
};

export default ViewPostsByUser;
