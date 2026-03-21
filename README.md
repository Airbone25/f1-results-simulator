# F1 What-If Simulator

The F1 What-If Simulator is an interactive web application designed for Formula 1 fans to explore "alternate history" scenarios. By modifying race results from the 2025 season, users can instantly see how individual changes—such as a different winner or a critical DNF—would have shifted the Driver and Constructor Championship standings.

## Features

### Core Simulation Engine
- **Result Overrides**: Drag and drop drivers to reorder race finishes.
- **Status Toggling**: Toggle drivers between finishing positions and DNF/NC statuses.
- **Standings Recalculation**: Real-time math engine that aggregates points across the entire season based on user modifications.
- **Constructor Logic**: Automatically updates team points based on modified driver results.

### Immersive User Experience
- **Dynamic Themes**: Switch between team-specific UI modes (Ferrari, Red Bull, McLaren, Mercedes) which update the accent colors and background visuals.
- **Broadcast-Style UI**: Includes animated radio message tickers featuring famous driver quotes and official headshots.
- **Champion Reveal**: A dedicated podium view for the simulated championship winner, featuring driver assets and team branding.

## Technology Stack

### Frontend
- **React**: Component-based UI architecture.
- **Tailwind CSS**: Utility-first styling for a sleek, modern aesthetic.
- **Framer Motion**: High-performance animations for radio messages and transitions.
- **dnd-kit**: Robust drag-and-drop functionality for reordering race results.
- **Vite**: Modern frontend build tool for fast development.

### Backend
- **Node.js & Express**: Lightweight API to serve race data and handle simulation logic.
- **FileSystem (fs)**: Manages historical race data stored in JSON format.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository to your local machine.
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. Start the backend server from the root directory:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:3000.

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```
   The application will be accessible at the URL provided in your terminal (typically http://localhost:5173).

## Data Sources
The simulator uses 2025 season race data. Driver headshots and team assets are mapped to official Formula 1 media identifiers to ensure an authentic visual experience.

## Disclaimer
This project is an independent fan-made simulator and is not affiliated with the Formula 1 group of companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
