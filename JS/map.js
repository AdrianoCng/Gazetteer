const mymap = L.map('mapid').setView([51, -1.058], 10);

// Layers
const layerGroup = L.layerGroup().addTo(mymap);
const bordersLayer = L.layerGroup().addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWRyaWFub2NuZyIsImEiOiJja2N1ZGZ2Ym8wMjljMnhsanJnNzNleGtyIn0.eVRBimMzGRT3Z2MQkj2FQw'
}).addTo(mymap);
