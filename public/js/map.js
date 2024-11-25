mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map", // container ID
    style:"mapbox://styles/mapbox/streets-v12",
    center:listing.geometry.coordinates, // default position [lng, lat]
    zoom: 9// default zoom
});

// Ensure that the coordinates passed from the backend are valid

// console.log(coordinates);
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`)
.setMaxWidth("300px"))
.addTo(map);