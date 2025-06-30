const { useState, useMemo, useEffect, useRef } = React;

const wines = [
    {id: 1, rank: 1, name: "Château Margaux 2020", winery: "Château Margaux", varietal: "Cabernet Sauvignon Blend", vintage: 2020, region: "Margaux", country: "France", type: "Red", score: 100, price: 1200, servingTemp: "16-18°C", description: "A perfect wine showcasing the incredible terroir of Margaux.", tastingNotes: "Blackcurrant, violets, graphite, cedar, and truffle notes with silky tannins.", alcoholContent: 13.5, decantTime: "2 hours", drinkWindow: "2025-2070", production: 12000, blend: "65% Cabernet Sauvignon, 20% Merlot, 10% Cabernet Franc, 5% Petit Verdot", editorNote: "This is why Margaux remains one of Bordeaux's most prestigious appellations."},
    {id: 2, rank: 2, name: "Domaine de la Romanée-Conti La Tâche 2019", winery: "Domaine de la Romanée-Conti", varietal: "Pinot Noir", vintage: 2019, region: "Burgundy", country: "France", type: "Red", score: 99, price: 8500, servingTemp: "14-16°C", description: "The pinnacle of Pinot Noir from one of Burgundy's most prestigious vineyards.", tastingNotes: "Wild strawberry, rose petals, exotic spices, and earth with incredible finesse.", alcoholContent: 13.0, decantTime: "1 hour", drinkWindow: "2024-2060", production: 1500, blend: "100% Pinot Noir", editorNote: "A transcendent wine that justifies its legendary status."},
    {id: 3, rank: 3, name: "Tenuta San Guido Sassicaia 2019", winery: "Tenuta San Guido", varietal: "Cabernet Sauvignon", vintage: 2019, region: "Tuscany", country: "Italy", type: "Red", score: 98, price: 450, servingTemp: "16-18°C", description: "The original Super Tuscan continues to impress.", tastingNotes: "Cassis, Mediterranean herbs, tobacco, and graphite.", alcoholContent: 14.0, decantTime: "2 hours", drinkWindow: "2023-2050", production: 15000, blend: "85% Cabernet Sauvignon, 15% Cabernet Franc", editorNote: "Still Italy's most influential wine after all these years."},
    {id: 4, rank: 4, name: "Egon Müller Scharzhofberger Riesling Auslese 2020", winery: "Egon Müller", varietal: "Riesling", vintage: 2020, region: "Mosel", country: "Germany", type: "White", score: 98, price: 650, servingTemp: "8-10°C", description: "A legendary Riesling producer crafts another masterpiece.", tastingNotes: "Peach, apricot, honey, slate minerality with perfect sweet-acid balance.", alcoholContent: 8.5, decantTime: "No decanting needed", drinkWindow: "2023-2060", production: 3000, blend: "100% Riesling", editorNote: "The gold standard for German Riesling Auslese."},
    {id: 5, rank: 5, name: "Penfolds Grange 2018", winery: "Penfolds", varietal: "Shiraz", vintage: 2018, region: "South Australia", country: "Australia", type: "Red", score: 97, price: 850, servingTemp: "16-18°C", description: "Australia's most celebrated wine continues its legacy.", tastingNotes: "Blackberry, chocolate, vanilla, and pepper with massive structure.", alcoholContent: 14.5, decantTime: "3 hours", drinkWindow: "2025-2055", production: 8000, blend: "98% Shiraz, 2% Cabernet Sauvignon", editorNote: "An Australian icon that never disappoints."},
    {id: 6, rank: 6, name: "Opus One 2019", winery: "Opus One", varietal: "Cabernet Sauvignon Blend", vintage: 2019, region: "Napa Valley", country: "USA", type: "Red", score: 97, price: 400, servingTemp: "16-18°C", description: "The iconic Napa Valley collaboration delivers another stunning vintage.", tastingNotes: "Black cherry, cassis, mocha, and herbs with velvety texture.", alcoholContent: 14.5, decantTime: "2 hours", drinkWindow: "2024-2045", production: 25000, blend: "80% Cabernet Sauvignon, 8% Merlot, 6% Petit Verdot, 5% Cabernet Franc, 1% Malbec", editorNote: "The partnership that changed Napa Valley forever."},
    {id: 7, rank: 7, name: "Domaine Leflaive Montrachet Grand Cru 2020", winery: "Domaine Leflaive", varietal: "Chardonnay", vintage: 2020, region: "Burgundy", country: "France", type: "White", score: 97, price: 2800, servingTemp: "10-12°C", description: "The pinnacle of white Burgundy from one of the region's top producers.", tastingNotes: "Citrus, white flowers, hazelnuts, and wet stones.", alcoholContent: 13.5, decantTime: "30 minutes", drinkWindow: "2024-2040", production: 800, blend: "100% Chardonnay", editorNote: "Montrachet at its most sublime."},
    {id: 8, rank: 8, name: "Vega Sicilia Único 2011", winery: "Vega Sicilia", varietal: "Tempranillo Blend", vintage: 2011, region: "Ribera del Duero", country: "Spain", type: "Red", score: 96, price: 550, servingTemp: "16-18°C", description: "Spain's most prestigious wine showcases aged Tempranillo.", tastingNotes: "Black cherry, cedar, tobacco, leather, and spices.", alcoholContent: 14.0, decantTime: "3 hours", drinkWindow: "2023-2045", production: 5000, blend: "95% Tempranillo, 5% Cabernet Sauvignon", editorNote: "Spain's answer to the great wines of Bordeaux."},
    {id: 9, rank: 9, name: "Château Le Pin 2019", winery: "Château Le Pin", varietal: "Merlot", vintage: 2019, region: "Pomerol", country: "France", type: "Red", score: 96, price: 4500, servingTemp: "16-18°C", description: "The cult Pomerol continues to enchant.", tastingNotes: "Black cherry, plum, truffle, mocha, and exotic spices.", alcoholContent: 14.0, decantTime: "1 hour", drinkWindow: "2025-2050", production: 600, blend: "100% Merlot", editorNote: "Pomerol's most seductive wine."},
    {id: 10, rank: 10, name: "Kistler Chardonnay Vine Hill Vineyard 2020", winery: "Kistler Vineyards", varietal: "Chardonnay", vintage: 2020, region: "Russian River Valley", country: "USA", type: "White", score: 96, price: 150, servingTemp: "10-12°C", description: "California Chardonnay at its finest.", tastingNotes: "Meyer lemon, white peach, brioche, and mineral notes.", alcoholContent: 14.2, decantTime: "No decanting needed", drinkWindow: "2023-2035", production: 1200, blend: "100% Chardonnay", editorNote: "California Chardonnay with a Burgundian soul."},
    {id: 11, rank: 11, name: "Scarecrow Cabernet Sauvignon 2019", winery: "Scarecrow", varietal: "Cabernet Sauvignon", vintage: 2019, region: "Rutherford", country: "USA", type: "Red", score: 95, price: 500, servingTemp: "16-18°C", description: "Cult Napa Cabernet from the historic J.J. Cohn Estate.", tastingNotes: "Blackcurrant, graphite, dark chocolate, and Rutherford dust.", alcoholContent: 14.8, decantTime: "2 hours", drinkWindow: "2024-2040", production: 2000, blend: "100% Cabernet Sauvignon", editorNote: "Rutherford terroir at its most expressive."},
    {id: 12, rank: 12, name: "Bollinger La Grande Année 2012", winery: "Bollinger", varietal: "Champagne Blend", vintage: 2012, region: "Champagne", country: "France", type: "Sparkling", score: 95, price: 200, servingTemp: "6-8°C", description: "Exceptional vintage Champagne showing incredible depth.", tastingNotes: "Brioche, honey, citrus, and toasted almonds.", alcoholContent: 12.0, decantTime: "No decanting needed", drinkWindow: "2023-2035", production: 30000, blend: "65% Pinot Noir, 35% Chardonnay", editorNote: "2012 was a legendary vintage in Champagne."}
];

const X = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Search = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Filter = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const Share = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.658a3 3 0 10-5.367-2.684L8.683 15.5m0 0a3 3 0 10-5.367 2.684L8.683 15.5m9.632-4.658L8.683 8.5" />
    </svg>
);

const Thermometer = ({ className = "h-4 w-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5V6a3 3 0 116 0v5.5m-7.5 5.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" />
        <circle cx="12" cy="17" r="2" fill="currentColor"/>
    </svg>
);

const WineGlass = ({ className = "h-16 w-16" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="black">
        <path d="M8 2h8l1.5 9c0 2.5-2 4.5-4.5 4.5S8.5 13.5 8.5 11L8 2zM12 16v6m-3 0h6" stroke="black" strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="8" rx="3.5" ry="2" fill="black" opacity="0.3"/>
    </svg>
);

const Bot = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <circle cx="9" cy="9" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
    </svg>
);

const WineGlassPlaceholder = ({ className = "" }) => (
    <div className={`wine-glass-placeholder ${className}`}>
        <WineGlass />
    </div>
);

const initializeTastingData = () => {
    const stored = localStorage.getItem('wineTastings');
    return stored ? JSON.parse(stored) : { tasted: [], wantToTaste: [] };
};

const MultiSelect = ({ options, selected, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-3 py-2 text-left border rounded focus:outline-none sans-font text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700">{selected.length > 0 ? `${selected.length} selected` : placeholder}</span>
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded shadow-lg dropdown-content">
                    {options.map(option => (
                        <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer sans-font text-sm">
                            <input type="checkbox" checked={selected.includes(option)} onChange={() => {
                                if (selected.includes(option)) {
                                    onChange(selected.filter(item => item !== option));
                                } else {
                                    onChange([...selected, option]);
                                }
                            }} className="mr-2" />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const AIAssistant = ({ wines }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getRecommendation = async () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        // In a real app, you'd call a backend. Here we simulate it.
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            const lowerQuery = query.toLowerCase();
            let suggestedWines = [];

            if (lowerQuery.includes("steak") || (lowerQuery.includes("red") && lowerQuery.includes("under $500"))) {
                suggestedWines.push(wines.find(w => w.name.includes("Sassicaia")));
            } else if (lowerQuery.includes("celebrating") || lowerQuery.includes("sparkling")) {
                suggestedWines.push(wines.find(w => w.type === "Sparkling"));
            } else {
                 suggestedWines.push(wines[Math.floor(Math.random() * wines.length)]);
            }
            
            const bestPick = suggestedWines.filter(Boolean)[0];
            
            if (bestPick) {
                 setRecommendation(`Based on your query, the ${bestPick.name} seems like an excellent choice. It's a ${bestPick.type} from ${bestPick.region} with a score of ${bestPick.score}, known for its notes of ${bestPick.tastingNotes.split(',')[0]} and ${bestPick.tastingNotes.split(',')[1]}.`);
            } else {
                 setRecommendation("I couldn't find a perfect match, but for a truly special occasion, you can never go wrong with a classic like the Château Margaux 2020.");
            }
        } catch (error) {
            setRecommendation("I'd be happy to help you find the perfect wine! For personalized recommendations based on your preferences, try describing what you're looking for - whether it's a specific food pairing, price range, or flavor profile.");
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-40">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="ai-assistant p-4 rounded-full shadow-lg text-white hover:scale-105 transition-transform"
                >
                    <Bot className="h-8 w-8" />
                </button>
            )}
            
            {isOpen && (
                <div className="bg-white rounded-lg shadow-2xl w-96 animate-fade-in">
                    <div className="ai-assistant p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            Wine Spectator AI Assistant
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    
                    <div className="p-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Ask me for wine recommendations based on your preferences, food pairings, or occasions!
                        </p>
                        
                        <div className="space-y-4">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="E.g., 'I need a red wine under $500 for a steak dinner' or 'What's a good wine for celebrating?'"
                                className="w-full p-3 border rounded-lg resize-none sans-font text-sm"
                                rows="3"
                            />
                            
                            <button
                                onClick={getRecommendation}
                                disabled={isLoading || !query.trim()}
                                className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-900 disabled:bg-gray-400 sans-font"
                            >
                                {isLoading ? 'Getting recommendation...' : 'Get Recommendation'}
                            </button>
                            
                            {recommendation && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-700">{recommendation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const WineCard = ({ wine, onViewDetails, tastingData, onTastingChange }) => {
    const getRankBadgeClass = (rank) => {
        if (rank === 1) return 'rank-gold';
        if (rank === 2) return 'rank-silver';
        if (rank === 3) return 'rank-bronze';
        return 'bg-red-800';
    };

    return (
        <div className="wine-card rounded overflow-hidden animate-fade-in">
            <div className="wine-card-content cursor-pointer" onClick={() => onViewDetails(wine)}>
                <div className="relative overflow-hidden">
                    <WineGlassPlaceholder className="w-full h-48" />
                    <div className={`absolute top-3 left-3 ${getRankBadgeClass(wine.rank)} text-white px-3 py-1 rounded text-sm font-bold shadow-lg`}>
                        #{wine.rank}
                    </div>
                    <div className="absolute top-3 right-3 bg-white text-red-800 px-3 py-1 rounded text-sm font-bold shadow-lg">
                        {wine.score}
                    </div>
                </div>
                <div className="p-5 wine-card-details">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-gray-900">{wine.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{wine.winery}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">{wine.vintage} • {wine.varietal}</div>
                        <div className="text-sm text-gray-500">{wine.region}, {wine.country}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Thermometer className="h-4 w-4 text-red-800" />
                            <span>Serve at {wine.servingTemp}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                            <span className="text-lg font-bold text-red-800">${wine.price}</span>
                            <span className="text-sm text-gray-500">{wine.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 pb-5 space-y-2 border-t pt-3">
                <label className="flex items-center gap-2 cursor-pointer sans-font text-sm">
                    <input type="checkbox" checked={tastingData.tasted.includes(wine.id)} onChange={(e) => {
                        e.stopPropagation();
                        onTastingChange(wine.id, 'tasted', e.target.checked);
                    }} className="custom-checkbox" />
                    <span className="text-gray-700">I have tasted this wine</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer sans-font text-sm">
                    <input type="checkbox" checked={tastingData.wantToTaste.includes(wine.id)} onChange={(e) => {
                        e.stopPropagation();
                        onTastingChange(wine.id, 'wantToTaste', e.target.checked);
                    }} className="custom-checkbox" />
                    <span className="text-gray-700">I want to taste this wine</span>
                </label>
            </div>
        </div>
    );
};

const WineFilters = ({ filters, onFiltersChange, sortBy, onSortChange, totalWines, filteredCount }) => {
    const uniqueCountries = [...new Set(wines.map(w => w.country))].sort();
    const uniqueTypes = [...new Set(wines.map(w => w.type))].sort();
    const uniqueVintages = [...new Set(wines.map(w => w.vintage.toString()))].sort().reverse();

    const activeFilters = [];
    if (filters.type.length > 0) activeFilters.push(...filters.type.map(t => ({ type: 'type', value: t })));
    if (filters.country.length > 0) activeFilters.push(...filters.country.map(c => ({ type: 'country', value: c })));
    if (filters.vintage.length > 0) activeFilters.push(...filters.vintage.map(v => ({ type: 'vintage', value: v })));

    return (
        <div className="bg-white rounded shadow-sm p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-red-800" />
                    <h2 className="text-2xl font-bold text-gray-900">Explore the Top 100</h2>
                </div>
                <div className="text-sm text-gray-600 sans-font">
                    Showing <span className="font-bold text-red-800">{filteredCount}</span> of {totalWines} wines
                </div>
            </div>
            {activeFilters.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                        <div key={`${filter.type}-${filter.value}-${index}`} className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-2 sans-font">
                            <span className="text-gray-700">{filter.value}</span>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                const newFilters = { ...filters };
                                newFilters[filter.type] = newFilters[filter.type].filter(v => v !== filter.value);
                                onFiltersChange(newFilters);
                            }} className="hover:text-red-800">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <button onClick={() => onFiltersChange({
                        search: '',
                        type: [],
                        country: [],
                        region: [],
                        priceRange: [0, 20000],
                        scoreRange: [0, 100],
                        vintage: []
                    })} className="text-sm text-gray-500 hover:text-gray-700 sans-font">
                        Clear all
                    </button>
                </div>
            )}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Search wines, wineries, regions, varietals..." className="w-full pl-10 pr-4 py-3 border rounded focus:outline-none sans-font" value={filters.search} onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sans-font">Wine Type</label>
                    <MultiSelect options={uniqueTypes} selected={filters.type} onChange={(value) => onFiltersChange({ ...filters, type: value })} placeholder="All Types" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sans-font">Country</label>
                    <MultiSelect options={uniqueCountries} selected={filters.country} onChange={(value) => onFiltersChange({ ...filters, country: value })} placeholder="All Countries" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sans-font">Vintage</label>
                    <MultiSelect options={uniqueVintages} selected={filters.vintage} onChange={(value) => onFiltersChange({ ...filters, vintage: value })} placeholder="All Vintages" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sans-font">Sort By</label>
                    <select className="w-full px-3 py-2 border rounded focus:outline-none sans-font text-sm" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                        <option value="rank">Rank</option>
                        <option value="score-desc">Score (High to Low)</option>
                        <option value="score-asc">Score (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="vintage-desc">Vintage (Newest)</option>
                        <option value="vintage-asc">Vintage (Oldest)</option>
                        <option value="name">Name (A-Z)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const WineDetailModal = ({ wine, isOpen, onClose, tastingData, onTastingChange }) => {
    const [activeTab, setActiveTab] = useState('overview');
    if (!wine || !isOpen) return null;

    const getRankBadgeClass = (rank) => {
        if (rank === 1) return 'rank-gold';
        if (rank === 2) return 'rank-silver';
        if (rank === 3) return 'rank-bronze';
        return 'bg-red-800';
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                <div className="modal-backdrop fixed inset-0 transition-opacity" onClick={onClose}></div>
                <div className="relative inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded">
                    <div className="relative h-80 overflow-hidden">
                        <WineGlassPlaceholder className="w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30">
                            <X className="h-6 w-6 text-white" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`${getRankBadgeClass(wine.rank)} text-white px-4 py-2 rounded text-lg font-bold`}>#{wine.rank}</div>
                                        <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded text-lg font-bold">{wine.score} pts</div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{wine.name}</h2>
                                    <p className="text-xl text-white/90">{wine.winery}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold text-white">${wine.price}</div>
                                    <div className="text-white/80">per bottle</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-b space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer sans-font text-sm">
                            <input type="checkbox" checked={tastingData.tasted.includes(wine.id)} onChange={(e) => onTastingChange(wine.id, 'tasted', e.target.checked)} />
                            <span className="text-gray-700">I have tasted this wine</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer sans-font text-sm">
                            <input type="checkbox" checked={tastingData.wantToTaste.includes(wine.id)} onChange={(e) => onTastingChange(wine.id, 'wantToTaste', e.target.checked)} />
                            <span className="text-gray-700">I want to taste this wine</span>
                        </label>
                    </div>
                    <div className="border-b">
                        <div className="flex">
                            {['overview', 'details', 'editor note'].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-medium capitalize sans-font ${activeTab === tab ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-600 hover:text-gray-900'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{wine.description}</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded p-4">
                                        <div className="text-sm text-gray-500 mb-1 sans-font">Vintage</div>
                                        <div className="font-bold text-gray-900">{wine.vintage}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded p-4">
                                        <div className="text-sm text-gray-500 mb-1 sans-font">Type</div>
                                        <div className="font-bold text-gray-900">{wine.type}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded p-4">
                                        <div className="text-sm text-gray-500 mb-1 sans-font">Region</div>
                                        <div className="font-bold text-gray-900">{wine.region}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded p-4">
                                        <div className="text-sm text-gray-500 mb-1 sans-font">Country</div>
                                        <div className="font-bold text-gray-900">{wine.country}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tasting Notes</h3>
                                    <p className="text-gray-700 leading-relaxed">{wine.tastingNotes}</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'details' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Wine Details</h4>
                                        <dl className="space-y-2">
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600">Varietal</dt>
                                                <dd className="font-medium text-gray-900">{wine.varietal}</dd>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600">Alcohol Content</dt>
                                                <dd className="font-medium text-gray-900">{wine.alcoholContent}%</dd>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600">Production</dt>
                                                <dd className="font-medium text-gray-900">{wine.production.toLocaleString()} cases</dd>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600">Drink Window</dt>
                                                <dd className="font-medium text-gray-900">{wine.drinkWindow}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Serving Suggestions</h4>
                                        <dl className="space-y-2">
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600 flex items-center gap-2">
                                                    <Thermometer className="h-4 w-4 text-red-800" />
                                                    Serving Temp
                                                </dt>
                                                <dd className="font-medium text-gray-900">{wine.servingTemp}</dd>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <dt className="text-gray-600">Decanting</dt>
                                                <dd className="font-medium text-gray-900">{wine.decantTime}</dd>
                                            </div>
                                            <div className="py-2 border-b">
                                                <dt className="text-gray-600 mb-1">Blend Composition</dt>
                                                <dd className="font-medium text-gray-900 text-sm">{wine.blend}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'editor note' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-red-50 rounded p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Wine Spectator Editor's Note</h4>
                                    <p className="text-gray-700 leading-relaxed italic">"{wine.editorNote}"</p>
                                    <div className="mt-4 text-sm text-gray-600 sans-font">
                                        <p className="mb-2"><strong>Wine Spectator Score:</strong> {wine.score}/100</p>
                                        <p><strong>Value Rating:</strong> {wine.price < 100 ? 'Outstanding' : wine.price < 500 ? 'Excellent' : 'Collectible'}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Food Pairing Suggestions</h4>
                                    <p className="text-gray-700">
                                        {wine.type === 'Red' && 'Perfect with grilled meats, aged cheeses, and hearty stews.'}
                                        {wine.type === 'White' && 'Excellent with seafood, poultry, and light pasta dishes.'}
                                        {wine.type === 'Sparkling' && 'Ideal as an aperitif or with oysters, caviar, and celebrations.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalyticsDashboard = ({ wines }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && wines.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const countryData = wines.reduce((acc, wine) => {
                acc[wine.country] = (acc[wine.country] || 0) + 1;
                return acc;
            }, {});

            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(countryData),
                    datasets: [{
                        data: Object.values(countryData),
                        backgroundColor: ['#8c0004', '#a51e22', '#d4af37', '#cd7f32', '#c0c0c0', '#444444'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { padding: 15, font: { size: 12, family: 'Georgia, Times New Roman, serif' } }
                        }
                    }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [wines]);

    const typeRankings = wines.reduce((acc, wine) => {
        acc[wine.type] = (acc[wine.type] || 0) + 1;
        return acc;
    }, {});

    const sortedTypes = Object.entries(typeRankings).sort(([,a], [,b]) => b - a).map(([type, count]) => ({ type, count }));

    const vintageRankings = wines.reduce((acc, wine) => {
        acc[wine.vintage] = (acc[wine.vintage] || 0) + 1;
        return acc;
    }, {});

    const sortedVintages = Object.entries(vintageRankings).sort(([a], [b]) => b - a).slice(0, 5).map(([vintage, count]) => ({ vintage, count }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            <div className="bg-white rounded shadow-sm p-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Countries Represented</h3>
                <div style={{ height: '250px' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Wine Types in Top 100</h3>
                <div className="space-y-2">
                    {sortedTypes.map(({ type, count }, index) => (
                        <div key={type} className="flex items-center justify-between p-3 rounded bg-gray-50">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-red-800">#{index + 1}</span>
                                <span className="font-medium">{type}</span>
                            </div>
                            <span className="text-sm text-gray-600 sans-font">{count} wines</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vintages</h3>
                <div className="space-y-2">
                    {sortedVintages.map(({ vintage, count }, index) => (
                        <div key={vintage} className="flex items-center justify-between p-3 rounded bg-gray-50">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-red-800">#{index + 1}</span>
                                <span className="font-medium">{vintage}</span>
                            </div>
                            <span className="text-sm text-gray-600 sans-font">{count} wines</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TastingTracker = ({ tastingData }) => {
    return (
        <div className="bg-white rounded shadow-sm p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Have you tried any of these wines? Which would you like to drink?
            </h3>
            <p className="text-gray-600 mb-4">Track your Top 100 tasting record below.</p>
            <div className="flex justify-center gap-8 text-lg">
                <span className="text-blue-700">
                    I have tasted: <strong>{tastingData.tasted.length}</strong>
                </span>
                <span className="text-gray-500">—</span>
                <span className="text-blue-700">
                    I want to taste: <strong>{tastingData.wantToTaste.length}</strong>
                </span>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="footer-bg text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img src="https://i.ibb.co/27L2JKF/WSlogo-White.png" alt="Wine Spectator" className="h-12 mb-4" />
                        <p className="text-gray-400 text-sm">
                            The world's most influential wine magazine since 1976.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Wine Ratings</a></li>
                            <li><a href="#" className="hover:text-white">Wine Education</a></li>
                            <li><a href="#" className="hover:text-white">Events</a></li>
                            <li><a href="#" className="hover:text-white">Subscribe</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Vintage Charts</a></li>
                            <li><a href="#" className="hover:text-white">Wine Basics</a></li>
                            <li><a href="#" className="hover:text-white">Restaurant Awards</a></li>
                            <li><a href="#" className="hover:text-white">Wine Travel</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <p className="text-sm text-gray-400 mb-4">
                            Join our community of wine enthusiasts worldwide.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.163 6.162 6.163 3.403 0 6.162-2.76 6.162-6.163 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                                    <circle cx="18.406" cy="5.594" r="1.44"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
