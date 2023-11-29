import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={postData.content}
        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        placeholder="Content"
        required
      />

      <div>
        <p>Tags:</p>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Mobility')}
            checked={postData.tags.includes('Mobility')}
          />
          Mobility
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Vision')}
            checked={postData.tags.includes('Vision')}
          />
          Vision
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Hearing')}
            checked={postData.tags.includes('Hearing')}
          />
          Hearing
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Size')}
            checked={postData.tags.includes('Size')}
          />
          Size
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Sensory')}
            checked={postData.tags.includes('Sensory')}
          />
          Sensory
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleTagClick('Other')}
            checked={postData.tags.includes('Other')}
          />
          Other
        </label>

      </div>

      <div>
        <p>Rate your experience at this location:</p>
        <label>
          <input
            type="radio"
            name="experience"
            value="positive"
            onChange={() => handleExperienceChange('positive')}
            checked={postData.experience === 'positive'}
          />
          Positive
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="neutral"
            onChange={() => handleExperienceChange('neutral')}
            checked={postData.experience === 'neutral'}
          />
          Neutral
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="negative"
            onChange={() => handleExperienceChange('negative')}
            checked={postData.experience === 'negative'}
          />
          Negative
        </label>
      </div>

      <button type="submit">Create Post</button>
    </form>
  );
};

export default MakePost;
