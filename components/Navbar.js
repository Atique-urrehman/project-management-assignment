import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">PM Standards Analyst</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Library</Link>
        </li>
        <li>
          <Link to="/compare">Comparison</Link>
        </li>
        <li>
          <Link to="/insights">Insights</Link>
        </li>
        <li>
          {/* FIX APPLIED HERE: Must match the path used in App.js (/wbs-generator) */}
          <Link to="/wbs-generator">WBS Generator</Link> 
        </li>
        <li>
          {/* Phase 2 Link (already correct) */}
          <Link to="/process-design">Process Design</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;