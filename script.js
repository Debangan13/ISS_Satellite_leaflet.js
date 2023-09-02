
// creating leaflet map

const map = L.map('map').setView([51.505, -0.09],5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const myIcon = L.icon({
    iconUrl: 'space.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    popupAnchor: [1, -10],
});
     
const marker = L.marker(([0,0]),{icon: myIcon}).addTo(map)

const getData = async () => {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    const {latitude ,longitude,velocity} = data
    // console.log(latitude, longitude,velocity)
    document.getElementById("Latitude").textContent = latitude
    document.getElementById("Longitude").textContent = longitude
    document.getElementById("Velocity").textContent = velocity
    
    map.setView([latitude, longitude])
    marker.setLatLng([latitude, longitude])
    marker.bindPopup("I am a statlight.").openPopup();    
}
getData().catch(err => console.error(err))
setInterval( getData, 2000)

