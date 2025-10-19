import React, { useState } from 'react';
import standardsData from '../data/standards.json'; 
import softwareDiagram from '../assets/diagrams/software-process.png';
import innovativeDiagram from '../assets/diagrams/innovative-process.png';
import governmentDiagram from '../assets/diagrams/government-process.png';

function ProcessDesignView() {
    const proposals = standardsData.processProposals || [];
    const initialScenario = proposals.length > 0 ? proposals[0].scenario : '';
    
    const [selectedScenario, setSelectedScenario] = useState(initialScenario);
    const [viewMode, setViewMode] = useState('details'); // 'details' or 'diagram'

    const currentProposal = proposals.find(p => p.scenario === selectedScenario);

    // Minimal inline styles (kept consistent)
    const styles = {
        container: { padding: '20px', backgroundColor: '#282c34', color: 'white', minHeight: '80vh' },
        selector: { marginBottom: '30px', borderBottom: '1px solid #444', paddingBottom: '15px' },
        scenarioTitle: { color: '#61dafb', borderBottom: '2px solid #61dafb', paddingBottom: '5px', marginBottom: '20px' },
        sectionHeader: { color: '#bbb', marginTop: '20px', marginBottom: '10px', borderLeft: '3px solid #61dafb', paddingLeft: '10px' },
        cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' },
        card: { backgroundColor: '#3a4351', padding: '15px', borderRadius: '4px' },
        phaseList: { listStyleType: 'none', padding: '0' },
        phaseItem: { borderLeft: '5px solid #61dafb', paddingLeft: '15px', marginBottom: '15px', backgroundColor: '#333b45' },
        phaseName: { fontWeight: 'bold', fontSize: '1.1em', color: '#61dafb' },
        justification: { backgroundColor: '#4a5568', padding: '15px', borderRadius: '4px', marginTop: '30px', border: '1px solid #61dafb' },
        // New styles for the tab view
        tabButton: (isActive) => ({
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: isActive ? '#61dafb' : '#4a5568',
            color: isActive ? '#282c34' : 'white',
            fontWeight: 'bold',
            borderRadius: '4px 4px 0 0',
        }),
        diagramBox: {
            backgroundColor: '#3a4351',
            padding: '40px',
            textAlign: 'center',
            fontSize: '1.2em',
            color: '#ccc',
            marginTop: '10px',
            border: '2px dashed #61dafb',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }
    };

    const renderDetails = () => (
        <>
            <h4 style={styles.sectionHeader}>Process Workflow (Phases & Gates)</h4>
            <ul style={styles.phaseList}>
                {currentProposal.phases.map((phase, index) => (
                    <li key={index} style={styles.phaseItem}>
                        <div style={styles.phaseName}>{phase.name}</div>
                        <div style={{ fontSize: '0.8em', fontStyle: 'italic', marginBottom: '5px' }}>
                            Referenced Standards: {phase.standard}
                        </div>
                        <div style={styles.phaseActivity}>Key Activities: {phase.activities}</div>
                    </li>
                ))}
            </ul>

            <h4 style={styles.sectionHeader}>Key Roles & Artifacts</h4>
            <div style={styles.cardGrid}>
                <div style={styles.card}>
                    <strong>Key Roles:</strong> {currentProposal.key_roles}
                </div>
                <div style={styles.card}>
                    <strong>Artifacts/Deliverables:</strong> {currentProposal.artifacts}
                </div>
                <div style={styles.card}>
                    <strong>Decision Gates:</strong> {currentProposal.decision_gates}
                </div>
            </div>
            
            <h4 style={styles.sectionHeader}>Tailoring Justification (Why the Blend?)</h4>
            <div style={styles.justification}>
                {currentProposal.justification}
            </div>
        </>
    );

// src/components/ProcessDesignView.js

// ... (existing code, including image imports and styles)

const renderDiagram = () => {
    let diagramImage;
    let altText = "Process workflow diagram";

    // Map selectedScenario to the correct image
    if (selectedScenario === "Custom Software Development (Speed & Flexibility)") {
        diagramImage = softwareDiagram;
        altText = "Custom Software Development Process Diagram";
    } else if (selectedScenario === "Innovative Product Development (Uncertainty & Balance)") {
        diagramImage = innovativeDiagram;
        altText = "Innovative Product Development Process Diagram";
    } else if (selectedScenario === "Large Government Project (Compliance & Control)") {
        diagramImage = governmentDiagram;
        altText = "Large Government Project Process Diagram";
    } else {
        // Fallback if no scenario matches
        return (
            <div style={styles.diagramBox}>
                <p>No diagram available for this scenario yet. Please select a scenario.</p>
            </div>
        );
    }

    return (
        <div style={styles.diagramBox}> {/* Keep diagramBox styling for outer container */}
            <img 
                src={diagramImage} 
                alt={altText} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} // Make image responsive
            />
        </div>
    );
};

// ... (rest of the component code, using renderDiagram)

    return (
        <div style={styles.container}>
            <h2>Phase 2: Tailored Project Process Proposals</h2>
            
            <div style={styles.selector}>
                <label style={{ marginRight: '15px', fontWeight: 'bold' }}>Select Scenario:</label>
                <select 
                    value={selectedScenario} 
                    onChange={(e) => {
                        setSelectedScenario(e.target.value);
                        setViewMode('details'); // Reset to details when changing scenario
                    }}
                    style={{ padding: '8px', borderRadius: '4px' }}
                >
                    {proposals.map(p => (
                        <option key={p.scenario} value={p.scenario}>{p.scenario}</option>
                    ))}
                </select>
            </div>

            <h3 style={styles.scenarioTitle}>{currentProposal.scenario}</h3>
            <p><strong>Context:</strong> {currentProposal.context}</p>
            <p><strong>Proposed Approach:</strong> <em>{currentProposal.approach}</em></p>

            {/* TAB CONTROLS */}
            <div style={{ marginTop: '20px' }}>
                <button 
                    style={styles.tabButton(viewMode === 'details')} 
                    onClick={() => setViewMode('details')}
                >
                    Process Details
                </button>
                <button 
                    style={styles.tabButton(viewMode === 'diagram')} 
                    onClick={() => setViewMode('diagram')}
                >
                    Process Diagram
                </button>
            </div>

            {/* CONTENT RENDER */}
            <div style={{ borderTop: '1px solid #444', paddingTop: '20px' }}>
                {viewMode === 'details' ? renderDetails() : renderDiagram()}
            </div>
        </div>
    );
}

export default ProcessDesignView;