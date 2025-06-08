import "./style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Clean palette theme
const cleanPalette = {
  water: "#e9e9e9", // Light gray water
  landscape: "#f5f5f5", // Very light gray land
  roads: "#ffffff", // White roads
  poi: "#f5f5f5", // Light gray POIs
  parks: "#dedede", // Slightly darker gray for parks
  text: "#333333", // Dark gray text
  administrative: "#fefefe", // Almost white boundaries
};

// Landmark data with zoom tiers for responsive display
const landmarks = {
  type: "FeatureCollection",
  features: [
    // Dublin's Top 25 Pubs (from dublinbypub.ie)
    {
      type: "Feature",
      properties: {
        name: "The Flowing Tide",
        tier: 1,
        type: "Pub",
        rank: 1,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2649, 53.3515],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "J.M Cleary's",
        tier: 1,
        type: "Pub",
        rank: 2,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2485, 53.3558],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Lord Edward",
        tier: 1,
        type: "Pub",
        rank: 3,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2687, 53.3434],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fallon's",
        tier: 1,
        type: "Pub",
        rank: 4,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2755, 53.3398],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Mulligan's",
        tier: 1,
        type: "Pub",
        rank: 5,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2545, 53.3467],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Palace",
        tier: 1,
        type: "Pub",
        rank: 6,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2638, 53.3449],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Kings Inn",
        tier: 1,
        type: "Pub",
        rank: 7,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2654, 53.3512],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Piper's Corner",
        tier: 1,
        type: "Pub",
        rank: 8,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2582, 53.3523],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Thomas House",
        tier: 1,
        type: "Pub",
        rank: 9,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2745, 53.3425],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "J'O Connell's",
        tier: 1,
        type: "Pub",
        rank: 11,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2598, 53.3365],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Cobblestone",
        tier: 1,
        type: "Pub",
        rank: 12,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2778, 53.3475],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Ryan's of Parkgate Street",
        tier: 1,
        type: "Pub",
        rank: 13,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2845, 53.3465],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Bowe's",
        tier: 1,
        type: "Pub",
        rank: 14,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2642, 53.3448],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Grogan's",
        tier: 1,
        type: "Pub",
        rank: 15,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2615, 53.3415],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Long Hall",
        tier: 1,
        type: "Pub",
        rank: 17,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2635, 53.3418],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "J McNeill's",
        tier: 1,
        type: "Pub",
        rank: 18,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2668, 53.3498],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Oval",
        tier: 1,
        type: "Pub",
        rank: 19,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2615, 53.3485],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Toner's",
        tier: 1,
        type: "Pub",
        rank: 20,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2516, 53.3373],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "The Foggy Dew",
        tier: 1,
        type: "Pub",
        rank: 25,
      },
      geometry: {
        type: "Point",
        coordinates: [-6.2648, 53.3452],
      },
    },
  ],
};

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

  // Hide labels and apply clean theme when style loads
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

  // Apply clean theme colors after everything loads
  map.on("load", () => {
    // Update building colors - keep the green tint for 3D buildings
    if (map.getLayer("Building 3D")) {
      map.setPaintProperty("Building 3D", "fill-extrusion-color", "#a8d5ba"); // Original green tint
    }
    if (map.getLayer("Building")) {
      map.setPaintProperty("Building", "fill-color", cleanPalette.poi);
    }

    // Add landmark markers
    map.addSource("landmarks", {
      type: "geojson",
      data: landmarks,
    });

    // Single landmark layer - no tiers, pitch-aligned to lay flat
    map.addLayer({
      id: "landmarks",
      type: "circle",
      source: "landmarks",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 8, 18, 14],
        "circle-color": "rgba(255, 255, 255, 0.95)",
        "circle-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0.8, 18, 0.9],
        "circle-pitch-alignment": "map",
      },
    });

    // Add a subtle pulsing effect layer underneath
    map.addLayer(
      {
        id: "landmarks-pulse",
        type: "circle",
        source: "landmarks",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 18, 18, 28],
          "circle-color": "rgba(220, 53, 69, 0.4)", // Warm red glow
          "circle-opacity": 0.2,
          "circle-pitch-alignment": "map",
        },
      },
      "landmarks"
    );

    // Add click interaction for landmarks
    map.on("click", "landmarks", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name;
      const type = e.features[0].properties.type;
      const rank = e.features[0].properties.rank;

      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `<div style="font-family: sans-serif; color: ${cleanPalette.text};">
          <strong>${name}</strong><br>
          <small>${type} • Ranked #${rank} in Dublin</small>
        </div>`
        )
        .addTo(map);
    });

    // Change cursor on hover
    map.on("mouseenter", "landmarks", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "landmarks", () => (map.getCanvas().style.cursor = ""));

    // Start the pulsing animation using paint property updates
    let pulseDirection = 1;
    let currentOpacity = 0.2;

    function animatePulse() {
      if (map.getLayer("landmarks-pulse")) {
        currentOpacity += pulseDirection * 0.01; // Slower movement

        if (currentOpacity >= 0.5) {
          pulseDirection = -1;
        } else if (currentOpacity <= 0.1) {
          pulseDirection = 1;
        }

        map.setPaintProperty("landmarks-pulse", "circle-opacity", currentOpacity);
      }
    }

    // Slower breathing effect at 30fps
    setInterval(animatePulse, 33);

    console.log("Map loaded with clean theme applied!");
  });

  // Add navigation controls
  //.addControl(new maplibregl.NavigationControl(), "top-right");

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
