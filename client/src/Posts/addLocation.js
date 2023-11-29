import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
`;

const Input = styled.input`
`;

const Button = styled.button`
`;

const AddLocation = () => {
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState({
    name: '',
    city: '',
    country: '',
    address: '',
    postalCode: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(locationData),
      });

      const data = await response.json();
      console.log(data); 

      if (response.ok) {
        navigate('/'); //send me home after added to research and choose my location
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setLocationData({
      ...locationData,
      [e.target.name]: e.target.value,
    });
  };

return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <Input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <Input type="text" name="country" placeholder="Country" onChange={handleChange} required />
      <Input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <Input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
      <Button type="submit">Add Location</Button>
    </Form>
  );
};

export default AddLocation;
