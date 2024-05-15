import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EntityForm.css';

const EntityForm = ({ entityId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    dob: '',
  });

  useEffect(() => {
    if (entityId) {
      // Fetch existing entity data if editing
      axios.get(`http://localhost:3001/api${entityId}`).then((res) => {
        const { name, email, mobileNumber, dob } = res.data;
        setFormData({ name, email, mobileNumber, dob });
      });
    }
  }, [entityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (entityId) {
        // Update existing entity
        await axios.put(`http://localhost:3001/api/${entityId}`, formData);
      } else {
        // Create new entity
        await axios.post('http://localhost:3001/api', formData);
      }
      // Handle success
      alert('Entity saved successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save entity');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
      />
      <button type="submit">{entityId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default EntityForm;