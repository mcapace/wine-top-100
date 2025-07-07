import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import winesData from './wines-2024.json';

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
};

const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); } });
        }, { threshold: 0.1 });
        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));
        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);
};

const TastingCheckbox = ({ wineId, tastingRecord, onTasteChange, status }) => {
    const isChecked = tastingRecord[wineId] === status;
    const handleChange = () => onTasteChange(wineId, isChecked ? null : status);
    return (
        <label className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-gray-900">
            <input type="checkbox" checked={isChecked} onChange={handleChange} className="h-4 w-4 rounded bg-gray-200 border-gray-300 text-[#8c0004] focus:ring-[#8c0004] focus:ring-opacity-50" />
            <span>{status === 'tasted' ? 'I have tasted this' : 'I want to taste this'}</span>
        </label>
    );
};

const TastingRecordSummary = ({ tastingRecord }) => {
    const counts = useMemo(() => Object.values(tastingRecord).reduce((acc, status) => {
        if (status === 'tasted') acc.tasted += 1;
        if (status === 'want') acc.want += 1;
        return acc;
    }, { tasted: 0, want: 0 }), [tastingRecord]);

    return (
        <div className="bg-white border border-gray-200 shadow-sm py-4 px-6 text-center rounded-xl max-w-2xl mx-auto mb-16 reveal">
            <h3 className="text-xl text-gray-900 mb-2">Track Your Tasting Record</h3>
            <p className="text-lg">
                <span className="text-gray-900 font-bold">Tasted: </span><span className="text-[#8c0004] font-bold">{counts.tasted}</span>
                <span className="text-gray-400 mx-2">—</span>
                <span className="text-gray-900 font-bold">Want to Taste: </span><span className="text-[#8c0004] font-bold">{counts.want}</span>
            </p>
        </div>
    );
};

const Pagination = ({ winesPerPage, totalWines, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalWines / winesPerPage); i++) { pageNumbers.push(i); }
    if (pageNumbers.length <= 1) return null;
    return (
        <nav className="mt-12 py-8"><ul className="flex justify-center space-x-2">{pageNumbers.map(number => (
            <li key={number}><button onClick={() => paginate(number)} className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${currentPage === number ? 'bg-[#8c0004] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'}`}>{number}</button></li>
        ))}</ul></nav>
    );
};

const WineCard = ({ wine, onSelect, tastingRecord, onTasteChange, isCondensed }) => {
    const getRankColor = (rank) => {
        if (rank === 1) return 'bg-yellow-400 text-black';
        if (rank === 2) return 'bg-gray-300 text-black';
        if (rank === 3) return 'bg-orange-400 text-white';
        return 'bg-[#8c0004] text-white';
    };
    const getTypeColor = (type) => {
        const typeLower = (type || '').toLowerCase();
        if (typeLower.includes('red')) return 'bg-red-100 text-red-800';
        if (typeLower.includes('white')) return 'bg-yellow-100 text-yellow-800';
        if (typeLower.includes('sparkling')) return 'bg-blue-100 text-blue-800';
        if (typeLower.includes('rosé')) return 'bg-pink-100 text-pink-800';
        return 'bg-gray-100 text-gray-600';
    };

    if (isCondensed) {
        return (
            <div className="wine-card-condensed flex items-center gap-4 cursor-pointer" onClick={() => onSelect(wine)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${getRankColor(wine.rank)}`}>{wine.rank}</div>
                <div className="w-12 h-20 flex items-center justify-center flex-shrink-0"><img src={wine.image} alt={wine.name} className="h-full w-auto object-contain" /></div>
                <div className="flex-grow min-w-0"><h3 className="font-bold text-gray-900 truncate">{wine.name}</h3><p className="text-sm text-gray-500 truncate">{wine.winery}</p></div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                    <div className="text-right"><div className="text-lg font-bold text-gray-800">{wine.score}</div><div className="text-xs text-gray-500">points</div></div>
                    <div className="text-xl font-bold text-[#8c0004]">${wine.price}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="wine-card-modern group flex flex-col">
            <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(wine.rank)} z-10 shadow-lg`}>{wine.rank}</div>
            <div className="relative h-64 shrink-0 bg-gray-50 rounded-t-lg flex items-center justify-center p-4 cursor-pointer" onClick={() => onSelect(wine)}>
                {wine.image ? <img src={wine.image} alt={`Bottle of ${wine.name}`} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" /> : <Icons.Wine className="w-24 h-24 text-gray-300" />}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div>
                    <h3 className="h-24 text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8c0004] transition-colors duration-300 cursor-pointer" onClick={() => onSelect(wine)}>{wine.name}</h3>
                    <p className="h-12 text-gray-500 cursor-pointer" onClick={() => onSelect(wine)}>{wine.winery}</p>
                </div>
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mt-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{wine.vintage}</span><span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(wine.type)}`}>{wine.type}</span><span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{wine.region}</span></div>
                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-200"><TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="tasted" /><TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="want" /></div>
                    <div className="flex items-end justify-between pt-6 mt-4 border-t border-gray-200">
                        <div><span className="text-2xl font-bold text-gray-800">${wine.price}</span><span className="ml-4 text-lg text-gray-500">{wine.score} pts</span></div>
                        <button className="btn-modern text-sm" onClick={() => onSelect(wine)}>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WineDetailModal = ({ wine, isOpen, onClose, tastingRecord, onTasteChange }) => {
    if (!isOpen || !wine) return null;
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-50"><Icons.X className="w-6 h-6 text-gray-800" /></button>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 h-96"><img src={wine.image} alt={`Bottle of ${wine.name}`} className="max-h-full object-contain" /></div>
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{wine.name}</h2>
                        <p className="text-xl text-gray-500 mb-4">{wine.winery} • {wine.vintage}</p>
                        <div className="flex flex-wrap gap-2 mb-6"><span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">{wine.country}</span><span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">{wine.region}</span><span className={`px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800`}>{wine.type}</span></div>
                        <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Tasting Note</h4>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{wine.description}</p>
                        <div className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-200 mt-auto">
                            <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="tasted" />
                            <TastingCheckbox wineId={wine.id} tastingRecord={tastingRecord} onTasteChange={onTasteChange} status="want" />
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between"><span className="text-3xl font-bold text-[#8c0004]">${wine.price}</span><span className="text-xl text-gray-600 font-medium">{wine.score} Points</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AI Assistant Component (Final Conversational Version)
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

        // Create a concise history for context
        const history = newMessages.slice(-6).map(msg => `${msg.role === 'user' ? 'User' : 'Dr. Vinny'}: ${msg.content}`).join('\n');

        // Construct a single, self-contained prompt for each request
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
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, an error occurred with the API request. Please ensure your API key is valid and has no restrictions." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <Fragment>
            <button onClick={() => setIsOpen(!isOpen)} className="ai-assistant-btn">
                <img src={process.env.PUBLIC_URL + '/vinny.png'} alt="Dr. Vinny AI Sommelier" className="w-full h-full object-cover rounded-full" />
            </button>
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header flex items-center justify-between"><h3 className="text-gray-900 font-semibold">Dr. Vinny</h3><button onClick={() => setIsOpen(false)} className="p-1"><Icons.X className="w-5 h-5 text-gray-500" /></button></div>
                    <div className="ai-chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`ai-message ${message.role}`}>
                                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
                            </div>
                        ))}
                        {isTyping && (
                            <div className="ai-message assistant">
                                <div className="flex gap-1 items-center justify-center p-2">
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="ai-chat-input">
                        <input type="text" placeholder="Ask about pairings, regions, etc..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isTyping} />
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
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                <a href="#"><img src={process.env.PUBLIC_URL + '/logo-black.png'} alt="Wine Spectator Logo" className="h-8 md:h-10" /></a>
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <a href="#wines" className="hover:text-[#8c0004] transition-colors">Top 100</a>
                    <a href="#about" className="hover:text-[#8c0004] transition-colors">About</a>
                    <button className="btn-modern">Subscribe</button>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => (
    <section className="hero-modern">
        <div className="hero-overlay" />
        <video autoPlay loop muted playsInline className="hero-video"><source src={process.env.PUBLIC_URL + '/hero.mp4'} type="video/mp4" /></video>
        <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 stagger-in" style={{ textShadow: '0 3px 15px rgba(0,0,0,0.5)' }}>
                <span className="block">Top 100</span>
                <span className="block">Wines of 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 stagger-in" style={{ animationDelay: '0.2s', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>A curated selection of the world's finest wines.</p>
            <a href="#wines" className="btn-modern inline-block stagger-in" style={{ animationDelay: '0.4s' }}>Explore The List</a>
        </div>
    </section>
);

const FilterBar = ({ filters, onFiltersChange, isCondensed, onViewChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const allTypes = [...new Set(wines.map(wine => wine.type))].filter(Boolean);
    const allCountries = [...new Set(wines.map(wine => wine.country))].filter(Boolean);
    return (
        <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-gray-200 mb-12 sticky top-20 z-20 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search wines..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); onFiltersChange({ ...filters, search: e.target.value });}} className="w-full pl-12 pr-4 py-3 bg-gray-100 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c0004]"/>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onViewChange(false)} className={`p-3 rounded-lg transition-all ${!isCondensed ? 'bg-[#8c0004] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}><Icons.Grid className="w-5 h-5" /></button>
                    <button onClick={() => onViewChange(true)} className={`p-3 rounded-lg transition-all ${isCondensed ? 'bg-[#8c0004] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}><Icons.List className="w-5 h-5" /></button>
                </div>
            </div>
            <div className="mt-4"><p className="text-gray-600 text-sm mb-2 font-medium">Wine Type</p><div className="flex flex-wrap gap-2">{['All', ...allTypes].map(type => (<button key={type} onClick={() => onFiltersChange({ ...filters, type })} className={`px-3 py-1 text-sm rounded-lg ${filters.type === type ? 'bg-[#8c0004] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{type}</button>))}</div></div>
            <div className="mt-4"><p className="text-gray-600 text-sm mb-2 font-medium">Country</p><div className="flex flex-wrap gap-2">{['All', ...allCountries].map(country => (<button key={country} onClick={() => onFiltersChange({ ...filters, country })} className={`px-3 py-1 text-sm rounded-lg ${filters.country === country ? 'bg-[#8c0004] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{country}</button>))}</div></div>
        </div>
    );
};

const Footer = () => (
    <footer className="py-12 px-6 bg-[#8c0004] text-red-100">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="space-y-4">
                     <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Wine Spectator Logo" className="h-8" />
                    <p>Curating the world's finest wines since 1976.</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:opacity-80"><img src={process.env.PUBLIC_URL + '/X.png'} alt="X Social Icon" className="h-6 w-6" /></a>
                        <a href="#" className="hover:opacity-80"><img src={process.env.PUBLIC_URL + '/FB.png'} alt="Facebook Social Icon" className="h-6 w-6" /></a>
                        <a href="#" className="hover:opacity-80"><img src={process.env.PUBLIC_URL + '/IG.png'} alt="Instagram Social Icon" className="h-6 w-6" /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Wine.com</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Vintage Charts</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                    <p className="mb-4">Subscribe to our newsletter.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-white/20 border-white/30 rounded-l-md text-white placeholder-red-100 focus:outline-none focus:ring-2 focus:ring-white" />
                        <button className="btn-modern bg-black/20 rounded-l-none">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-white/20 text-center">
                <p>© {new Date().getFullYear()} Wine Spectator. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const App = () => {
    const [selectedWine, setSelectedWine] = useState(null);
    const [filters, setFilters] = useState({ search: '', type: 'All', country: 'All' });
    const [isCondensed, setIsCondensed] = useState(false);
    const [tastingRecord, setTastingRecord] = useState(() => {
        try { const savedRecord = localStorage.getItem('tastingRecord'); return savedRecord ? JSON.parse(savedRecord) : {}; } catch (error) { return {}; }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const winesPerPage = 12;

    useEffect(() => { localStorage.setItem('tastingRecord', JSON.stringify(tastingRecord)); }, [tastingRecord]);
    
    useEffect(() => { setCurrentPage(1); }, [filters]);

    const handleTasteChange = (wineId, status) => {
        setTastingRecord(prevRecord => {
            const newRecord = { ...prevRecord };
            if (status === null) { delete newRecord[wineId]; } else { newRecord[wineId] = status; }
            return newRecord;
        });
    };

    useScrollAnimation();

    const filteredWines = useMemo(() => wines.filter(wine => {
        const matchesSearch = !filters.search || wine.name.toLowerCase().includes(filters.search.toLowerCase()) || (wine.winery && wine.winery.toLowerCase().includes(filters.search.toLowerCase()));
        const matchesType = filters.type === 'All' || wine.type === filters.type;
        const matchesCountry = filters.country === 'All' || wine.country === filters.country;
        return matchesSearch && matchesType && matchesCountry;
    }), [filters]);

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
    };

    return (
        <Fragment>
            <Navigation />
            <Hero />
            <main>
                <section id="wines" className="py-20 px-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <TastingRecordSummary tastingRecord={tastingRecord} />
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Collection</h2>
                            <p className="text-xl text-gray-600">Discover extraordinary wines from renowned vineyards</p>
                        </div>
                        <FilterBar filters={filters} onFiltersChange={setFilters} isCondensed={isCondensed} onViewChange={setIsCondensed} />
                        <div id="wine-list-container" className="mt-8">
                            {isCondensed ? (
                                <div className="space-y-2">
                                    {currentWines.map((wine, index) => (
                                        <WineCard key={wine.id} wine={wine} onSelect={setSelectedWine} isCondensed={true} tastingRecord={tastingRecord} onTasteChange={handleTasteChange} />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentWines.map((wine, index) => (
                                        <WineCard key={wine.id} wine={wine} onSelect={setSelectedWine} isCondensed={false} tastingRecord={tastingRecord} onTasteChange={handleTasteChange} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <Pagination winesPerPage={winesPerPage} totalWines={filteredWines.length} paginate={paginate} currentPage={currentPage} />
                    </div>
                </section>
                <section id="about" className="py-20 px-6 bg-white text-center">
                    <div className="max-w-4xl mx-auto reveal">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Wine Spectator</h2>
                        <p className="text-xl text-gray-600 leading-relaxed">For over 40 years, Wine Spectator has been the world's leading authority on wine. Our expert tasters review more than 15,000 wines each year, helping you discover the perfect bottle for any occasion.</p>
                    </div>
                </section>
            </main>
            <Footer />
            <WineDetailModal wine={selectedWine} isOpen={!!selectedWine} onClose={() => setSelectedWine(null)} tastingRecord={tastingRecord} onTasteChange={handleTasteChange} />
            <AIAssistant wines={wines} />
        </Fragment>
    );
};

export default App;