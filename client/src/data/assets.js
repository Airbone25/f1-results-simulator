export const QUOTES = [
  { 
    text: "Simply Lovely", 
    author: "Max Verstappen", 
    code: "VER", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
    color: "#3671C6"
  },
  { 
    text: "Hammer Time, Lewis", 
    author: "Lewis Hamilton", 
    code: "HAM", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png",
    color: "#E10600"
  },
  { 
    text: "I think I've got a problem...", 
    author: "George Russell", 
    code: "RUS", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png",
    color: "#27F4D2"
  },
  { 
    text: "Smooth Operator", 
    author: "Carlos Sainz", 
    code: "SAI", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png",
    color: "#64C4FF"
  }
];

export const TEAM_ASSETS = {
  "Red Bull Racing": { color: "#3671C6", secondary: "#FCD700", accent: "#E10600" },
  "McLaren": { color: "#FF8000", secondary: "#5DBEF5", accent: "#000000" },
  "Ferrari": { color: "#E10600", secondary: "#FCD700", accent: "#000000" },
  "Mercedes": { color: "#27F4D2", secondary: "#C0C0C0", accent: "#000000" },
  "Aston Martin": { color: "#229971", secondary: "#CEDC00", accent: "#000000" },
  "Haas F1 Team": { color: "#B6BABD", secondary: "#E10600", accent: "#000000" },
  "Williams": { color: "#64C4FF", secondary: "#005AFF", accent: "#FFFFFF" },
  "Alpine": { color: "#0093CC", secondary: "#FF87BC", accent: "#000000" },
  "Racing Bulls": { color: "#6692FF", secondary: "#FFFFFF", accent: "#CC1E41" },
  "Kick Sauber": { color: "#52E252", secondary: "#000000", accent: "#FFFFFF" }
};

export const DRIVER_ASSETS = {
  "1": { name: "Max Verstappen", code: "VER", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png" },
  "81": { name: "Oscar Piastri", code: "PIA", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png" },
  "4": { name: "Lando Norris", code: "NOR", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png" },
  "16": { name: "Charles Leclerc", code: "LEC", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png" },
  "63": { name: "George Russell", code: "RUS", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png" },
  "14": { name: "Fernando Alonso", code: "ALO", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png" },
  "44": { name: "Lewis Hamilton", code: "HAM", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png" },
  "55": { name: "Carlos Sainz", code: "SAI", headshot: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png" }
};

export const THEMES = {
  "default": { name: "Standard", main: "#E10600", bg: "#020617", car: "/cars/McLaren-2025-F1-scaled.webp" },
  "leclerc": { name: "Ferrari", main: "#E10600", bg: "#1a0000", car: "/cars/Ferrari-SF-25-front-render.webp" },
  "verstappen": { name: "Red Bull", main: "#3671C6", bg: "#000814", car: "/cars/McLaren-2025-F1-scaled.webp" },
  "norris": { name: "McLaren", main: "#FF8000", bg: "#0a0a0a", car: "/cars/McLaren-2025-F1-scaled.webp" },
  "hamilton": { name: "Hamilton 25", main: "#E10600", bg: "#0a0a0a", car: "/cars/Ferrari-SF-25-front-render.webp" }
};
