import React, { useState } from 'react';
import standardsData from '../data/standards.json'; 

function WBS() {
    // Access the wbsScenarios array
    const wbsScenarios = standardsData.wbsScenarios || [];
    
    // Set the initial scenario (the first one in the list, or null if empty)
    const initialScenario = wbsScenarios.length > 0 ? wbsScenarios[0].scenario : '';
    
    const [selectedScenario, setSelectedScenario] = useState(initialScenario);

    // Find the currently selected scenario's data
    const currentScenarioData = wbsScenarios.find(s => s.scenario === selectedScenario);

    // Minimal, functional inline styles for the WBS structure (Dark Theme)
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#282c34', // Dark background
            color: 'white',
            borderRadius: '8px',
            margin: '20px 0',
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '80px 1fr 200px', // Code | Title | Source
            padding: '10px 0',
            fontWeight: 'bold',
            borderBottom: '2px solid #61dafb', // Blue separator
            marginBottom: '10px',
            textTransform: 'uppercase',
            fontSize: '0.85rem'
        },
        // Base item style (will be overridden by renderWBSItem for hierarchy)
        item: {
            display: 'grid',
            gridTemplateColumns: '80px 1fr 200px',
            padding: '8px 0',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            // Default border for separation
            borderBottom: '1px dotted #444', 
        },
        code: {
            fontWeight: 'bold',
        },
        title: {
            paddingRight: '10px',
            display: 'flex', // Enable icon next to title
            alignItems: 'center',
        },
        source: {
            fontSize: '0.9em',
            color: '#aaa',
            fontStyle: 'italic'
        }
    };

    // Helper function to determine the level (1.0, 1.1, 1.1.1) for indentation
    const getLevelFromCode = (code) => {
        if (!code) return 1;
        // Count the number of segments separated by '.'
        return code.split('.').length;
    };

    // Helper function to render the hierarchical WBS item
    const renderWBSItem = (item) => {
        const level = getLevelFromCode(item.code);
        const paddingLeft = (level - 1) * 20; // 0px for 1.0, 20px for 1.1, 40px for 1.1.1

        // Style adjustments based on level for visual hierarchy
        const itemStyle = {
            ...styles.item,
            // Adjust background shade for visual depth
            backgroundColor: level === 1 ? '#4a5568' : (level === 2 ? '#3a4351' : '#2d333b'), 
            // Thick border on top of Level 1 items
            borderTop: level === 1 && item.code !== '1.0' ? '2px solid #61dafb' : 'none', 
            paddingLeft: `${paddingLeft}px` // Indentation
        };

        const titleStyle = {
            ...styles.title,
            fontWeight: level <= 2 ? 'bold' : 'normal',
            color: level === 1 ? '#61dafb' : (level === 3 ? '#ccc' : 'white') // Color coding
        };

        return (
            <div key={item.code} style={itemStyle}>
                <span style={styles.code}>{item.code}</span>
                <span style={titleStyle}>
                    {/* ICON/IMAGE FUNCTIONALITY: Display icon if available */}
                    {item.icon ? <span style={{ marginRight: '8px', fontSize: '1.2em' }}>{item.icon}</span> : null}
                    {item.title}
                </span>
                <span style={styles.source}>
                    {/* Source only shown for detailed items, or all if preferred */}
                    {level > 1 ? `Source: ${item.source}` : null}
                </span>
            </div>
        );
    };

    return (
        <div className="wbs-generator" style={{ padding: '20px' }}>
            <h2>WBS Generator: Standard Mapping Scenarios 🛠️</h2>
            
            <p style={{ maxWidth: '800px', margin: '10px auto 20px auto' }}>
                Select a scenario to see a hybrid **Work Breakdown Structure (WBS)** that maps project deliverables to concepts and structures found across project management standards.
            </p>

            <div className="standard-selector" style={{ marginBottom: '20px' }}>
                <label htmlFor="scenario-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Project Scenario:</label>
                <select 
                    id="scenario-select" 
                    value={selectedScenario} 
                    // CRITICAL: Ensure the correct state setter is used
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px' }}
                >
                    {currentScenarioData && wbsScenarios.map(s => (
                        <option key={s.scenario} value={s.scenario}>{s.scenario}</option>
                    ))}
                    {wbsScenarios.length === 0 && (
                        <option value="">No Scenarios Available</option>
                    )}
                </select>
            </div>

            {currentScenarioData && currentScenarioData.wbsItems.length > 0 ? (
                <div className="wbs-output" style={styles.container}>
                    <h3 style={{ borderBottom: '1px solid #61dafb', paddingBottom: '10px', color: '#61dafb' }}>
                        WBS for: {currentScenarioData.scenario}
                    </h3>
                    
                    <div className="wbs-list-container">
                        {/* Render the WBS header */}
                        <div className="wbs-header" style={styles.header}>
                            <span style={styles.code}>Code</span>
                            <span style={styles.title}>Deliverable/Work Package</span>
                            <span style={styles.source}>Mapping Source</span>
                        </div>
                        
                        {/* Render the WBS items with hierarchy */}
                        {currentScenarioData.wbsItems.map(renderWBSItem)}
                    </div>

                    <p style={{ fontSize: '0.9em', marginTop: '20px', fontStyle: 'italic', color: '#aaa' }}>
                        *This WBS demonstrates a **hybrid approach**, integrating best practices from multiple standards based on the project context.
                    </p>
                </div>
            ) : (
                <p className="loading-message">Select a scenario above to generate the WBS template.</p>
            )}
        </div>
    );
}

export default WBS;