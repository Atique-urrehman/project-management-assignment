import React from 'react';
import { Link } from 'react-router-dom';
import standardsData from '../data/standards.json';

function StandardsLibrary() {
  return (
    <div className="standards-library">
      <h2>Project Management Standards Library</h2>
      <p style={{textAlign: 'center', color: '#ccc'}}>Select a standard below to explore its full text, search, and bookmark content.</p>
      
      <div className="standards-grid">
        {standardsData.standards.map((standard) => (
          <div key={standard.id} className="standard-card">
            <h3>{standard.title}</h3>
            <p>{standard.description}</p>
            <Link to={`/view/${standard.id}`} className="view-button">
              Explore Full Text
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StandardsLibrary;