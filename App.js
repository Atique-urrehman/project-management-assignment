import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// All component imports:
import StandardsLibrary from './components/StandardsLibrary';
import StandardViewer from './components/StandardViewer';
import ComparisonView from './components/ComparisonView';
import InsightsDashboard from './components/InsightsDashboard';
import ProcessDesignView from './components/ProcessDesignView'; 
import WBS from './components/WBS'; 
import './App.css'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            {/* -------------------- CORE PHASE 1 ROUTES -------------------- */}
            
            <Route path="/" element={<StandardsLibrary />} /> 
            <Route path="/view/:standardId" element={<StandardViewer />} /> 
            <Route path="/compare" element={<ComparisonView />} />
            <Route path="/insights" element={<InsightsDashboard />} />

            {/* -------------------- WBS ROUTE (MATCHES NAVBAR) -------------------- */}

            {/* This path MUST match the new link path in Navbar.js */}
            <Route path="/wbs-generator" element={<WBS />} /> 
            
            {/* -------------------- PHASE 2 ROUTE -------------------- */}

            <Route path="/process-design" element={<ProcessDesignView />} />

            {/* -------------------- FALLBACK ROUTE (MUST BE LAST) -------------------- */}
            
            {/* Catches any path that doesn't match the routes above */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;