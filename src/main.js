import "./style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Get the API key from environment
const apiKey = import.meta.env.VITE_MAPTILER_KEY;

if (!apiKey) {
  document.getElementById("app").innerHTML = `
    <h1>Missing API Key</h1>
    <p>Please add your MapTiler API key to the .env file</p>
  `;
} else {
  // Create the map
  const map = new maplibregl.Map({
    container: "app",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
    center: [-6.2603, 53.3498], // Dublin coordinates
    zoom: 12,
    pitch: 45, // Tilts the map for 3D effect
  });

  // Wait for map to load, then update building colors
  map.on("load", () => {
    // Just change the color of the existing "Building 3D" layer
    map.setPaintProperty("Building 3D", "fill-extrusion-color", "#a8d5ba"); // Green color like London map

    console.log("Building colors updated to green!");

    // Hide the busy layers to make it more minimal
    const layersToHide = [
      // Labels and text
      "Road labels",
      "Highway junction",
      "Highway shield",
      "Highway shield (US)",
      "Highway shield interstate top (US)",
      "Highway shield interstate (US)",
      "Housenumber",
      "Place labels",
      "Station", // This is likely train/bus stops
      "Airport gate",
      "Airport",
      "State labels",
      "Town labels",
      "City labels",
      "Capital city labels",
      "Country labels",
      "Continent labels",
      "River labels",
      "Ocean labels",
      "Lake labels",

      // POI icons (points of interest)
      "Public",
      "Sport",
      "Education",
      "Tourism",
      "Culture",
      "Shopping",
      "Food",
      "Transport", // This might be bus/tram stops
      "Healthcare",
      "Park",

      // Transportation symbols
      "Gondola",
      "Ferry",
      "Oneway",
      "Cablecar",
      "Cablecar dash",
    ];

    layersToHide.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    });

    console.log("Map cleaned up - removed clutter but kept 3D buildings!");
  });

  // Add navigation controls
  map.addControl(new maplibregl.NavigationControl(), "top-right");

  // Smooth double-click zoom
  map.on("dblclick", (e) => {
    map.flyTo({
      center: e.lngLat,
      zoom: map.getZoom() + 2,
      pitch: 60,
      duration: 1500,
    });
  });

  // Smooth right-click to orbit
  map.on("contextmenu", (e) => {
    e.preventDefault();
    map.flyTo({
      bearing: map.getBearing() + 45,
      duration: 1000,
    });
  });

  console.log("Map created successfully!");
}
