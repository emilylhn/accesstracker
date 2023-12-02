import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PageBackground = styled.div`
  background-color: #003227; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #FFF9EF;
  color: black;
  width: 70%;
`;

const PostTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Silk Flower', serif;
`;

const PostContent = styled.p`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px;
  border-top: 1px solid black;
`;

const PostTagsExperience = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  flex-direction: column;
`;

const Tag = styled.span`
  background-color: #577F74;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
  font-size: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ExperienceContainer = styled.div`
  margin-top: 8px;
`;

const ExperienceText = styled.span`
  color: #003227;
  font-family: 'Silk Flower', serif;
  font-size: 22px; 
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
  <PageBackground>
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <PostTagsExperience>
        <TagsContainer>
          {post.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        <ExperienceContainer>
          <ExperienceText>You rated this experience as {post.experience}.</ExperienceText>
        </ExperienceContainer>
      </PostTagsExperience>
    </PostContainer>
  </PageBackground>
);
          }

export default GetPostById;
