import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import * as THREE from 'three';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Enhanced Wine Data with Modern Properties
const wines = [
    {
        id: 1, 
        rank: 1, 
        name: "Château Margaux 2020", 
        winery: "Château Margaux", 
        varietal: "Cabernet Sauvignon Blend", 
        vintage: 2020, 
        region: "Margaux", 
        country: "France", 
        type: "Red", 
        score: 100, 
        price: 1200, 
        image: "https://images.vivino.com/thumbs/xA7jQHfQRS6JKMa2Jt-qdg_pb_x600.png",
        servingTemp: "16-18°C", 
        description: "A perfect wine showcasing the incredible terroir of Margaux.", 
        tastingNotes: {
            primary: ["Blackcurrant", "Violets", "Graphite"],
            secondary: ["Cedar", "Truffle", "Tobacco"],
            finish: "Silky tannins with exceptional length"
        },
        color: "#722F37",
        characteristics: {
            body: 5,
            tannins: 4,
            acidity: 3,
            alcohol: 3,
            complexity: 5
        }
    },
    {
        id: 2,
        rank: 2,
        name: "Domaine de la Romanée-Conti La Tâche 2019",
        winery: "Domaine de la Romanée-Conti",
        varietal: "Pinot Noir",
        vintage: 2019,
        region: "Burgundy",
        country: "France",
        type: "Red",
        score: 99,
        price: 8500,
        servingTemp: "14-16°C",
        description: "The pinnacle of Pinot Noir from one of Burgundy's most prestigious vineyards.",
        tastingNotes: {
            primary: ["Wild strawberry", "Rose petals", "Cherry"],
            secondary: ["Exotic spices", "Forest floor", "Mushroom"],
            finish: "Incredible finesse with ethereal texture"
        },
        color: "#8B0000",
        characteristics: {
            body: 3,
            tannins: 2,
            acidity: 4,
            alcohol: 3,
            complexity: 5
        }
    },
    {
        id: 3,
        rank: 3,
        name: "Tenuta San Guido Sassicaia 2019",
        winery: "Tenuta San Guido",
        varietal: "Cabernet Sauvignon",
        vintage: 2019,
        region: "Tuscany",
        country: "Italy",
        type: "Red",
        score: 98,
        price: 450,
        servingTemp: "16-18°C",
        description: "The original Super Tuscan continues to impress.",
        tastingNotes: {
            primary: ["Cassis", "Blackberry", "Plum"],
            secondary: ["Mediterranean herbs", "Tobacco", "Graphite"],
            finish: "Powerful yet elegant with fine-grained tannins"
        },
        color: "#7B3F61",
        characteristics: {
            body: 5,
            tannins: 4,
            acidity: 4,
            alcohol: 4,
            complexity: 5
        }
    },
    {
        id: 4,
        rank: 4,
        name: "Egon Müller Scharzhofberger Riesling Auslese 2020",
        winery: "Egon Müller",
        varietal: "Riesling",
        vintage: 2020,
        region: "Mosel",
        country: "Germany",
        type: "White",
        score: 98,
        price: 650,
        servingTemp: "8-10°C",
        description: "A legendary Riesling producer crafts another masterpiece.",
        tastingNotes: {
            primary: ["Peach", "Apricot", "Citrus blossom"],
            secondary: ["Honey", "Slate minerality", "Petrol"],
            finish: "Perfect sweet-acid balance with incredible persistence"
        },
        color: "#F8E7A1",
        characteristics: {
            body: 3,
            tannins: 0,
            acidity: 5,
            alcohol: 2,
            complexity: 5
        }
    },
    {
        id: 5,
        rank: 5,
        name: "Penfolds Grange 2018",
        winery: "Penfolds",
        varietal: "Shiraz",
        vintage: 2018,
        region: "South Australia",
        country: "Australia",
        type: "Red",
        score: 97,
        price: 850,
        servingTemp: "16-18°C",
        description: "Australia's most celebrated wine continues its legacy.",
        tastingNotes: {
            primary: ["Blackberry", "Dark chocolate", "Vanilla"],
            secondary: ["Black pepper", "Licorice", "Coffee"],
            finish: "Massive structure with velvety texture"
        },
        color: "#4A0E0E",
        characteristics: {
            body: 5,
            tannins: 5,
            acidity: 3,
            alcohol: 4,
            complexity: 5
        }
    },
    {
        id: 6,
        rank: 6,
        name: "Bollinger La Grande Année 2012",
        winery: "Bollinger",
        varietal: "Champagne Blend",
        vintage: 2012,
        region: "Champagne",
        country: "France",
        type: "Sparkling",
        score: 95,
        price: 200,
        servingTemp: "6-8°C",
        description: "Exceptional vintage Champagne showing incredible depth.",
        tastingNotes: {
            primary: ["Green apple", "Citrus", "White flowers"],
            secondary: ["Brioche", "Honey", "Toasted almonds"],
            finish: "Fine bubbles with creamy texture and long finish"
        },
        color: "#FFE4B5",
        characteristics: {
            body: 3,
            tannins: 0,
            acidity: 5,
            alcohol: 3,
            complexity: 4
        }
    }
];

// Modern Icons as React Components
const Icons = {
    Wine: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2h8l1 7c0 2.5-2 4.5-4.5 4.5S8 11.5 8 9l1-7z" />
            <line x1="12" y1="13.5" x2="12" y2="20" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <ellipse cx="12" cy="9" rx="3.5" ry="2" fill="currentColor" opacity="0.3"/>
        </svg>
    ),
    DrVinny: ({ className = "w-12 h-12" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" fill="#FF6B6B"/>
            <circle cx="50" cy="50" r="40" fill="#4ECDC4"/>
            <path d="M30 40 Q50 20 70 40" stroke="white" strokeWidth="3" fill="none"/>
            <circle cx="35" cy="35" r="5" fill="white"/>
            <circle cx="65" cy="35" r="5" fill="white"/>
            <path d="M35 60 Q50 70 65 60" stroke="white" strokeWidth="3" fill="none"/>
            <rect x="45" y="15" width="10" height="15" rx="5" fill="#8B4513"/>
        </svg>
    ),
    Search: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
    ),
    Filter: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    ),
    Grid: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    List: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
    ),
    Star: ({ className = "w-6 h-6", filled = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    X: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    ChevronDown: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    ),
    Menu: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    Sparkles: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <path d="M16 16l1.5 1.5" />
            <path d="M16 8l1.5-1.5" />
            <path d="M8 16l-1.5 1.5" />
            <path d="M8 8L6.5 6.5" />
        </svg>
    )
};

// Custom Hooks
const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.reveal').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);
};

// Modern 3D Wine Bottle Viewer
const Wine3DViewer = ({ wine }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Create bottle geometry
        const bottleGroup = new THREE.Group();

        // Bottle body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 3, 32);
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: wine.type === 'Red' ? 0x1a0000 : 0x2d4a2b,
            metalness: 0.1,
            roughness: 0.2,
            transparent: true,
            opacity: 0.8,
            clearcoat: 1,
            clearcoatRoughness: 0
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        bottleGroup.add(body);

        // Bottle neck
        const neckGeometry = new THREE.CylinderGeometry(0.2, 0.35, 1, 32);
        const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
        neck.position.y = 2;
        bottleGroup.add(neck);

        // Cork
        const corkGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.5, 32);
        const corkMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4a3c28,
            roughness: 0.8
        });
        const cork = new THREE.Mesh(corkGeometry, corkMaterial);
        cork.position.y = 2.75;
        bottleGroup.add(cork);

        // Wine level inside
        if (wine.type !== 'Sparkling') {
            const wineGeometry = new THREE.CylinderGeometry(0.45, 0.65, 2.5, 32);
            const wineMaterial = new THREE.MeshPhysicalMaterial({
                color: wine.type === 'Red' ? 0x722f37 : 0xfef3c7,
                transparent: true,
                opacity: 0.9,
                metalness: 0,
                roughness: 0
            });
            const wineLevel = new THREE.Mesh(wineGeometry, wineMaterial);
            wineLevel.position.y = -0.25;
            bottleGroup.add(wineLevel);
        }

        bottleGroup.rotation.x = 0.1;
        scene.add(bottleGroup);

        // Animation
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            if (!mountRef.current) return;
            const rect = mountRef.current.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
        };

        const currentMount = mountRef.current;
        currentMount.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            bottleGroup.rotation.y += 0.005;
            bottleGroup.rotation.x = mouseY * 0.5;
            bottleGroup.rotation.z = mouseX * 0.3;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            currentMount.removeEventListener('mousemove', handleMouseMove);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [wine]);

    return <div ref={mountRef} className="bottle-3d-container" />;
};

// Wine Glass Placeholder for condensed view
const WineGlassPlaceholder = () => (
    <div className="flex items-center justify-center h-20 w-20">
        <Icons.Wine className="w-12 h-12 text-gray-600" />
    </div>
);

// Modern Wine Card Component
const WineCard = ({ wine, index, onSelect, isCondensed }) => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current || isCondensed) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);

        const rotateX = (y - 50) / 10;
        const rotateY = (x - 50) / 10;
        
        cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
        cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
    }, [isCondensed]);

    const handleMouseLeave = () => {
        if (cardRef.current && !isCondensed) {
            cardRef.current.style.setProperty('--rotate-x', '0deg');
            cardRef.current.style.setProperty('--rotate-y', '0deg');
        }
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'linear-gradient(135deg, #FFD700, #FFA500)';
        if (rank === 2) return 'linear-gradient(135deg, #E5E5E5, #BDC3C7)';
        if (rank === 3) return 'linear-gradient(135deg, #CD7F32, #B87333)';
        return 'linear-gradient(135deg, rgb(220, 38, 38), rgb(136, 19, 55))';
    };

    if (isCondensed) {
        return (
            <div 
                className="wine-card-condensed stagger-in cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => onSelect(wine)}
            >
                <div className="flex items-center gap-4">
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: getRankColor(wine.rank) }}
                    >
                        {wine.score}
                    </div>
                    
                    <WineGlassPlaceholder />
                    
                    <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-white truncate">{wine.name}</h3>
                        <p className="text-sm text-gray-400 truncate">{wine.winery} • {wine.vintage}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                            <div className="text-lg font-bold text-white">{wine.score}</div>
                            <div className="text-xs text-gray-400">points</div>
                        </div>
                        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                            ${wine.price}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className="wine-card-modern stagger-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(wine)}
        >
            {/* Score Badge */}
            <div 
                className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white z-10"
                style={{ background: getRankColor(wine.rank) }}
            >
                {wine.score}
            </div>

            {/* 3D Bottle Viewer */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl bg-gradient-to-b from-gray-900 to-black">
                <Wine3DViewer wine={wine} />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-red-500 transition-all duration-300">
                        {wine.name}
                    </h3>
                    <p className="text-gray-400">{wine.winery}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80">
                        {wine.vintage}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80">
                        {wine.varietal}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80">
                        {wine.region}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                        ${wine.price}
                    </span>
                    <button className="btn-modern text-sm">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// Enhanced Wine Detail Modal
const WineDetailModal = ({ wine, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !wine) return null;

    const CharacteristicBar = ({ label, value, max = 5 }) => (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="text-white">{value}/{max}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(value / max) * 100}%` }}
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-dark rounded-3xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                >
                    <Icons.X className="w-6 h-6 text-white" />
                </button>

                {/* Hero Section */}
                <div className="relative h-96 overflow-hidden rounded-t-3xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                    <Wine3DViewer wine={wine} />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <h2 className="text-4xl font-bold text-white mb-2">{wine.name}</h2>
                        <p className="text-xl text-gray-300">{wine.winery} • {wine.vintage}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    {['overview', 'tasting', 'characteristics'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-medium capitalize transition-all ${
                                activeTab === tab 
                                    ? 'text-white border-b-2 border-red-500' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {wine.description}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="glass rounded-2xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Region</p>
                                    <p className="text-white font-semibold">{wine.region}</p>
                                </div>
                                <div className="glass rounded-2xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Country</p>
                                    <p className="text-white font-semibold">{wine.country}</p>
                                </div>
                                <div className="glass rounded-2xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Type</p>
                                    <p className="text-white font-semibold">{wine.type}</p>
                                </div>
                                <div className="glass rounded-2xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Serving</p>
                                    <p className="text-white font-semibold">{wine.servingTemp}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tasting' && wine.tastingNotes && (
                        <div className="space-y-6">
                            <div className="glass rounded-2xl p-6">
                                <h4 className="text-white font-semibold mb-4">Primary Notes</h4>
                                <div className="flex flex-wrap gap-3">
                                    {wine.tastingNotes.primary.map((note, i) => (
                                        <span 
                                            key={i}
                                            className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white"
                                        >
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6">
                                <h4 className="text-white font-semibold mb-4">Secondary Notes</h4>
                                <div className="flex flex-wrap gap-3">
                                    {wine.tastingNotes.secondary.map((note, i) => (
                                        <span 
                                            key={i}
                                            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white"
                                        >
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6">
                                <h4 className="text-white font-semibold mb-4">Finish</h4>
                                <p className="text-gray-300">{wine.tastingNotes.finish}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'characteristics' && wine.characteristics && (
                        <div className="space-y-4">
                            <CharacteristicBar label="Body" value={wine.characteristics.body} />
                            <CharacteristicBar label="Tannins" value={wine.characteristics.tannins} />
                            <CharacteristicBar label="Acidity" value={wine.characteristics.acidity} />
                            <CharacteristicBar label="Alcohol" value={wine.characteristics.alcohol} />
                            <CharacteristicBar label="Complexity" value={wine.characteristics.complexity} />
                        </div>
                    )}
                </div>

                {/* Price and Action */}
                <div className="p-8 border-t border-white/10 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Price per bottle</p>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                            ${wine.price}
                        </p>
                    </div>
                    <button className="btn-modern">
                        Add to Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

// AI Assistant Component - UPGRADED WITH GEMINI API
const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your AI wine sommelier. How can I help you explore our top wines today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const systemPrompt = `
                You are an expert AI Wine Sommelier for Wine Spectator. Your name is 'Dr. Vinny'.
                Your sole purpose is to answer questions about the provided list of top wines.
                Be friendly, enthusiastic, and concise. Your knowledge is strictly limited to the JSON data provided about the wines.
                Do not invent any information or discuss wines not on the list.
                If asked a question you cannot answer from the provided data (e.g., 'What about wines from 2010?'), politely state that you can only provide information about the current Top 100 list.
                When asked for a recommendation, analyze the user's request and suggest the best fit from the list.

                Here is the list of wines in JSON format:
                ${JSON.stringify(wines)}
            `;

            const fullPrompt = `${systemPrompt}\n\nUser question: "${input}"`;
            
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const aiText = response.text();

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);

        } catch (error) {
            console.error("Gemini API Error:", error);
            const errorMessage = { role: 'assistant', content: "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Fragment>
            {/* AI Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="ai-assistant-btn"
            >
                <Icons.Sparkles className="w-8 h-8 text-white" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Icons.Sparkles className="w-6 h-6 text-yellow-400" />
                                <h3 className="text-white font-semibold">AI Wine Sommelier</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <Icons.X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`ai-message ${message.role}`}
                            >
                                {message.content}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="ai-message assistant">
                                <div className="flex gap-1">
                                    <span className="animate-bounce">•</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>•</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-input">
                        <input
                            type="text"
                            placeholder="Ask about wines, pairings, or prices..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

// Modern Navigation
const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Icons.Wine className="w-8 h-8 text-red-500" />
                    <span className="text-xl font-bold text-white">Wine Spectator</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#wines" className="text-white/80 hover:text-white transition-colors">
                        Wines
                    </a>
                    <a href="#about" className="text-white/80 hover:text-white transition-colors">
                        About
                    </a>
                    <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                        Contact
                    </a>
                    <button className="btn-modern">
                        Subscribe
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Icons.Menu />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 md:hidden">
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <Icons.X />
                        </button>
                        <a href="#wines" className="text-2xl text-white">Wines</a>
                        <a href="#about" className="text-2xl text-white">About</a>
                        <a href="#contact" className="text-2xl text-white">Contact</a>
                        <button className="btn-modern">Subscribe</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Hero Section with Video
const Hero = () => {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                setVideoError(true);
            });
        }
    }, []);

    return (
        <section className="hero-modern">
            {!videoError ? (
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-purple-900" />
            )}
            
            <div className="hero-overlay" />
            
            <div className="relative z-10 text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 stagger-in">
                    <span className="block">Top 100</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                        Wines of 2025
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 stagger-in" style={{ animationDelay: '0.2s' }}>
                    A curated selection of the world's finest wines
                </p>
                <a 
                    href="#wines" 
                    className="btn-modern inline-block stagger-in" 
                    style={{ animationDelay: '0.4s' }}
                >
                    Explore Collection
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <Icons.ChevronDown className="w-8 h-8 text-white/50" />
            </div>
        </section>
    );
};

// Modern Filter Component
const FilterBar = ({ filters, onFiltersChange, isCondensed, onViewChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const types = ['All', 'Red', 'White', 'Sparkling'];
    const countries = ['All', 'France', 'Italy', 'Germany', 'Australia', 'USA', 'Spain'];

    return (
        <div className="glass-dark rounded-3xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-grow">
                    <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search wines..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            onFiltersChange({ ...filters, search: e.target.value });
                        }}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                    />
                </div>

                {/* View Toggle */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onViewChange(false)}
                        className={`p-3 rounded-full transition-all ${!isCondensed ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <Icons.Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onViewChange(true)}
                        className={`p-3 rounded-full transition-all ${isCondensed ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <Icons.List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Type Filter */}
            <div>
                <p className="text-gray-400 text-sm mb-3">Wine Type</p>
                <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => onFiltersChange({ ...filters, type })}
                            className={`filter-pill ${filters.type === type ? 'active' : ''}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Country Filter */}
            <div>
                <p className="text-gray-400 text-sm mb-3">Country</p>
                <div className="flex flex-wrap gap-2">
                    {countries.map(country => (
                        <button
                            key={country}
                            onClick={() => onFiltersChange({ ...filters, country })}
                            className={`filter-pill ${filters.country === country ? 'active' : ''}`}
                        >
                            {country}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Footer Component
const Footer = () => (
    <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Icons.Wine className="w-6 h-6 text-red-500" />
                        <span className="text-xl font-bold text-white">Wine Spectator</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Curating the world's finest wines since 1976.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#wines" className="text-gray-400 hover:text-white transition-colors">Top 100 Wines</a></li>
                        <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wine School</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wine Ratings</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vintage Charts</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wine Regions</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                    <p className="text-gray-400 text-sm mb-4">
                        Subscribe to our newsletter for exclusive wine insights.
                    </p>
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                        />
                        <button className="btn-modern w-full text-sm">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">
                    © 2025 Wine Spectator. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </footer>
);

// Main App Component
const App = () => {
    const [selectedWine, setSelectedWine] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        type: 'All',
        country: 'All'
    });
    const [isCondensed, setIsCondensed] = useState(false);

    useScrollAnimation();

    // Filter wines
    const filteredWines = useMemo(() => {
        return wines.filter(wine => {
            const matchesSearch = !filters.search || 
                wine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                wine.winery.toLowerCase().includes(filters.search.toLowerCase());
            
            const matchesType = filters.type === 'All' || wine.type === filters.type;
            const matchesCountry = filters.country === 'All' || wine.country === filters.country;

            return matchesSearch && matchesType && matchesCountry;
        });
    }, [filters]);

    return (
        <Fragment>
            <div className="animated-gradient-bg"></div>
    
            <div className="floating-orb" style={{width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3), transparent)', top: '10%', left: '-10%', animationDelay: '0s'}}></div>
            <div className="floating-orb" style={{width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(136, 19, 55, 0.3), transparent)', bottom: '20%', right: '-5%', animationDelay: '5s'}}></div>
            <div className="floating-orb" style={{width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent)', top: '50%', left: '50%', animationDelay: '10s'}}></div>

            <Navigation />
            <Hero />

            <main className="relative z-10">
                <section id="wines" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 reveal">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                The Collection
                            </h2>
                            <p className="text-xl text-gray-400">
                                Discover extraordinary wines from renowned vineyards
                            </p>
                        </div>

                        <div className="mb-12 reveal">
                            <FilterBar 
                                filters={filters} 
                                onFiltersChange={setFilters}
                                isCondensed={isCondensed}
                                onViewChange={setIsCondensed}
                            />
                        </div>

                        {isCondensed ? (
                            <div className="space-y-4">
                                {filteredWines.map((wine, index) => (
                                    <WineCard
                                        key={wine.id}
                                        wine={wine}
                                        index={index}
                                        onSelect={setSelectedWine}
                                        isCondensed={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredWines.map((wine, index) => (
                                    <WineCard
                                        key={wine.id}
                                        wine={wine}
                                        index={index}
                                        onSelect={setSelectedWine}
                                        isCondensed={false}
                                    />
                                ))}
                            </div>
                        )}

                        {filteredWines.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-xl">No wines found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </section>

                <section id="about" className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center reveal">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            About Wine Spectator
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            For over 40 years, Wine Spectator has been the world's leading authority on wine. 
                            Our expert tasters review more than 15,000 wines each year, helping you discover 
                            the perfect bottle for any occasion.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />

            <WineDetailModal
                wine={selectedWine}
                isOpen={!!selectedWine}
                onClose={() => setSelectedWine(null)}
            />

            <AIAssistant />
        </Fragment>
    );
};

export default App;