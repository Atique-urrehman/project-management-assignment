import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StandardViewer from './components/StandardViewer';
import ComparisonView from './components/ComparisonView';
import InsightsDashboard from './components/InsightsDashboard';
import StandardsLibrary from './components/StandardsLibrary';
import WBS from './components/WBS';
import './App.css'; // Assuming this imports component-specific styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            {/* Landing page or main library view */}
            <Route path="/" element={<StandardsLibrary />} /> 
            
            {/* View for exploring full text of a standard (e.g., /view/pmbok) */}
            <Route path="/view/:standardId" element={<StandardViewer />} /> 

            {/* Side-by-side comparison of topics */}
            <Route path="/compare" element={<ComparisonView />} />

            {/* Dashboard for summary insights */}
            <Route path="/insights" element={<InsightsDashboard />} />

            {/* Tailored WBS/Process Design view */}
            <Route path="/wbs" element={<WBS />} />

            {/* Basic 404/Not Found route */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;