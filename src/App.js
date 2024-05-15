import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import EntityList from './EntityList';
import UpdateEntity from './UpdateEntity';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entities" element={<EntityList />} />
          <Route path="/update/:id" element={<UpdateEntity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
