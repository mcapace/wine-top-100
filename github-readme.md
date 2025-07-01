# Wine Spectator Top 100 - 2024 Edition

A React-based interactive web application showcasing Wine Spectator's Top 100 wines of 2024.

## Demo
[View Live Demo](https://your-username.github.io/wine-spectator-top-100/)

## Features
- 🍷 Interactive wine cards with detailed information
- 🔍 Advanced filtering and search capabilities
- 📊 Analytics dashboard with wine statistics
- 💾 Personal tasting tracker with localStorage
- 🤖 AI Assistant for wine recommendations
- 📱 Fully responsive design

## Technologies Used
- React 18 (via CDN)
- Tailwind CSS
- Chart.js
- LocalStorage for data persistence

## How to Use in Webflow

1. Visit the live demo URL above
2. In Webflow, add an HTML Embed element
3. Use this iframe code:
```html
<iframe 
  src="https://your-username.github.io/wine-spectator-top-100/" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none;">
</iframe>
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/wine-spectator-top-100.git
```

2. Open `index.html` in your browser

That's it! No build process required.

## Customization

To customize the wine data, edit the `wines` array in the `index.html` file:
```javascript
const wines = [
  {
    id: 1,
    rank: 1,
    name: "Your Wine Name",
    // ... other properties
  }
];
```

## License
This project is for educational purposes.