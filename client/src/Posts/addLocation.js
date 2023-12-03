import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/backgroundImage.jpg';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
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
  font-size: 20px;
  margin-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  font-family: 'Silk Flower', serif;
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
        navigate('/'); //send me home after added to research and choose my location change this later
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
  <FormContainer>
    <Form onSubmit={handleSubmit}>
      <Title>Add A New Location</Title>
      <Description>If you can't find your location, add a new one to the list to make it available for pinning posts to.</Description>
      <Label htmlFor="name">Name</Label>
      <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <Label htmlFor="address">Address</Label>
      <Input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <Label htmlFor="city">City</Label>
      <Input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <Label htmlFor="country">Country</Label>
      <Input type="text" name="country" placeholder="Country" onChange={handleChange} required />
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
      <Button type="submit">Add Location</Button>
    </Form>
  </FormContainer>
);
};

export default AddLocation;