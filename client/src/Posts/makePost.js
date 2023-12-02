import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #577F74;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
  color: white;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Silk Flower', serif;
`;

const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 10px;
  font-family: 'Silk Flower', serif;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Label = styled.label`
  font-size: 25px;
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical; 
  font-family: Arial, Helvetica, sans-serif;
`;

const TagsExperience = styled.div`
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

const CheckboxRadioButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const MakePost = () => {
  const { locationId } = useParams();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    tags: [], 
    experience: '', 
  });

  const handleTagClick = (tag) => {
    const updatedTags = postData.tags.includes(tag)
      ? postData.tags.filter((t) => t !== tag)
      : [...postData.tags, tag];

    setPostData({ ...postData, tags: updatedTags });
  };

  const handleExperienceChange = (experience) => {
    setPostData({ ...postData, experience });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Location ID:', locationId);
    console.log('User ID:', userId);
    // console.log('Token', token)

    console.log('Submitting Post Data:', {
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        experience: postData.experience,
      });

    try {
      const response = await fetch(`/locations/${locationId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: userId,
          locationId: locationId,
          title: postData.title,
          content: postData.content,
          tags: postData.tags,
          experience: postData.experience,
        }),
      });

      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <FormContainer>
    <Form onSubmit={handleSubmit}>
      <Title>Make A Post</Title>
      <Description>Logged in users can add posts to locations to share their accessibility experiences with the community.</Description>
      <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          placeholder="Title"
          required
        />
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          placeholder="Content"
          required
        />
        <div>
          <Label>Tags:</Label>
          <CheckboxRadioButtonContainer>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Mobility')}
              checked={postData.tags.includes('Mobility')}
            />
            Mobility
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Vision')}
              checked={postData.tags.includes('Vision')}
            />
            Vision
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Hearing')}
              checked={postData.tags.includes('Hearing')}
            />
            Hearing
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Size')}
              checked={postData.tags.includes('Size')}
            />
            Size
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Sensory')}
              checked={postData.tags.includes('Sensory')}
            />
            Sensory
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Other')}
              checked={postData.tags.includes('Other')}
            />
            Other
          </TagsExperience>
          </CheckboxRadioButtonContainer>
        </div>
        <div>
          <Label>Rate your experience at this location:</Label>
          <CheckboxRadioButtonContainer>
          <TagsExperience>
            <input
              type="radio"
              name="experience"
              value="positive"
              onChange={() => handleExperienceChange('positive')}
              checked={postData.experience === 'positive'}
            />
            Positive
          </TagsExperience>
          <TagsExperience>
            <input
              type="radio"
              name="experience"
              value="neutral"
              onChange={() => handleExperienceChange('neutral')}
              checked={postData.experience === 'neutral'}
            />
            Neutral
          </TagsExperience>
          <TagsExperience>
            <input
              type="radio"
              name="experience"
              value="negative"
              onChange={() => handleExperienceChange('negative')}
              checked={postData.experience === 'negative'}
            />
            Negative
          </TagsExperience>
          </CheckboxRadioButtonContainer>
        </div>
        <Button type="submit">Create Post</Button>
      </Form>
    </FormContainer>
  );
};

export default MakePost;