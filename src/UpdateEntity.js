// import React from 'react'

// const UpdateEntity = () => {
//   return (
//     <div>
//       <h1>HI{}</h1>
//     </div>
//   )
// }

// export default UpdateEntity;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EntityForm.css';

const UpdateEntity = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    dob: ''
  });

  useEffect(() => {
    // Fetch existing entity data
    axios.get(`http://localhost:3001/api/${id}`)
      .then((res) => {
        const { name, email, mobileNumber, dob } = res.data;
        setFormData({ name, email, mobileNumber, dob });
      })
      .catch((error) => {
        console.error('Error fetching entity data:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update existing entity
      await axios.put(`http://localhost:3001/api/${id}`, formData);
      alert('Entity updated successfully');
    } catch (error) {
      console.error('Error updating entity:', error);
      alert('Failed to update entity');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Update Entity</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEntity;

