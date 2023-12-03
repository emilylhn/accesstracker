import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #003227;
`;

const EditPostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF9EF;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
  color: black;
  width: 60%;
`;

const Input = styled.input`
  width: 75%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;
`;

const Textarea = styled.textarea`
  width: 75%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical; 
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: #577F74;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Silk Flower', serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); 
`;

const EditTitle = styled.h1`
  font-family: 'Silk Flower', serif;
  font-size: 42px;
`;

const Label = styled.label`
  font-size: 25px;
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const CheckboxRadioButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const TagsExperience = styled.div`
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [experience, setExperience] = useState('');
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
          setTitle(post.title);
          setContent(post.content);
          setTags(post.tags);
          setExperience(post.experience);
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
        body: JSON.stringify({ title, content, tags, experience }),
      });

      if (response.ok) {
        navigate(`/posts/${postId}`);
      } else {
        console.error('Failed to edit post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTagClick = (tag) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];

    setTags(updatedTags);
  };

  return (
    <FormContainer>
      <EditPostForm onSubmit={handleEdit}>
        <EditTitle>Edit Post</EditTitle>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
                checked={tags.includes('Mobility')}
              />
              Mobility
            </TagsExperience>
            <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Vision')}
              checked={tags.includes('Vision')}
            />
            Vision
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Hearing')}
              checked={tags.includes('Hearing')}
            />
            Hearing
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Size')}
              checked={tags.includes('Size')}
            />
            Size
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Sensory')}
              checked={tags.includes('Sensory')}
            />
            Sensory
          </TagsExperience>
          <TagsExperience>
            <input
              type="checkbox"
              onChange={() => handleTagClick('Other')}
              checked={tags.includes('Other')}
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
                onChange={() => setExperience('positive')}
                checked={experience === 'positive'}
              />
              Positive
            </TagsExperience>
            <TagsExperience>
              <input
                type="radio"
                name="experience"
                value="neutral"
                onChange={() => setExperience('neutral')}
                checked={experience === 'neutral'}
              />
              Neutral
            </TagsExperience>
            <TagsExperience>
              <input
                type="radio"
                name="experience"
                value="negative"
                onChange={() => setExperience('negative')}
                checked={experience === 'negative'}
              />
              Negative
            </TagsExperience>
          </CheckboxRadioButtonContainer>
        </div>
        <Button type="submit">Update Post</Button>
      </EditPostForm>
    </FormContainer>
  );
};

export default EditPost;
