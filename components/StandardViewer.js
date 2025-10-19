import React, { useState, useEffect, useCallback } from 'react'; // CORRECTED standard React import
import { useParams, useSearchParams } from 'react-router-dom'; // CORRECTED react-router-dom import
import standardsData from '../data/standards.json'; // Import mock data

// Utility function to get bookmarks from localStorage
const getBookmarks = (standardId) => {
    const savedBookmarks = localStorage.getItem(`bookmarks_${standardId}`);
    return savedBookmarks ? new Set(JSON.parse(savedBookmarks)) : new Set();
};

// Utility function to save bookmarks to localStorage
const saveBookmarks = (standardId, bookmarks) => {
    localStorage.setItem(`bookmarks_${standardId}`, JSON.stringify(Array.from(bookmarks)));
};

function StandardViewer() {
    const { standardId } = useParams();
    const [searchParams] = useSearchParams();
    const deepLinkSectionId = searchParams.get('section');

    const [searchText, setSearchText] = useState('');
    const [standard, setStandard] = useState(null);
    const [viewedSection, setViewedSection] = useState(null); 
    const [bookmarks, setBookmarks] = useState(new Set()); 

    useEffect(() => {
        const selectedStandard = standardsData.standards.find(s => s.id === standardId);
        setStandard(selectedStandard);
        
        // Load bookmarks for the current standard
        setBookmarks(getBookmarks(standardId));

        // Handle deep links
        if (deepLinkSectionId && selectedStandard) {
            const initialSection = selectedStandard.content.find(s => s.id === deepLinkSectionId);
            if (initialSection) {
                setViewedSection(initialSection);
            }
        } else {
            setViewedSection(null);
        }
    }, [standardId, deepLinkSectionId]);

    // Function to toggle bookmark state
    const toggleBookmark = useCallback((sectionId) => {
        const newBookmarks = new Set(bookmarks);
        if (newBookmarks.has(sectionId)) {
            newBookmarks.delete(sectionId);
        } else {
            newBookmarks.add(sectionId);
        }
        setBookmarks(newBookmarks);
        saveBookmarks(standardId, newBookmarks);
    }, [standardId, bookmarks, standardId]); // Added standardId to dependency array for completeness

    if (!standard) {
        return <h2 style={{color: '#e0e0e0', textAlign: 'center'}}>Loading... or Standard not found.</h2>;
    }

    // Utility function to render a paragraph with simple bolding
    const renderParagraph = (p, key) => {
        const htmlContent = p.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        return <p key={key} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    // --- CONTENT VIEW RENDERING FUNCTION ---
    const renderContentView = (section) => {
        if (!section) return null;

        const isBookmarked = bookmarks.has(section.id);

        return (
            <div className="content-view-wrapper">
                <button 
                    className="back-to-index-button" 
                    onClick={() => setViewedSection(null)}
                >
                    ← Back to Section Index
                </button>
                
                <div 
                    key={section.id} 
                    id={`section-${section.id}`} 
                    className={`standard-section ${deepLinkSectionId === section.id ? 'highlighted' : ''}`}
                >
                    <div className="section-header-row">
                        <h3>{section.id} - {section.title}</h3>
                        <button 
                            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} 
                            onClick={() => toggleBookmark(section.id)}
                            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                        >
                           {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                        </button>
                    </div>
                    

                    {/* Render content based on the 'paragraphs' array */}
                    {section.paragraphs && (
                        <ul className="content-list">
                            {section.paragraphs.map((p, pIndex) => {
                                // If the paragraph starts with '-', render as a list item
                                if (p.startsWith('-')) {
                                    const listItemContent = p.substring(1).trim();
                                    const htmlContent = listItemContent.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
                                    return <li key={pIndex} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                                }
                                // Otherwise, render as a standard paragraph
                                return renderParagraph(p, pIndex);
                            })}
                        </ul>
                    )}
                                         {section.imagePath && ( //images--------------------images
                    <div className="section-image-container">
                        <img 
                            // Assumes images are in the 'public' folder or a subfolder like 'public/assets/images'
                            src={`${process.env.PUBLIC_URL}/${section.imagePath}`} 
                            alt={section.imageAlt || section.title}
                            className="section-image"
                        />
                        {section.imageAlt && <p className="image-caption">{section.imageAlt}</p>}
                    </div>
                     )}
                    {deepLinkSectionId === section.id && <p className="deep-link-highlight">**This section was deep-linked from the Comparison View!**</p>}
                </div>
            </div>
        );
    };

    // --- INDEX/GRID VIEW RENDERING FUNCTION ---
    const renderIndexView = () => {
        // Function to create a clean text snippet
        const createSnippet = (section) => {
            if (!section.paragraphs || section.paragraphs.length === 0) return "No description available.";
            const fullText = section.paragraphs.join(' ');
            return fullText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/-/g, '').trim();
        };

        // Filter sections based on search text (title or ID)
        const filteredSections = standard.content.filter(section => 
            section.title.toLowerCase().includes(searchText.toLowerCase()) || 
            section.id.toLowerCase().includes(searchText.toLowerCase())
        );

        // Separate bookmarked sections for rendering order
        const bookmarkedSections = filteredSections.filter(s => bookmarks.has(s.id));
        const regularSections = filteredSections.filter(s => !bookmarks.has(s.id));

        return (
            <div className="index-view-wrapper">
                <h3 style={{textAlign: 'center', color: '#ccc'}}>Table of Contents / Key Concepts</h3>
                
                <input 
                    type="text" 
                    placeholder="Search sections by title or ID..." 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search-input"
                />
                
                <div className="section-grid">
                    {/* Render Bookmarked Sections separately at the top */}
                    {bookmarkedSections.map((section) => (
                        <div 
                            key={section.id} 
                            className="section-card bookmarked-card"
                            onClick={() => setViewedSection(section)}
                        >
                            <div className="bookmark-indicator">★ Bookmarked</div>
                            <div>
                                <div className="section-id">{section.id}</div>
                                <div className="section-title">{section.title}</div>
                                <div className="section-snippet">
                                    {createSnippet(section)}
                                </div>
                            </div>
                            <button className="view-section-button">View Content →</button>
                        </div>
                    ))}

                    {/* Render all other sections */}
                    {regularSections.map((section) => (
                        <div 
                            key={section.id} 
                            className="section-card"
                            onClick={() => setViewedSection(section)}
                        >
                            <div>
                                <div className="section-id">{section.id}</div>
                                <div className="section-title">{section.title}</div>
                                <div className="section-snippet">
                                    {createSnippet(section)}
                                </div>
                            </div>
                            <button className="view-section-button">View Content →</button>
                        </div>
                    ))}
                    {filteredSections.length === 0 && <p style={{color: '#e0e0e0', gridColumn: '1 / -1'}}>No sections match your search.</p>}
                </div>
            </div>
        );
    };
    
    // --- MAIN RENDER LOGIC ---
    return (
        <div className="standard-viewer">
            <h2>{standard.title} Viewer</h2>
            
            {viewedSection 
                ? renderContentView(viewedSection) 
                : renderIndexView()
            }
        </div>
    );
}

export default StandardViewer;