export const QUOTES = [
  { text: "Is Charles catching him or not?", author: "Sky Sports F1" },
  { text: "Must be the water", author: "Sebastian Vettel" },
  { text: "Smooth Operator", author: "Carlos Sainz" },
  { text: "Simply Lovely", author: "Max Verstappen" },
  { text: "It's lights out and away we go!", author: "David Croft" },
  { text: "Leave me to it, I know what I'm doing!", author: "Kimi Raikkonen" },
  { text: "No, Michael, no! This is so not right!", author: "Toto Wolff" },
  { text: "Box, Box, Box!", author: "Race Engineer" }
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

// Placeholder URLs for driver headshots (using standard F1 media patterns where possible)
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
  "default": { name: "Standard", main: "#E10600", bg: "#020617" },
  "leclerc": { name: "Tifosi Red", main: "#E10600", bg: "#1a0000" },
  "verstappen": { name: "Orange Army", main: "#FF8000", bg: "#0f0800" },
  "norris": { name: "Papaya", main: "#FF8000", bg: "#0a0a0a" },
  "hamilton": { name: "Silver Arrow", main: "#27F4D2", bg: "#0a0a0a" }
};
