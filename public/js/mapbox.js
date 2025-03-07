export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicWVzeW1paHl2byIsImEiOiJjbTZ5bWxwaDAwaXZvMmxvaTV5cWczajRhIn0.sv61VHHK1yGRsXmbMVMngQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/qesymihyvo/cm6ymr2nj00cs01slgl4n56rd",
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
