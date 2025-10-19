import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import comparisonData from '../data/standards.json'; 

// Utility function to convert **markdown** to <b>HTML</b>
const markdownToHtml = (markdown) => {
    // Replace **text** with <b>text</b>
    return markdown.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
};

function ComparisonView() {
    // Determine the initial selected topic
    const availableTopics = comparisonData.comparisonTopics || [];
    const initialTopic = availableTopics.length > 0 
        ? availableTopics[0].topic 
        : 'Risk Management'; 

    const [selectedTopic, setSelectedTopic] = useState(initialTopic);
    const topicData = availableTopics.find(t => t.topic === selectedTopic);

    return (
        <div className="comparison-view">
            <h2>Standard Comparison Engine</h2>
            
            <div className="topic-selector">
                <label htmlFor="topic-select" className="topic-label">Select Topic:</label>
                <select 
                    id="topic-select" 
                    value={selectedTopic} 
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="topic-dropdown"
                >
                    {availableTopics.map(t => (
                        <option key={t.topic} value={t.topic}>{t.topic}</option>
                    ))}
                </select>
            </div>

            {!topicData ? (
                <p className="loading-message">Select a topic to view comparisons.</p>
            ) : (
                <div className="comparison-grid">
                    
                    {topicData.standards && Object.keys(topicData.standards).map(standardId => {
                        const standardInfo = topicData.standards[standardId];
                        
                        if (!standardInfo) return null;

                        return (
                            <div key={standardId} className="comparison-card">
                                <h3>{standardInfo.name}</h3>
                                
                                {/* APPLYING THE CONVERTER HERE */}
                                <p>
                                    <strong>Approach:</strong> 
                                    <span 
                                        dangerouslySetInnerHTML={{ __html: markdownToHtml(standardInfo.approach) }} 
                                    />
                                </p>
                                
                                {/* APPLYING THE CONVERTER HERE */}
                                <p>
                                    <strong>Guidance:</strong> 
                                    <span 
                                        dangerouslySetInnerHTML={{ __html: markdownToHtml(standardInfo.guidance) }} 
                                    />
                                </p>
                                
                                {standardInfo.sectionId && (
                                    <Link 
                                      to={`/view/${standardId}?section=${standardInfo.sectionId}`} 
                                      className="deep-link-button"
                                      title={`View the full context for ${standardInfo.sectionId} in ${standardInfo.name}`}
                                    >
                                      Go to Section {standardInfo.sectionId} 🔗
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ComparisonView;