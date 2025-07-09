import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import winesData from './wines-2024.json';

// Simple Image Component (no lazy loading)
useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = new Image()
          img.src = src
          img.onload = () => {
            setImageSrc(src)
            setImageLoading(false)
          }
          observer.unobserve(ref)
        }
      })
    },
    { threshold: 0.1, rootMargin: '50px' }
  )

  // capture the current ref
  const ref = imageRef.current
  if (ref) {
    observer.observe(ref)
  }

  return () => {
    // clean up on that same ref
    if (observer && ref) {
      observer.unobserve(ref)
    }
  }
}, [src, placeholderSrc])


// Analytics functions
const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};

const trackWineView = (wine) => {
    trackEvent('view_item', {
        currency: 'USD',
        value: wine.price,
        items: [{
            item_id: wine.id,
            item_name: wine.name,
            item_category: wine.type,
            price: wine.price,
            quantity: 1
        }]
    });
};

const trackTastingAction = (wine, action) => {
    trackEvent('wine_tasting_action', {
        wine_id: wine.id,
        wine_name: wine.name,
        action: action,
        wine_price: wine.price,
        wine_score: wine.score
    });
};

const trackSearch = (searchTerm, resultsCount) => {
    trackEvent('search', {
        search_term: searchTerm,
        results_count: resultsCount
    });
};

const trackFilterUse = (filterType, filterValue) => {
    trackEvent('filter_wines', {
        filter_type: filterType,
        filter_value: filterValue
    });
};

const trackExport = (format, itemCount) => {
    trackEvent('export_list', {
        export_format: format,
        items_exported: itemCount
    });
};

const wines = winesData.map((wine, index) => ({
    id: parseInt(wine.top100_rank, 10) || index + 1,
    rank: parseInt(wine.top100_rank, 10) || 0,
    name: wine.wine_full || 'Unnamed Wine',
    winery: wine.winery_full || 'Unknown Winery',
    image: wine.label_url || '',
    varietal: wine.varietal || 'N/A',
    vintage: parseInt(wine.vintage, 10) || 'N/A',
    region: wine.region || 'Unknown Region',
    country: wine.country || 'Unknown Country',
    type: wine.color || 'N/A',
    score: parseInt(wine.score, 10) || 0,
    price: parseFloat(String(wine.price || "0").replace('$', '')),
    description: wine.note || 'No description available.',
}));

const Icons = {
    Wine: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2h8l1 7c0 2.5-2 4.5-4.5 4.5S8 11.5 8 9l1-7z" /><line x1="12" y1="13.5" x2="12" y2="20" /><line x1="9" y1="20" x2="15" y2="20" /><ellipse cx="12" cy="9" rx="3.5" ry="2" fill="currentColor" opacity="0.3"/></svg>),
    Search: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>),
    Grid: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>),
    List: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>),
    X: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    Menu: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    Download: ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
};

// FIXED Scroll Animation Hook
const useScrollAnimation = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);
};

// Welcome Popup Component
const WelcomePopup = ({ isOpen, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);
    
    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem('hideWelcomePopup', 'true');
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="welcome-popup-overlay">
            <div className="welcome-popup-backdrop" onClick={handleClose} />
            <div className="welcome-popup-content">
                <button onClick={handleClose} className="welcome-popup-close">
                    <Icons.X className="icon-close" />
                </button>
                
                <div className="welcome-popup-header">
                    <div className="welcome-popup-logo">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Wine Spectator Logo" />
                    </div>
                    <h2>About The Top 100</h2>
                </div>
                
                <div className="welcome-popup-body">
                    <p>
                        Each year since 1988, <em>Wine Spectator</em> has released its Top 100 list, where our editors select the most exciting wines from the thousands we reviewed during the course of the year. These wines are a diverse group—ranging from emerging labels and regions to traditional estates exploring new directions—and all generate the excitement we call the "X-factor."
                    </p>
                    
                    <p>
                        In addition, our selection also prioritizes quality (based on score), value (based on price) and availability (based on the number of cases either made or imported into the United States). These criteria are applied to the wines that rated outstanding (90 points or higher on <em>Wine Spectator</em>'s 100-point scale) each year to determine our Top 100.
                    </p>
                    
                    <p>
                        As many wines are made in limited quantities and not available in every market, our Top 100 is not a "shopping list," but rather a guide to wineries to watch in the future—a reflection of the producers and wines our editors become particularly passionate about in each new year.
                    </p>
                </div>
                
                <div className="welcome-popup-footer">
                    <label className="welcome-popup-checkbox">
                        <input 
                            type="checkbox" 
                            checked={dontShowAgain}
                            onChange={(e) => setDontShowAgain(e.target.checked)}
                        />
                        <span>Don't show me again</span>
                    </label>
                    
                    <button onClick={handleClose} className="btn-modern">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export Button Component
const ExportButton = ({ tastingRecord, wines }) => {
    const [showMenu, setShowMenu] = useState(false);
    
    const exportTastingList = (format) => {
        const data = Object.entries(tastingRecord).map(([wineId, status]) => {
            const wine = wines.find(w => w.id === parseInt(wineId));
            return {
                Rank: wine.rank,
                Wine: wine.name,
                Winery: wine.winery,
                Vintage: wine.vintage,
                Type: wine.type,
                Region: wine.region,
                Country: wine.country,
                Status: status === 'tasted' ? 'Tasted' : 'Want to Taste',
                Score: wine.score,
                Price: `$${wine.price}`
            };
        });

        if (format === 'csv') {
            const csv = [
                Object.keys(data[0]).join(','),
                ...data.map(row => Object.values(row).map(v => `"${v}"`).join(','))
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wine-tasting-list-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } else if (format === 'json') {
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wine-tasting-list-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        trackExport(format, data.length);
        setShowMenu(false);
    };

    const itemCount = Object.keys(tastingRecord).length;
    if (itemCount === 0) return null;

    return (
        <div className="export-button-container">
            <button 
                className="btn-modern export-button"
                onClick={() => setShowMenu(!showMenu)}
            >
                <Icons.Download className="export-icon" />
                Export List ({itemCount})
            </button>
            {showMenu && (
                <div className="export-menu">
                    <button 
                        onClick={() => exportTastingList('csv')}
                        className="export-menu-item"
                    >
                        Export as CSV
                    </button>
                    <button 
                        onClick={() => exportTastingList('json')}
                        className="export-menu-item"
                    >
                        Export as JSON
                    </button>
                </div>
            )}
        </div>
    );
};

const TastingCheckbox = ({ wineId, tastingRecord, onTasteChange, status }) => {
    const isChecked = tastingRecord[wineId] === status;
    const handleChange = () => onTasteChange(wineId, isChecked ? null : status);
    
    return (
        <label className="tasting-checkbox">
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleChange} 
            />
            <span>{status === 'tasted' ? 'I have tasted this' : 'I want to taste this'}</span>
        </label>
    );
};

const TastingRecordSummary = ({ tastingRecord, wines }) => {
    const counts = useMemo(() => {
        return Object.values(tastingRecord).reduce((acc, status) => {
            if (status === 'tasted') acc.tasted += 1;
            if (status === 'want') acc.want += 1;
            return acc;
        }, { tasted: 0, want: 0 });
    }, [tastingRecord]);

    return (
        <div className="tasting-summary reveal">
            <h3>Track Your Tasting Record</h3>
            <p className="tasting-counts">
                <span className="count-label">Tasted: </span>
                <span className="count-value">{counts.tasted}</span>
                <span className="count-separator">—</span>
                <span className="count-label">Want to Taste: </span>
                <span className="count-value">{counts.want}</span>
            </p>
            <ExportButton tastingRecord={tastingRecord} wines={wines} />
        </div>
    );
};

const Pagination = ({ winesPerPage, totalWines, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalWines / winesPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;

    return (
        <nav className="pagination">
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button 
                            onClick={() => paginate(number)} 
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const WineCard = ({ wine, onSelect, tastingRecord, onTasteChange, isCondensed }) => {
    const getRankColor = (rank) => {
        if (rank === 1) return 'rank-gold';
        if (rank === 2) return 'rank-silver';
        if (rank === 3) return 'rank-bronze';
        return 'rank-default';
    };

    const getTypeColor = (type) => {
        const typeLower = (type || '').toLowerCase();
        if (typeLower.includes('red')) return 'type-red';
        if (typeLower.includes('white')) return 'type-white';
        if (typeLower.includes('sparkling')) return 'type-sparkling';
        if (typeLower.includes('rosé')) return 'type-rose';
        return 'type-default';
    };

    if (isCondensed) {
        return (
            <div className="wine-card-condensed" onClick={() => onSelect(wine)}>
                <div className={`wine-rank ${getRankColor(wine.rank)}`}>{wine.rank}</div>
                <div className="wine-image-condensed">
                    <LazyImage src={wine.image} alt={wine.name} className="wine-bottle-image" />
                </div>
                <div className="wine-info-condensed">
                    <h3>{wine.name}</h3>
                    <p>{wine.winery}</p>
                </div>
                <div className="wine-details-condensed">
                    <div className="wine-score">
                        <div className="score-value">{wine.score}</div>
                        <div className="score-label">points</div>
                    </div>
                    <div className="wine-price">${wine.price}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="wine-card-modern">
            <div className={`wine-rank ${getRankColor(wine.rank)}`}>{wine.rank}</div>
            <div className="wine-image" onClick={() => onSelect(wine)}>
                {wine.image ? (
                    <LazyImage 
                        src={wine.image} 
                        alt={`Bottle of ${wine.name}`} 
                        className="wine-bottle-image" 
                    />
                ) : (
                    <Icons.Wine className="wine-placeholder" />
                )}
            </div>
            <div className="wine-content">
                <div>
                    <h3 onClick={() => onSelect(wine)}>{wine.name}</h3>
                    <p className="wine-winery" onClick={() => onSelect(wine)}>{wine.winery}</p>
                </div>
                <div className="wine-metadata">
                    <div className="wine-tags">
                        <span className="wine-tag">{wine.vintage}</span>
                        <span className={`wine-tag ${getTypeColor(wine.type)}`}>{wine.type}</span>
                        <span className="wine-tag">{wine.region}</span>
                    </div>
                    <div className="tasting-options">
                        <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="tasted" />
                        <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="want" />
                    </div>
                    <div className="wine-footer">
                        <div>
                            <span className="wine-price-large">${wine.price}</span>
                            <span className="wine-score-inline">{wine.score} pts</span>
                        </div>
                        <button className="btn-modern btn-small" onClick={() => onSelect(wine)}>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WineDetailModal = ({ wine, isOpen, onClose, tastingRecord, onTasteChange }) => {
    useEffect(() => {
        if (isOpen && wine) {
            trackWineView(wine);
        }
    }, [isOpen, wine]);

    if (!isOpen || !wine) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-content wine-detail-modal">
                <button onClick={onClose} className="modal-close">
                    <Icons.X className="icon-close" />
                </button>
                <div className="wine-detail-grid">
                    <div className="wine-detail-image">
                        {wine.image ? (
                            <img src={wine.image} alt={`Bottle of ${wine.name}`} />
                        ) : (
                            <Icons.Wine className="wine-placeholder-large" />
                        )}
                    </div>
                    <div className="wine-detail-info">
                        <h2>{wine.name}</h2>
                        <p className="wine-subtitle">{wine.winery} • {wine.vintage}</p>
                        <div className="wine-tags">
                            <span className="wine-tag">{wine.country}</span>
                            <span className="wine-tag">{wine.region}</span>
                            <span className="wine-tag type-tag">{wine.type}</span>
                        </div>
                        <h4>Tasting Note</h4>
                        <p className="wine-description">{wine.description}</p>
                        <div className="tasting-section">
                            <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="tasted" />
                            <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="want" />
                        </div>
                        <div className="wine-detail-footer">
                            <span className="wine-price-xl">${wine.price}</span>
                            <span className="wine-score-xl">{wine.score} Points</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AI Assistant Component
const AIAssistant = ({ wines }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm Dr. Vinny, your AI sommelier. How can I help you explore the Top 100 wines?" }
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const currentInput = input;
        const userMessage = { role: 'user', content: currentInput };
        const newMessages = [...messages, userMessage];
        
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        trackEvent('ai_chat_message', { message_type: 'user' });

        const history = newMessages.slice(-6).map(msg => 
            `${msg.role === 'user' ? 'User' : 'Dr. Vinny'}: ${msg.content}`
        ).join('\n');

        const fullPrompt = `You are an expert AI Wine Sommelier for Wine Spectator named Dr. Vinny. 
        Your knowledge is strictly limited to the provided JSON data about the Top 100 wines. 
        Answer the user's question based on this data. Be friendly, helpful, and concise.
        
        Here is the full list of wines: 
        ${JSON.stringify(wines)}

        Here is the recent conversation history for context:
        ${history}
        
        Based on all this information, please provide a response to the user's latest message: "${currentInput}"`;

        try {
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const aiText = response.text();

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
            trackEvent('ai_chat_message', { message_type: 'assistant' });
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "I'm sorry, an error occurred with the API request. Please ensure your API key is valid and has no restrictions." 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    useEffect(() => {
        if (isOpen) {
            trackEvent('ai_assistant_opened');
        }
    }, [isOpen]);

    return (
        <Fragment>
            <button onClick={() => setIsOpen(!isOpen)} className="ai-assistant-btn">
                <img src={process.env.PUBLIC_URL + '/vinny.png'} alt="Dr. Vinny AI Sommelier" />
            </button>
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <h3>Dr. Vinny</h3>
                        <button onClick={() => setIsOpen(false)} className="ai-close-btn">
                            <Icons.X className="icon-small" />
                        </button>
                    </div>
                    <div className="ai-chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`ai-message ${message.role}`}>
                                <p dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
                            </div>
                        ))}
                        {isTyping && (
                            <div className="ai-message assistant">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="ai-chat-input">
                        <input 
                            type="text" 
                            placeholder="Ask about pairings, regions, etc..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyPress={handleKeyPress} 
                            disabled={isTyping} 
                        />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="/">
                    <img 
                        src={process.env.PUBLIC_URL + (scrolled ? '/logo-black.png' : '/logo.png')} 
                        alt="Wine Spectator Logo" 
                        className="navbar-logo"
                    />
                </a>
                <div className="navbar-menu">
                    <a href="#wines" className={scrolled ? 'nav-link-dark' : 'nav-link-light'}>Top 100</a>
                    <button className="btn-modern">Subscribe</button>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => (
    <section className="hero-modern">
        <div className="hero-overlay" />
        <video autoPlay loop muted playsInline className="hero-video">
            <source src={process.env.PUBLIC_URL + '/corks.mp4'} type="video/mp4" />
        </video>
        <div className="hero-content">
            <h1 className="hero-title stagger-in">
                <span className="hero-title-line">Top 100</span>
                <span className="hero-title-line">Wines of 2024</span>
            </h1>
            <p className="hero-subtitle stagger-in">A curated selection of the world's finest wines.</p>
            <a href="#wines" className="btn-modern btn-hero stagger-in">Explore The List</a>
        </div>
    </section>
);

const FilterBar = ({ filters, onFiltersChange, isCondensed, onViewChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const allTypes = [...new Set(wines.map(wine => wine.type))].filter(Boolean);
    const allCountries = [...new Set(wines.map(wine => wine.country))].filter(Boolean);
    
    const handleSearch = (value) => {
        setSearchTerm(value);
        onFiltersChange({ ...filters, search: value });
        
        if (value) {
            setTimeout(() => {
                const results = wines.filter(wine => 
                    wine.name.toLowerCase().includes(value.toLowerCase()) || 
                    wine.winery.toLowerCase().includes(value.toLowerCase())
                ).length;
                trackSearch(value, results);
            }, 500);
        }
    };

    const handleFilterChange = (filterType, value) => {
        onFiltersChange({ ...filters, [filterType]: value });
        trackFilterUse(filterType, value);
    };

    return (
        <div className="filter-bar">
            <div className="filter-row">
                <div className="search-container">
                    <Icons.Search className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search wines..." 
                        value={searchTerm} 
                        onChange={(e) => handleSearch(e.target.value)} 
                        className="search-input"
                    />
                </div>
                <div className="view-toggle">
                    <button 
                        onClick={() => { onViewChange(false); trackEvent('view_mode_changed', { mode: 'grid' }); }} 
                        className={!isCondensed ? 'view-btn active' : 'view-btn'}
                    >
                        <Icons.Grid className="view-icon" />
                    </button>
                    <button 
                        onClick={() => { onViewChange(true); trackEvent('view_mode_changed', { mode: 'list' }); }} 
                        className={isCondensed ? 'view-btn active' : 'view-btn'}
                    >
                        <Icons.List className="view-icon" />
                    </button>
                </div>
            </div>
            <div className="filter-section">
                <p className="filter-label">Wine Type</p>
                <div className="filter-buttons">
                    {['All', ...allTypes].map(type => (
                        <button 
                            key={type} 
                            onClick={() => handleFilterChange('type', type)} 
                            className={filters.type === type ? 'filter-btn active' : 'filter-btn'}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-section">
                <p className="filter-label">Country</p>
                <div className="filter-buttons">
                    {['All', ...allCountries].map(country => (
                        <button 
                            key={country} 
                            onClick={() => handleFilterChange('country', country)} 
                            className={filters.country === country ? 'filter-btn active' : 'filter-btn'}
                        >
                            {country}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-grid">
                <div className="footer-section">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Wine Spectator Logo" className="footer-logo" />
                    <p>Curating the world's finest wines since 1976.</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://twitter.com/WineSpectator" target="_blank" rel="noopener noreferrer" className="social-icon-container">
                            <img src={process.env.PUBLIC_URL + '/X.png'} alt="X Social Icon" className="social-icon" />
                        </a>
                        <a href="https://facebook.com/WineSpectator" target="_blank" rel="noopener noreferrer" className="social-icon-container">
                            <img src={process.env.PUBLIC_URL + '/FB.png'} alt="Facebook Social Icon" className="social-icon" />
                        </a>
                        <a href="https://instagram.com/winespectator" target="_blank" rel="noopener noreferrer" className="social-icon-container">
                            <img src={process.env.PUBLIC_URL + '/IG.png'} alt="Instagram Social Icon" className="social-icon" />
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="https://www.wine.com" target="_blank" rel="noopener noreferrer">Wine.com</a></li>
                        <li><a href="https://www.winespectator.com/vintage-charts" target="_blank" rel="noopener noreferrer">Vintage Charts</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Stay Updated</h4>
                    <p>Subscribe to our newsletter.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email" />
                        <button className="btn-modern btn-newsletter">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Wine Spectator. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const App = () => {
    const [selectedWine, setSelectedWine] = useState(null);
    const [filters, setFilters] = useState({ search: '', type: 'All', country: 'All' });
    const [isCondensed, setIsCondensed] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [tastingRecord, setTastingRecord] = useState(() => {
        try {
            const savedRecord = localStorage.getItem('tastingRecord');
            return savedRecord ? JSON.parse(savedRecord) : {};
        } catch (error) {
            return {};
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const winesPerPage = 12;

    // Initialize
    useEffect(() => {
        // Check if welcome popup should be shown
        const hidePopup = localStorage.getItem('hideWelcomePopup');
        if (!hidePopup) {
            setShowWelcomePopup(true);
        }

        // Track page view
        trackEvent('page_view', { page_title: 'Wine Top 100' });
    }, []);

    useEffect(() => {
        localStorage.setItem('tastingRecord', JSON.stringify(tastingRecord));
    }, [tastingRecord]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const handleTasteChange = (wineId, status) => {
        const wine = wines.find(w => w.id === wineId);
        if (wine && status) {
            trackTastingAction(wine, status);
        }
        
        setTastingRecord(prevRecord => {
            const newRecord = { ...prevRecord };
            if (status === null) {
                delete newRecord[wineId];
            } else {
                newRecord[wineId] = status;
            }
            return newRecord;
        });
    };

    useScrollAnimation();

    const filteredWines = useMemo(() => {
        return wines.filter(wine => {
            const matchesSearch = !filters.search || 
                wine.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                (wine.winery && wine.winery.toLowerCase().includes(filters.search.toLowerCase()));
            const matchesType = filters.type === 'All' || wine.type === filters.type;
            const matchesCountry = filters.country === 'All' || wine.country === filters.country;
            return matchesSearch && matchesType && matchesCountry;
        });
    }, [filters]);

    const indexOfLastWine = currentPage * winesPerPage;
    const indexOfFirstWine = indexOfLastWine - winesPerPage;
    const currentWines = filteredWines.slice(indexOfFirstWine, indexOfLastWine);
    
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        const wineListElement = document.getElementById('wine-list-container');
        if (wineListElement) {
            const elementTop = wineListElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementTop - 100, behavior: 'smooth' });
        }
        trackEvent('pagination_used', { page: pageNumber });
    };

    return (
        <Fragment>
            <Navigation />
            <Hero />
            <main>
                <section id="wines" className="wines-section">
                    <div className="container">
                        <TastingRecordSummary tastingRecord={tastingRecord} wines={wines} />
                        <div className="section-header reveal">
                            <h2>The Collection</h2>
                            <p>Discover extraordinary wines from renowned vineyards</p>
                        </div>
                        <FilterBar 
                            filters={filters} 
                            onFiltersChange={setFilters} 
                            isCondensed={isCondensed} 
                            onViewChange={setIsCondensed} 
                        />
                        <div id="wine-list-container" className="wine-list-container">
                            {isCondensed ? (
                                <div className="wine-list-condensed">
                                    {currentWines.map((wine) => (
                                        <WineCard 
                                            key={wine.id} 
                                            wine={wine} 
                                            onSelect={setSelectedWine} 
                                            isCondensed={true} 
                                            tastingRecord={tastingRecord} 
                                            onTasteChange={handleTasteChange} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="wine-grid">
                                    {currentWines.map((wine) => (
                                        <WineCard 
                                            key={wine.id} 
                                            wine={wine} 
                                            onSelect={setSelectedWine} 
                                            isCondensed={false} 
                                            tastingRecord={tastingRecord} 
                                            onTasteChange={handleTasteChange} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <Pagination 
                            winesPerPage={winesPerPage} 
                            totalWines={filteredWines.length} 
                            paginate={paginate} 
                            currentPage={currentPage} 
                        />
                    </div>
                </section>
            </main>
            <Footer />
            <WineDetailModal 
                wine={selectedWine} 
                isOpen={!!selectedWine} 
                onClose={() => setSelectedWine(null)} 
                tastingRecord={tastingRecord} 
                onTasteChange={handleTasteChange} 
            />
            <AIAssistant wines={wines} />
            <WelcomePopup 
                isOpen={showWelcomePopup} 
                onClose={() => setShowWelcomePopup(false)} 
            />
        </Fragment>
    );
};

export default App;
