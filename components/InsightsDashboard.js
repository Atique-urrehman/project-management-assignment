import React from 'react';
import standardsData from '../data/standards.json'; 

// Utility function to convert **markdown** to <b>HTML</b>
const markdownToHtml = (markdown) => {
    if (!markdown) return '';
    return markdown.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
};

function InsightsDashboard() {
    // Access detailed comparison insights (Phase 1 style)
    const detailedInsights = standardsData.insights || {};
    const similarities = detailedInsights.similarities || [];
    const differences = detailedInsights.differences || []; 
    const uniquePoints = detailedInsights.uniquePoints || [];

    // Access high-level analytical summary insights (Phase 2 style)
    const keyInsights = standardsData.keyInsights || [];

    // Simple inline styles to ensure readability without external CSS
    const styles = {
        container: { padding: '20px', backgroundColor: '#282c34', color: 'white' },
        title: { color: '#61dafb', borderBottom: '2px solid #61dafb', paddingBottom: '5px', marginBottom: '20px' },
        summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '20px', marginBottom: '40px' },
        summaryCard: { backgroundColor: '#3a4351', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #61dafb' },
        cardTitle: { color: 'white', fontSize: '1.2em', marginBottom: '10px' },
        cardDesc: { color: '#ccc', fontSize: '0.95em' },
        tags: { marginTop: '15px', fontSize: '0.8em', color: '#aaa', fontStyle: 'italic' },
        sectionHeader: { color: '#bbb', marginTop: '30px', marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '5px' },
        list: { listStyleType: 'disc', marginLeft: '20px' },
        listItem: { marginBottom: '10px' },
        uniqueGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },
        uniqueCard: { backgroundColor: '#333b45', padding: '15px', borderRadius: '4px' }
    };

    return (
        <div className="insights-dashboard" style={styles.container}>
            <h2 style={styles.title}>Key Insights and Comparative Summary 💡</h2>
            
            {/* ---------------------------------------------------- */}
            {/* 1. HIGH-LEVEL ANALYTICAL CONCLUSIONS (Phase 2 Requirement) */}
            {/* ---------------------------------------------------- */}

            <h3 style={styles.sectionHeader}>Phase 2: Analytical Conclusions for Process Tailoring</h3>
            
            <p>These core insights justify the hybrid process designs implemented in the Process Design View.</p>

            <div style={styles.summaryGrid}>
                {keyInsights.map((insight, index) => (
                    <div key={`key-${index}`} style={styles.summaryCard}>
                        <h4 style={styles.cardTitle}>{insight.title}</h4>
                        <p style={styles.cardDesc}>{insight.description}</p>
                        <div style={styles.tags}>
                            Cited: {insight.standards_cited.join(' | ')}
                        </div>
                    </div>
                ))}
            </div>

            <hr style={{ border: 'none', borderTop: '2px solid #666', margin: '40px 0' }}/>
            
            {/* ---------------------------------------------------- */}
            {/* 2. DETAILED COMPARISON DATA (Phase 1 Detail) */}
            {/* ---------------------------------------------------- */}

            <h3 style={styles.sectionHeader}>Detailed Comparative Data (Source Material)</h3>

            {/* SIMILARITIES SECTION */}
            <section className="insight-section">
                <h4 style={{ color: '#aaa', marginBottom: '10px' }}>✅ Similarities (Common Practices)</h4>
                <ul style={styles.list}>
                    {similarities.map((item, index) => (
                        <li 
                            key={`sim-${index}`}
                            style={styles.listItem}
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(item) }}
                        />
                    ))}
                </ul>
            </section>

            <hr style={{ borderTop: '1px dotted #444' }}/>

            {/* DIFFERENCES SECTION */}
            <section className="insight-section">
                <h4 style={{ color: '#aaa', marginBottom: '10px' }}>↔️ Differences (Unique Terminologies/Methodologies)</h4>
                <ul style={styles.list}>
                    {differences.map((item, index) => (
                        <li 
                            key={`diff-${index}`}
                            style={styles.listItem}
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(item) }}
                        />
                    ))}
                    {differences.length === 0 && (
                        <li>No detailed difference points found in the data file.</li>
                    )}
                </ul>
            </section>

            <hr style={{ borderTop: '1px dotted #444' }}/>

            {/* UNIQUE POINTS SECTION */}
            <section className="insight-section">
                <h4 style={{ color: '#aaa', marginBottom: '10px' }}>✨ Unique Points (What only one standard covers)</h4>
                <div style={styles.uniqueGrid}>
                    {uniquePoints.map((item, index) => (
                        <div key={`unique-${index}`} style={styles.uniqueCard}>
                            <strong>{item.standard}:</strong> 
                            <span dangerouslySetInnerHTML={{ __html: markdownToHtml(item.point) }} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default InsightsDashboard;