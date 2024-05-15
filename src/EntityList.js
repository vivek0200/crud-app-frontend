import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const EntityList = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api').then((res) => {
      console.log(res.data);
      setEntities(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${id}`);
      setEntities(entities.filter((entity) => entity.id !== id));
      alert('Entity deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete entity');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Entities</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {entities.map((entity) => (
          <li key={entity.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            {entity.name} - {entity.email} - {entity.mobileNumber} {entity.dob}
            <button>
            <Link
              to={`/update/${entity.id}`}
              style={{color: "inherit", textDecoration: "none", }}
            >
              Update
            </Link>
            </button>
            <button onClick={() => handleDelete(entity.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;
