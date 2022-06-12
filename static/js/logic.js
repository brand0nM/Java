let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`,
    maxZoom: 18,
    accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
let baseMaps = {
  Street: streets,
  Dark: dark
};
let map = L.map('mapid', {center: [44.0, -80.0],zoom: 2,layers: [streets]})
L.control.layers(baseMaps).addTo(map);

let airportData = "https://raw.githubusercontent.com/brand0nM/Java/main/torontoRoutes.json";

d3.json(airportData).then(function(data) {
    data.features.forEach(function(row){
        row.properties.popupContent = `<h2>Airport Code: ${row.properties.faa}</h2> <hr> 
                                    <h3>Airport Name: ${row.properties.name}</h3>`
    });
    L.geoJSON(data, {
        onEachFeature: function onEachFeature(features, layer) {
            if (features.properties && features.properties.popupContent) {
                layer.bindPopup(features.properties.popupContent);
            }
        }
    }).addTo(map)
});
