import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  useState,
  useMemo,
  useEffect,
  useRef
} = React;
const wines = [{
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
  servingTemp: "16-18°C",
  description: "A perfect wine showcasing the incredible terroir of Margaux.",
  tastingNotes: "Blackcurrant, violets, graphite, cedar, and truffle notes with silky tannins.",
  alcoholContent: 13.5,
  decantTime: "2 hours",
  drinkWindow: "2025-2070",
  production: 12000,
  blend: "65% Cabernet Sauvignon, 20% Merlot, 10% Cabernet Franc, 5% Petit Verdot",
  editorNote: "This is why Margaux remains one of Bordeaux's most prestigious appellations."
}, {
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
  tastingNotes: "Wild strawberry, rose petals, exotic spices, and earth with incredible finesse.",
  alcoholContent: 13.0,
  decantTime: "1 hour",
  drinkWindow: "2024-2060",
  production: 1500,
  blend: "100% Pinot Noir",
  editorNote: "A transcendent wine that justifies its legendary status."
}, {
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
  tastingNotes: "Cassis, Mediterranean herbs, tobacco, and graphite.",
  alcoholContent: 14.0,
  decantTime: "2 hours",
  drinkWindow: "2023-2050",
  production: 15000,
  blend: "85% Cabernet Sauvignon, 15% Cabernet Franc",
  editorNote: "Still Italy's most influential wine after all these years."
}, {
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
  tastingNotes: "Peach, apricot, honey, slate minerality with perfect sweet-acid balance.",
  alcoholContent: 8.5,
  decantTime: "No decanting needed",
  drinkWindow: "2023-2060",
  production: 3000,
  blend: "100% Riesling",
  editorNote: "The gold standard for German Riesling Auslese."
}, {
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
  tastingNotes: "Blackberry, chocolate, vanilla, and pepper with massive structure.",
  alcoholContent: 14.5,
  decantTime: "3 hours",
  drinkWindow: "2025-2055",
  production: 8000,
  blend: "98% Shiraz, 2% Cabernet Sauvignon",
  editorNote: "An Australian icon that never disappoints."
}, {
  id: 6,
  rank: 6,
  name: "Opus One 2019",
  winery: "Opus One",
  varietal: "Cabernet Sauvignon Blend",
  vintage: 2019,
  region: "Napa Valley",
  country: "USA",
  type: "Red",
  score: 97,
  price: 400,
  servingTemp: "16-18°C",
  description: "The iconic Napa Valley collaboration delivers another stunning vintage.",
  tastingNotes: "Black cherry, cassis, mocha, and herbs with velvety texture.",
  alcoholContent: 14.5,
  decantTime: "2 hours",
  drinkWindow: "2024-2045",
  production: 25000,
  blend: "80% Cabernet Sauvignon, 8% Merlot, 6% Petit Verdot, 5% Cabernet Franc, 1% Malbec",
  editorNote: "The partnership that changed Napa Valley forever."
}, {
  id: 7,
  rank: 7,
  name: "Domaine Leflaive Montrachet Grand Cru 2020",
  winery: "Domaine Leflaive",
  varietal: "Chardonnay",
  vintage: 2020,
  region: "Burgundy",
  country: "France",
  type: "White",
  score: 97,
  price: 2800,
  servingTemp: "10-12°C",
  description: "The pinnacle of white Burgundy from one of the region's top producers.",
  tastingNotes: "Citrus, white flowers, hazelnuts, and wet stones.",
  alcoholContent: 13.5,
  decantTime: "30 minutes",
  drinkWindow: "2024-2040",
  production: 800,
  blend: "100% Chardonnay",
  editorNote: "Montrachet at its most sublime."
}, {
  id: 8,
  rank: 8,
  name: "Vega Sicilia Único 2011",
  winery: "Vega Sicilia",
  varietal: "Tempranillo Blend",
  vintage: 2011,
  region: "Ribera del Duero",
  country: "Spain",
  type: "Red",
  score: 96,
  price: 550,
  servingTemp: "16-18°C",
  description: "Spain's most prestigious wine showcases aged Tempranillo.",
  tastingNotes: "Black cherry, cedar, tobacco, leather, and spices.",
  alcoholContent: 14.0,
  decantTime: "3 hours",
  drinkWindow: "2023-2045",
  production: 5000,
  blend: "95% Tempranillo, 5% Cabernet Sauvignon",
  editorNote: "Spain's answer to the great wines of Bordeaux."
}, {
  id: 9,
  rank: 9,
  name: "Château Le Pin 2019",
  winery: "Château Le Pin",
  varietal: "Merlot",
  vintage: 2019,
  region: "Pomerol",
  country: "France",
  type: "Red",
  score: 96,
  price: 4500,
  servingTemp: "16-18°C",
  description: "The cult Pomerol continues to enchant.",
  tastingNotes: "Black cherry, plum, truffle, mocha, and exotic spices.",
  alcoholContent: 14.0,
  decantTime: "1 hour",
  drinkWindow: "2025-2050",
  production: 600,
  blend: "100% Merlot",
  editorNote: "Pomerol's most seductive wine."
}, {
  id: 10,
  rank: 10,
  name: "Kistler Chardonnay Vine Hill Vineyard 2020",
  winery: "Kistler Vineyards",
  varietal: "Chardonnay",
  vintage: 2020,
  region: "Russian River Valley",
  country: "USA",
  type: "White",
  score: 96,
  price: 150,
  servingTemp: "10-12°C",
  description: "California Chardonnay at its finest.",
  tastingNotes: "Meyer lemon, white peach, brioche, and mineral notes.",
  alcoholContent: 14.2,
  decantTime: "No decanting needed",
  drinkWindow: "2023-2035",
  production: 1200,
  blend: "100% Chardonnay",
  editorNote: "California Chardonnay with a Burgundian soul."
}, {
  id: 11,
  rank: 11,
  name: "Scarecrow Cabernet Sauvignon 2019",
  winery: "Scarecrow",
  varietal: "Cabernet Sauvignon",
  vintage: 2019,
  region: "Rutherford",
  country: "USA",
  type: "Red",
  score: 95,
  price: 500,
  servingTemp: "16-18°C",
  description: "Cult Napa Cabernet from the historic J.J. Cohn Estate.",
  tastingNotes: "Blackcurrant, graphite, dark chocolate, and Rutherford dust.",
  alcoholContent: 14.8,
  decantTime: "2 hours",
  drinkWindow: "2024-2040",
  production: 2000,
  blend: "100% Cabernet Sauvignon",
  editorNote: "Rutherford terroir at its most expressive."
}, {
  id: 12,
  rank: 12,
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
  tastingNotes: "Brioche, honey, citrus, and toasted almonds.",
  alcoholContent: 12.0,
  decantTime: "No decanting needed",
  drinkWindow: "2023-2035",
  production: 30000,
  blend: "65% Pinot Noir, 35% Chardonnay",
  editorNote: "2012 was a legendary vintage in Champagne."
}];
const X = ({
  className = "h-6 w-6"
}) => /*#__PURE__*/_jsx("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: /*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  })
});
const Search = ({
  className = "h-6 w-6"
}) => /*#__PURE__*/_jsx("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: /*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  })
});
const Filter = ({
  className = "h-6 w-6"
}) => /*#__PURE__*/_jsx("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: /*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
  })
});
const Share = ({
  className = "h-6 w-6"
}) => /*#__PURE__*/_jsx("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: /*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.658a3 3 0 10-5.367-2.684L8.683 15.5m0 0a3 3 0 10-5.367 2.684L8.683 15.5m9.632-4.658L8.683 8.5"
  })
});
const Thermometer = ({
  className = "h-4 w-4"
}) => /*#__PURE__*/_jsxs("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: [/*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 11.5V6a3 3 0 116 0v5.5m-7.5 5.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "17",
    r: "2",
    fill: "currentColor"
  })]
});
const WineGlass = ({
  className = "h-16 w-16"
}) => /*#__PURE__*/_jsxs("svg", {
  className: className,
  viewBox: "0 0 24 24",
  fill: "black",
  children: [/*#__PURE__*/_jsx("path", {
    d: "M8 2h8l1.5 9c0 2.5-2 4.5-4.5 4.5S8.5 13.5 8.5 11L8 2zM12 16v6m-3 0h6",
    stroke: "black",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/_jsx("ellipse", {
    cx: "12",
    cy: "8",
    rx: "3.5",
    ry: "2",
    fill: "black",
    opacity: "0.3"
  })]
});
const Bot = ({
  className = "h-6 w-6"
}) => /*#__PURE__*/_jsxs("svg", {
  className: className,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  children: [/*#__PURE__*/_jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "9",
    cy: "9",
    r: "1",
    fill: "currentColor"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "15",
    cy: "9",
    r: "1",
    fill: "currentColor"
  })]
});
const WineGlassPlaceholder = ({
  className = ""
}) => /*#__PURE__*/_jsx("div", {
  className: `wine-glass-placeholder ${className}`,
  children: /*#__PURE__*/_jsx(WineGlass, {})
});
const initializeTastingData = () => {
  const stored = localStorage.getItem('wineTastings');
  return stored ? JSON.parse(stored) : {
    tasted: [],
    wantToTaste: []
  };
};
const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: "relative",
    ref: dropdownRef,
    children: [/*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: () => setIsOpen(!isOpen),
      className: "w-full px-3 py-2 text-left border rounded focus:outline-none sans-font text-sm",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between",
        children: [/*#__PURE__*/_jsx("span", {
          className: "text-gray-700",
          children: selected.length > 0 ? `${selected.length} selected` : placeholder
        }), /*#__PURE__*/_jsx("svg", {
          className: `w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`,
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /*#__PURE__*/_jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M19 9l-7 7-7-7"
          })
        })]
      })
    }), isOpen && /*#__PURE__*/_jsx("div", {
      className: "absolute z-20 w-full mt-1 bg-white border rounded shadow-lg dropdown-content",
      children: options.map(option => /*#__PURE__*/_jsxs("label", {
        className: "flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer sans-font text-sm",
        children: [/*#__PURE__*/_jsx("input", {
          type: "checkbox",
          checked: selected.includes(option),
          onChange: () => {
            if (selected.includes(option)) {
              onChange(selected.filter(item => item !== option));
            } else {
              onChange([...selected, option]);
            }
          },
          className: "mr-2"
        }), /*#__PURE__*/_jsx("span", {
          className: "text-gray-700",
          children: option
        })]
      }, option))
    })]
  });
};
const AIAssistant = ({
  wines
}) => {
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
      if (lowerQuery.includes("steak") || lowerQuery.includes("red") && lowerQuery.includes("under $500")) {
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
  return /*#__PURE__*/_jsxs("div", {
    className: "fixed bottom-4 right-4 z-40",
    children: [!isOpen && /*#__PURE__*/_jsx("button", {
      onClick: () => setIsOpen(true),
      className: "ai-assistant p-4 rounded-full shadow-lg text-white hover:scale-105 transition-transform",
      children: /*#__PURE__*/_jsx(Bot, {
        className: "h-8 w-8"
      })
    }), isOpen && /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-lg shadow-2xl w-96 animate-fade-in",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ai-assistant p-4 rounded-t-lg flex justify-between items-center",
        children: [/*#__PURE__*/_jsxs("h3", {
          className: "text-white font-bold flex items-center gap-2",
          children: [/*#__PURE__*/_jsx(Bot, {
            className: "h-6 w-6"
          }), "Wine Spectator AI Assistant"]
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => setIsOpen(false),
          className: "text-white hover:text-gray-200",
          children: /*#__PURE__*/_jsx(X, {
            className: "h-5 w-5"
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "p-4",
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm text-gray-600 mb-4",
          children: "Ask me for wine recommendations based on your preferences, food pairings, or occasions!"
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("textarea", {
            value: query,
            onChange: e => setQuery(e.target.value),
            placeholder: "E.g., 'I need a red wine under $500 for a steak dinner' or 'What's a good wine for celebrating?'",
            className: "w-full p-3 border rounded-lg resize-none sans-font text-sm",
            rows: "3"
          }), /*#__PURE__*/_jsx("button", {
            onClick: getRecommendation,
            disabled: isLoading || !query.trim(),
            className: "w-full bg-red-800 text-white py-2 rounded hover:bg-red-900 disabled:bg-gray-400 sans-font",
            children: isLoading ? 'Getting recommendation...' : 'Get Recommendation'
          }), recommendation && /*#__PURE__*/_jsx("div", {
            className: "p-4 bg-gray-50 rounded-lg",
            children: /*#__PURE__*/_jsx("p", {
              className: "text-sm text-gray-700",
              children: recommendation
            })
          })]
        })]
      })]
    })]
  });
};
const WineCard = ({
  wine,
  onViewDetails,
  tastingData,
  onTastingChange
}) => {
  const getRankBadgeClass = rank => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'bg-red-800';
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "wine-card rounded overflow-hidden animate-fade-in",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "wine-card-content cursor-pointer",
      onClick: () => onViewDetails(wine),
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative overflow-hidden",
        children: [/*#__PURE__*/_jsx(WineGlassPlaceholder, {
          className: "w-full h-48"
        }), /*#__PURE__*/_jsxs("div", {
          className: `absolute top-3 left-3 ${getRankBadgeClass(wine.rank)} text-white px-3 py-1 rounded text-sm font-bold shadow-lg`,
          children: ["#", wine.rank]
        }), /*#__PURE__*/_jsx("div", {
          className: "absolute top-3 right-3 bg-white text-red-800 px-3 py-1 rounded text-sm font-bold shadow-lg",
          children: wine.score
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "p-5 wine-card-details",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h3", {
            className: "font-bold text-lg mb-1 text-gray-900",
            children: wine.name
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-gray-600 mb-3",
            children: wine.winery
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-2",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "text-sm text-gray-500",
            children: [wine.vintage, " \u2022 ", wine.varietal]
          }), /*#__PURE__*/_jsxs("div", {
            className: "text-sm text-gray-500",
            children: [wine.region, ", ", wine.country]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2 text-sm text-gray-500",
            children: [/*#__PURE__*/_jsx(Thermometer, {
              className: "h-4 w-4 text-red-800"
            }), /*#__PURE__*/_jsxs("span", {
              children: ["Serve at ", wine.servingTemp]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-center pt-3 border-t",
            children: [/*#__PURE__*/_jsxs("span", {
              className: "text-lg font-bold text-red-800",
              children: ["$", wine.price]
            }), /*#__PURE__*/_jsx("span", {
              className: "text-sm text-gray-500",
              children: wine.type
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "px-5 pb-5 space-y-2 border-t pt-3",
      children: [/*#__PURE__*/_jsxs("label", {
        className: "flex items-center gap-2 cursor-pointer sans-font text-sm",
        children: [/*#__PURE__*/_jsx("input", {
          type: "checkbox",
          checked: tastingData.tasted.includes(wine.id),
          onChange: e => {
            e.stopPropagation();
            onTastingChange(wine.id, 'tasted', e.target.checked);
          },
          className: "custom-checkbox"
        }), /*#__PURE__*/_jsx("span", {
          className: "text-gray-700",
          children: "I have tasted this wine"
        })]
      }), /*#__PURE__*/_jsxs("label", {
        className: "flex items-center gap-2 cursor-pointer sans-font text-sm",
        children: [/*#__PURE__*/_jsx("input", {
          type: "checkbox",
          checked: tastingData.wantToTaste.includes(wine.id),
          onChange: e => {
            e.stopPropagation();
            onTastingChange(wine.id, 'wantToTaste', e.target.checked);
          },
          className: "custom-checkbox"
        }), /*#__PURE__*/_jsx("span", {
          className: "text-gray-700",
          children: "I want to taste this wine"
        })]
      })]
    })]
  });
};
const WineFilters = ({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  totalWines,
  filteredCount
}) => {
  const uniqueCountries = [...new Set(wines.map(w => w.country))].sort();
  const uniqueTypes = [...new Set(wines.map(w => w.type))].sort();
  const uniqueVintages = [...new Set(wines.map(w => w.vintage.toString()))].sort().reverse();
  const activeFilters = [];
  if (filters.type.length > 0) activeFilters.push(...filters.type.map(t => ({
    type: 'type',
    value: t
  })));
  if (filters.country.length > 0) activeFilters.push(...filters.country.map(c => ({
    type: 'country',
    value: c
  })));
  if (filters.vintage.length > 0) activeFilters.push(...filters.vintage.map(v => ({
    type: 'vintage',
    value: v
  })));
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-white rounded shadow-sm p-6 animate-fade-in",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex justify-between items-center mb-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-3",
        children: [/*#__PURE__*/_jsx(Filter, {
          className: "h-5 w-5 text-red-800"
        }), /*#__PURE__*/_jsx("h2", {
          className: "text-2xl font-bold text-gray-900",
          children: "Explore the Top 100"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "text-sm text-gray-600 sans-font",
        children: ["Showing ", /*#__PURE__*/_jsx("span", {
          className: "font-bold text-red-800",
          children: filteredCount
        }), " of ", totalWines, " wines"]
      })]
    }), activeFilters.length > 0 && /*#__PURE__*/_jsxs("div", {
      className: "mb-4 flex flex-wrap gap-2",
      children: [activeFilters.map((filter, index) => /*#__PURE__*/_jsxs("div", {
        className: "bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-2 sans-font",
        children: [/*#__PURE__*/_jsx("span", {
          className: "text-gray-700",
          children: filter.value
        }), /*#__PURE__*/_jsx("button", {
          onClick: e => {
            e.stopPropagation();
            const newFilters = {
              ...filters
            };
            newFilters[filter.type] = newFilters[filter.type].filter(v => v !== filter.value);
            onFiltersChange(newFilters);
          },
          className: "hover:text-red-800",
          children: /*#__PURE__*/_jsx(X, {
            className: "h-3 w-3"
          })
        })]
      }, `${filter.type}-${filter.value}-${index}`)), /*#__PURE__*/_jsx("button", {
        onClick: () => onFiltersChange({
          search: '',
          type: [],
          country: [],
          region: [],
          priceRange: [0, 20000],
          scoreRange: [0, 100],
          vintage: []
        }),
        className: "text-sm text-gray-500 hover:text-gray-700 sans-font",
        children: "Clear all"
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "mb-6",
      children: /*#__PURE__*/_jsxs("div", {
        className: "relative",
        children: [/*#__PURE__*/_jsx(Search, {
          className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        }), /*#__PURE__*/_jsx("input", {
          type: "text",
          placeholder: "Search wines, wineries, regions, varietals...",
          className: "w-full pl-10 pr-4 py-3 border rounded focus:outline-none sans-font",
          value: filters.search,
          onChange: e => onFiltersChange({
            ...filters,
            search: e.target.value
          })
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "block text-sm font-medium text-gray-700 mb-2 sans-font",
          children: "Wine Type"
        }), /*#__PURE__*/_jsx(MultiSelect, {
          options: uniqueTypes,
          selected: filters.type,
          onChange: value => onFiltersChange({
            ...filters,
            type: value
          }),
          placeholder: "All Types"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "block text-sm font-medium text-gray-700 mb-2 sans-font",
          children: "Country"
        }), /*#__PURE__*/_jsx(MultiSelect, {
          options: uniqueCountries,
          selected: filters.country,
          onChange: value => onFiltersChange({
            ...filters,
            country: value
          }),
          placeholder: "All Countries"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "block text-sm font-medium text-gray-700 mb-2 sans-font",
          children: "Vintage"
        }), /*#__PURE__*/_jsx(MultiSelect, {
          options: uniqueVintages,
          selected: filters.vintage,
          onChange: value => onFiltersChange({
            ...filters,
            vintage: value
          }),
          placeholder: "All Vintages"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "block text-sm font-medium text-gray-700 mb-2 sans-font",
          children: "Sort By"
        }), /*#__PURE__*/_jsxs("select", {
          className: "w-full px-3 py-2 border rounded focus:outline-none sans-font text-sm",
          value: sortBy,
          onChange: e => onSortChange(e.target.value),
          children: [/*#__PURE__*/_jsx("option", {
            value: "rank",
            children: "Rank"
          }), /*#__PURE__*/_jsx("option", {
            value: "score-desc",
            children: "Score (High to Low)"
          }), /*#__PURE__*/_jsx("option", {
            value: "score-asc",
            children: "Score (Low to High)"
          }), /*#__PURE__*/_jsx("option", {
            value: "price-desc",
            children: "Price (High to Low)"
          }), /*#__PURE__*/_jsx("option", {
            value: "price-asc",
            children: "Price (Low to High)"
          }), /*#__PURE__*/_jsx("option", {
            value: "vintage-desc",
            children: "Vintage (Newest)"
          }), /*#__PURE__*/_jsx("option", {
            value: "vintage-asc",
            children: "Vintage (Oldest)"
          }), /*#__PURE__*/_jsx("option", {
            value: "name",
            children: "Name (A-Z)"
          })]
        })]
      })]
    })]
  });
};
const WineDetailModal = ({
  wine,
  isOpen,
  onClose,
  tastingData,
  onTastingChange
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  if (!wine || !isOpen) return null;
  const getRankBadgeClass = rank => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'bg-red-800';
  };
  return /*#__PURE__*/_jsx("div", {
    className: "fixed inset-0 z-50 overflow-y-auto",
    children: /*#__PURE__*/_jsxs("div", {
      className: "flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center",
      children: [/*#__PURE__*/_jsx("div", {
        className: "modal-backdrop fixed inset-0 transition-opacity",
        onClick: onClose
      }), /*#__PURE__*/_jsxs("div", {
        className: "relative inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "relative h-80 overflow-hidden",
          children: [/*#__PURE__*/_jsx(WineGlassPlaceholder, {
            className: "w-full h-full"
          }), /*#__PURE__*/_jsx("div", {
            className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          }), /*#__PURE__*/_jsx("button", {
            onClick: onClose,
            className: "absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30",
            children: /*#__PURE__*/_jsx(X, {
              className: "h-6 w-6 text-white"
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "absolute bottom-6 left-6 right-6",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex items-end justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-3 mb-2",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: `${getRankBadgeClass(wine.rank)} text-white px-4 py-2 rounded text-lg font-bold`,
                    children: ["#", wine.rank]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded text-lg font-bold",
                    children: [wine.score, " pts"]
                  })]
                }), /*#__PURE__*/_jsx("h2", {
                  className: "text-3xl font-bold text-white mb-1",
                  children: wine.name
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xl text-white/90",
                  children: wine.winery
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "text-4xl font-bold text-white",
                  children: ["$", wine.price]
                }), /*#__PURE__*/_jsx("div", {
                  className: "text-white/80",
                  children: "per bottle"
                })]
              })]
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "px-6 py-4 bg-gray-50 border-b space-y-2",
          children: [/*#__PURE__*/_jsxs("label", {
            className: "flex items-center gap-2 cursor-pointer sans-font text-sm",
            children: [/*#__PURE__*/_jsx("input", {
              type: "checkbox",
              checked: tastingData.tasted.includes(wine.id),
              onChange: e => onTastingChange(wine.id, 'tasted', e.target.checked)
            }), /*#__PURE__*/_jsx("span", {
              className: "text-gray-700",
              children: "I have tasted this wine"
            })]
          }), /*#__PURE__*/_jsxs("label", {
            className: "flex items-center gap-2 cursor-pointer sans-font text-sm",
            children: [/*#__PURE__*/_jsx("input", {
              type: "checkbox",
              checked: tastingData.wantToTaste.includes(wine.id),
              onChange: e => onTastingChange(wine.id, 'wantToTaste', e.target.checked)
            }), /*#__PURE__*/_jsx("span", {
              className: "text-gray-700",
              children: "I want to taste this wine"
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "border-b",
          children: /*#__PURE__*/_jsx("div", {
            className: "flex",
            children: ['overview', 'details', 'editor note'].map(tab => /*#__PURE__*/_jsx("button", {
              onClick: () => setActiveTab(tab),
              className: `px-6 py-3 font-medium capitalize sans-font ${activeTab === tab ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-600 hover:text-gray-900'}`,
              children: tab
            }, tab))
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "p-6",
          children: [activeTab === 'overview' && /*#__PURE__*/_jsxs("div", {
            className: "space-y-6 animate-fade-in",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-bold text-gray-900 mb-2",
                children: "Description"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-gray-700 leading-relaxed",
                children: wine.description
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "bg-gray-50 rounded p-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-sm text-gray-500 mb-1 sans-font",
                  children: "Vintage"
                }), /*#__PURE__*/_jsx("div", {
                  className: "font-bold text-gray-900",
                  children: wine.vintage
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "bg-gray-50 rounded p-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-sm text-gray-500 mb-1 sans-font",
                  children: "Type"
                }), /*#__PURE__*/_jsx("div", {
                  className: "font-bold text-gray-900",
                  children: wine.type
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "bg-gray-50 rounded p-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-sm text-gray-500 mb-1 sans-font",
                  children: "Region"
                }), /*#__PURE__*/_jsx("div", {
                  className: "font-bold text-gray-900",
                  children: wine.region
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "bg-gray-50 rounded p-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-sm text-gray-500 mb-1 sans-font",
                  children: "Country"
                }), /*#__PURE__*/_jsx("div", {
                  className: "font-bold text-gray-900",
                  children: wine.country
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-bold text-gray-900 mb-2",
                children: "Tasting Notes"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-gray-700 leading-relaxed",
                children: wine.tastingNotes
              })]
            })]
          }), activeTab === 'details' && /*#__PURE__*/_jsx("div", {
            className: "space-y-6 animate-fade-in",
            children: /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("h4", {
                  className: "font-semibold text-gray-900 mb-3",
                  children: "Wine Details"
                }), /*#__PURE__*/_jsxs("dl", {
                  className: "space-y-2",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600",
                      children: "Varietal"
                    }), /*#__PURE__*/_jsx("dd", {
                      className: "font-medium text-gray-900",
                      children: wine.varietal
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600",
                      children: "Alcohol Content"
                    }), /*#__PURE__*/_jsxs("dd", {
                      className: "font-medium text-gray-900",
                      children: [wine.alcoholContent, "%"]
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600",
                      children: "Production"
                    }), /*#__PURE__*/_jsxs("dd", {
                      className: "font-medium text-gray-900",
                      children: [wine.production.toLocaleString(), " cases"]
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600",
                      children: "Drink Window"
                    }), /*#__PURE__*/_jsx("dd", {
                      className: "font-medium text-gray-900",
                      children: wine.drinkWindow
                    })]
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("h4", {
                  className: "font-semibold text-gray-900 mb-3",
                  children: "Serving Suggestions"
                }), /*#__PURE__*/_jsxs("dl", {
                  className: "space-y-2",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsxs("dt", {
                      className: "text-gray-600 flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx(Thermometer, {
                        className: "h-4 w-4 text-red-800"
                      }), "Serving Temp"]
                    }), /*#__PURE__*/_jsx("dd", {
                      className: "font-medium text-gray-900",
                      children: wine.servingTemp
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600",
                      children: "Decanting"
                    }), /*#__PURE__*/_jsx("dd", {
                      className: "font-medium text-gray-900",
                      children: wine.decantTime
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "py-2 border-b",
                    children: [/*#__PURE__*/_jsx("dt", {
                      className: "text-gray-600 mb-1",
                      children: "Blend Composition"
                    }), /*#__PURE__*/_jsx("dd", {
                      className: "font-medium text-gray-900 text-sm",
                      children: wine.blend
                    })]
                  })]
                })]
              })]
            })
          }), activeTab === 'editor note' && /*#__PURE__*/_jsxs("div", {
            className: "space-y-6 animate-fade-in",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "bg-red-50 rounded p-6",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-semibold text-gray-900 mb-3",
                children: "Wine Spectator Editor's Note"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-gray-700 leading-relaxed italic",
                children: ["\"", wine.editorNote, "\""]
              }), /*#__PURE__*/_jsxs("div", {
                className: "mt-4 text-sm text-gray-600 sans-font",
                children: [/*#__PURE__*/_jsxs("p", {
                  className: "mb-2",
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Wine Spectator Score:"
                  }), " ", wine.score, "/100"]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Value Rating:"
                  }), " ", wine.price < 100 ? 'Outstanding' : wine.price < 500 ? 'Excellent' : 'Collectible']
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-gray-50 rounded p-6",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-semibold text-gray-900 mb-3",
                children: "Food Pairing Suggestions"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-gray-700",
                children: [wine.type === 'Red' && 'Perfect with grilled meats, aged cheeses, and hearty stews.', wine.type === 'White' && 'Excellent with seafood, poultry, and light pasta dishes.', wine.type === 'Sparkling' && 'Ideal as an aperitif or with oysters, caviar, and celebrations.']
              })]
            })]
          })]
        })]
      })]
    })
  });
};
const AnalyticsDashboard = ({
  wines
}) => {
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
              labels: {
                padding: 15,
                font: {
                  size: 12,
                  family: 'Georgia, Times New Roman, serif'
                }
              }
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
  const sortedTypes = Object.entries(typeRankings).sort(([, a], [, b]) => b - a).map(([type, count]) => ({
    type,
    count
  }));
  const vintageRankings = wines.reduce((acc, wine) => {
    acc[wine.vintage] = (acc[wine.vintage] || 0) + 1;
    return acc;
  }, {});
  const sortedVintages = Object.entries(vintageRankings).sort(([a], [b]) => b - a).slice(0, 5).map(([vintage, count]) => ({
    vintage,
    count
  }));
  return /*#__PURE__*/_jsxs("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded shadow-sm p-6 animate-fade-in",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "text-lg font-semibold text-gray-900 mb-4",
        children: "Countries Represented"
      }), /*#__PURE__*/_jsx("div", {
        style: {
          height: '250px'
        },
        children: /*#__PURE__*/_jsx("canvas", {
          ref: chartRef
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded shadow-sm p-6 animate-fade-in",
      style: {
        animationDelay: '0.1s'
      },
      children: [/*#__PURE__*/_jsx("h3", {
        className: "text-lg font-semibold text-gray-900 mb-4",
        children: "Wine Types in Top 100"
      }), /*#__PURE__*/_jsx("div", {
        className: "space-y-2",
        children: sortedTypes.map(({
          type,
          count
        }, index) => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between p-3 rounded bg-gray-50",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxs("span", {
              className: "text-2xl font-bold text-red-800",
              children: ["#", index + 1]
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: type
            })]
          }), /*#__PURE__*/_jsxs("span", {
            className: "text-sm text-gray-600 sans-font",
            children: [count, " wines"]
          })]
        }, type))
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded shadow-sm p-6 animate-fade-in",
      style: {
        animationDelay: '0.2s'
      },
      children: [/*#__PURE__*/_jsx("h3", {
        className: "text-lg font-semibold text-gray-900 mb-4",
        children: "Top Vintages"
      }), /*#__PURE__*/_jsx("div", {
        className: "space-y-2",
        children: sortedVintages.map(({
          vintage,
          count
        }, index) => /*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between p-3 rounded bg-gray-50",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxs("span", {
              className: "text-2xl font-bold text-red-800",
              children: ["#", index + 1]
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: vintage
            })]
          }), /*#__PURE__*/_jsxs("span", {
            className: "text-sm text-gray-600 sans-font",
            children: [count, " wines"]
          })]
        }, vintage))
      })]
    })]
  });
};
const TastingTracker = ({
  tastingData
}) => {
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-white rounded shadow-sm p-6 text-center",
    children: [/*#__PURE__*/_jsx("h3", {
      className: "text-xl font-bold text-gray-900 mb-4",
      children: "Have you tried any of these wines? Which would you like to drink?"
    }), /*#__PURE__*/_jsx("p", {
      className: "text-gray-600 mb-4",
      children: "Track your Top 100 tasting record below."
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex justify-center gap-8 text-lg",
      children: [/*#__PURE__*/_jsxs("span", {
        className: "text-blue-700",
        children: ["I have tasted: ", /*#__PURE__*/_jsx("strong", {
          children: tastingData.tasted.length
        })]
      }), /*#__PURE__*/_jsx("span", {
        className: "text-gray-500",
        children: "\u2014"
      }), /*#__PURE__*/_jsxs("span", {
        className: "text-blue-700",
        children: ["I want to taste: ", /*#__PURE__*/_jsx("strong", {
          children: tastingData.wantToTaste.length
        })]
      })]
    })]
  });
};
const Footer = () => {
  return /*#__PURE__*/_jsx("footer", {
    className: "footer-bg text-white mt-20",
    children: /*#__PURE__*/_jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-8",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("img", {
            src: "https://i.ibb.co/27L2JKF/WSlogo-White.png",
            alt: "Wine Spectator",
            className: "h-12 mb-4"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-400 text-sm",
            children: "The world's most influential wine magazine since 1976."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h4", {
            className: "font-bold mb-4",
            children: "Quick Links"
          }), /*#__PURE__*/_jsxs("ul", {
            className: "space-y-2 text-sm text-gray-400",
            children: [/*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Wine Ratings"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Wine Education"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Events"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Subscribe"
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h4", {
            className: "font-bold mb-4",
            children: "Resources"
          }), /*#__PURE__*/_jsxs("ul", {
            className: "space-y-2 text-sm text-gray-400",
            children: [/*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Vintage Charts"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Wine Basics"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Restaurant Awards"
              })
            }), /*#__PURE__*/_jsx("li", {
              children: /*#__PURE__*/_jsx("a", {
                href: "#",
                className: "hover:text-white",
                children: "Wine Travel"
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h4", {
            className: "font-bold mb-4",
            children: "Connect"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-gray-400 mb-4",
            children: "Join our community of wine enthusiasts worldwide."
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-4",
            children: [/*#__PURE__*/_jsx("a", {
              href: "#",
              className: "text-gray-400 hover:text-white",
              children: /*#__PURE__*/_jsx("svg", {
                className: "h-6 w-6",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/_jsx("path", {
                  d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                })
              })
            }), /*#__PURE__*/_jsx("a", {
              href: "#",
              className: "text-gray-400 hover:text-white",
              children: /*#__PURE__*/_jsx("svg", {
                className: "h-6 w-6",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/_jsx("path", {
                  d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                })
              })
            }), /*#__PURE__*/_jsx("a", {
              href: "#",
              className: "text-gray-400 hover:text-white",
              children: /*#__PURE__*/_jsxs("svg", {
                className: "h-6 w-6",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: [/*#__PURE__*/_jsx("path", {
                  d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"
                }), /*#__PURE__*/_jsx("path", {
                  d: "M12 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.163 6.162 6.163 3.403 0 6.162-2.76 6.162-6.163 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"
                }), /*#__PURE__*/_jsx("circle", {
                  cx: "18.406",
                  cy: "5.594",
                  r: "1.44"
                })]
              })
            })]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400",
        children: /*#__PURE__*/_jsxs("p", {
          children: ["\xA9 2025 Wine Spectator. All rights reserved. | ", /*#__PURE__*/_jsx("a", {
            href: "#",
            className: "hover:text-white",
            children: "Privacy Policy"
          }), " | ", /*#__PURE__*/_jsx("a", {
            href: "#",
            className: "hover:text-white",
            children: "Terms of Service"
          })]
        })
      })]
    })
  });
};
function HomePage() {
  const [filters, setFilters] = useState({
    search: '',
    type: [],
    country: [],
    region: [],
    priceRange: [0, 20000],
    scoreRange: [0, 100],
    vintage: []
  });
  const [sortBy, setSortBy] = useState('rank');
  const [selectedWine, setSelectedWine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tastingData, setTastingData] = useState(initializeTastingData());
  const filteredAndSortedWines = useMemo(() => {
    const filtered = wines.filter(wine => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!wine.name.toLowerCase().includes(searchTerm) && !wine.winery.toLowerCase().includes(searchTerm) && !wine.region.toLowerCase().includes(searchTerm) && !wine.country.toLowerCase().includes(searchTerm) && !wine.varietal.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      if (filters.type.length > 0 && !filters.type.includes(wine.type)) return false;
      if (filters.country.length > 0 && !filters.country.includes(wine.country)) return false;
      if (filters.vintage.length > 0 && !filters.vintage.includes(wine.vintage.toString())) return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return a.rank - b.rank;
        case 'score-desc':
          return b.score - a.score;
        case 'score-asc':
          return a.score - b.score;
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'vintage-desc':
          return b.vintage - a.vintage;
        case 'vintage-asc':
          return a.vintage - b.vintage;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.rank - b.rank;
      }
    });
    return sorted;
  }, [filters, sortBy]);
  const handleTastingChange = (wineId, type, checked) => {
    const newTastingData = {
      ...tastingData
    };
    if (checked) {
      if (!newTastingData[type].includes(wineId)) {
        newTastingData[type] = [...newTastingData[type], wineId];
      }
    } else {
      newTastingData[type] = newTastingData[type].filter(id => id !== wineId);
    }
    setTastingData(newTastingData);
    localStorage.setItem('wineTastings', JSON.stringify(newTastingData));
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen",
    style: {
      backgroundColor: '#fafafa'
    },
    children: [/*#__PURE__*/_jsx("header", {
      className: "header-bg text-white shadow-lg",
      children: /*#__PURE__*/_jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: /*#__PURE__*/_jsxs("div", {
          className: "text-center",
          children: [/*#__PURE__*/_jsx("div", {
            className: "mb-6",
            children: /*#__PURE__*/_jsx("img", {
              src: "https://i.ibb.co/27L2JKF/WSlogo-White.png",
              alt: "Wine Spectator",
              className: "h-16 mx-auto"
            })
          }), /*#__PURE__*/_jsx("h1", {
            className: "text-4xl font-bold text-white tracking-tight mb-2",
            children: "Top 100 Wines of 2025"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-lg text-gray-200 max-w-3xl mx-auto",
            children: "Our editors' selection of the year's most exciting wines from around the world"
          })]
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "bg-white mx-4 sm:mx-6 lg:mx-auto max-w-6xl -mt-8 rounded shadow-lg mb-12 relative z-10",
      children: /*#__PURE__*/_jsx("div", {
        className: "p-8",
        children: /*#__PURE__*/_jsxs("div", {
          className: "prose prose-lg max-w-none",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-gray-700 leading-relaxed mb-4",
            children: "Wine Spectator's Top 100 is our editors' annual selection of the year's most exciting wines. These 100 bottles represent the pinnacle of quality, value, and availability - wines that don't just score high, but deliver exceptional drinking experiences and tell compelling stories."
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-700 leading-relaxed mb-4",
            children: "Our expert panel tastes more than 15,000 wines blind each year. From this extensive evaluation, we select these 100 wines that exemplify excellence across all categories - from everyday values to once-in-a-lifetime splurges."
          }), /*#__PURE__*/_jsx("p", {
            className: "text-gray-700 leading-relaxed",
            children: "This year's list celebrates both tradition and innovation, featuring time-honored estates alongside exciting new discoveries. Each wine has earned its place through a combination of outstanding quality, fair pricing relative to its peers, and sufficient production to be found in the market."
          })]
        })
      })
    }), /*#__PURE__*/_jsxs("main", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12",
      children: [/*#__PURE__*/_jsx(TastingTracker, {
        tastingData: tastingData
      }), /*#__PURE__*/_jsx(AnalyticsDashboard, {
        wines: filteredAndSortedWines
      }), /*#__PURE__*/_jsx(WineFilters, {
        filters: filters,
        onFiltersChange: setFilters,
        sortBy: sortBy,
        onSortChange: setSortBy,
        totalWines: wines.length,
        filteredCount: filteredAndSortedWines.length
      }), filteredAndSortedWines.length > 0 ? /*#__PURE__*/_jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        children: filteredAndSortedWines.map(wine => /*#__PURE__*/_jsx(WineCard, {
          wine: wine,
          onViewDetails: w => {
            setSelectedWine(w);
            setIsModalOpen(true);
          },
          tastingData: tastingData,
          onTastingChange: handleTastingChange
        }, wine.id))
      }) : /*#__PURE__*/_jsxs("div", {
        className: "text-center py-20",
        children: [/*#__PURE__*/_jsx("h3", {
          className: "text-2xl font-semibold text-gray-900 mb-2",
          children: "No wines found"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-600 mb-6",
          children: "Try adjusting your filters to discover more exceptional wines."
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => setFilters({
            search: '',
            type: [],
            country: [],
            region: [],
            priceRange: [0, 20000],
            scoreRange: [0, 100],
            vintage: []
          }),
          className: "bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900",
          children: "Reset All Filters"
        })]
      })]
    }), /*#__PURE__*/_jsx(Footer, {}), /*#__PURE__*/_jsx(WineDetailModal, {
      wine: selectedWine,
      isOpen: isModalOpen,
      onClose: () => {
        setIsModalOpen(false);
        setSelectedWine(null);
      },
      tastingData: tastingData,
      onTastingChange: handleTastingChange
    }), /*#__PURE__*/_jsx(AIAssistant, {
      wines: wines
    })]
  });
}
ReactDOM.render(/*#__PURE__*/_jsx(HomePage, {}), document.getElementById('root'));