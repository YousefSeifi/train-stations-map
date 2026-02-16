# German Train Stations Viewer 🚆🇩🇪

A modern **React + Vite** project to explore German train stations.  
Users can filter stations by city and view their locations on an interactive map.

This project leverages **React Query** for data fetching and **TailwindCSS** for styling.

---

## Features ✨

- Search train stations by city (case-insensitive)
- Interactive map to view selected station
- Dynamic list highlighting selected station
- Error handling for empty or invalid searches
- Responsive layout for mobile and desktop
- Smooth loading animations

---

## Technologies Used 🛠

- **React 18** – UI Library
- **Vite** – Fast build & dev server
- **TailwindCSS** – Utility-first styling
- **React Query (TanStack Query)** – Data fetching & caching
- **Leaflet / MapView Component** – Map integration

---

## Getting Started 🚀

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/train-stations-map.git
cd train-stations-map
```

## Project Structure 📂
german-train-stations/
├─ public/                  
├─ src/
│  ├─ api/
│  │   └─ stations.js       
│  ├─ components/
│  │   ├─ MapView.jsx        
│  │   └─ MapUpdater.jsx    
│  ├─ hooks/
│   │   └─ useStations.js    
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ vite.config.js
└─ README.md
