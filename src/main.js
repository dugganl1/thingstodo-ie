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
    container: "map",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
    center: [-6.2574, 53.3428], // Between St. Stephen's Green and Trinity
    zoom: 15, // Much more zoomed in
    pitch: 45,
    maxBounds: [
      [-6.5, 53.2], // Southwest corner
      [-6.0, 53.5], // Northeast corner
    ],
    maxZoom: 18,
    minZoom: 10,
  });

  // Hide labels immediately when style loads (before map renders)
  map.on("styledata", () => {
    const layersToHide = [
      "Road labels",
      "Highway junction",
      "Highway shield",
      "Highway shield (US)",
      "Highway shield interstate top (US)",
      "Highway shield interstate (US)",
      "Housenumber",
      "Place labels",
      "Station",
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
      "Public",
      "Sport",
      "Education",
      "Tourism",
      "Culture",
      "Shopping",
      "Food",
      "Transport",
      "Healthcare",
      "Park",
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
  });

  // Update building colors after everything loads
  map.on("load", () => {
    map.setPaintProperty("Building 3D", "fill-extrusion-color", "#a8d5ba");
    console.log("Map loaded and styled!");
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
