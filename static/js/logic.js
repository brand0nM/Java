let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`,
    maxZoom: 18,
    accessToken: API_KEY
});
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`,
    maxZoom: 18,
    accessToken: API_KEY
});
let baseMaps = {
  Dark: dark,
  Street: streets,
  Satellite: satellite
};
let map = L.map('mapid', {center: [43.7, -79.3],zoom: 11,layers: [satellite]})
L.control.layers(baseMaps).addTo(map);


let torontoHoods = "https://raw.githubusercontent.com/brand0nM/Java/main/torontoNeighborhoods.json";
d3.json(torontoHoods).then(function(data){
    L.geoJSON(data).addTo(map);
});

// let torontoData = "https://raw.githubusercontent.com/brand0nM/Java/main/torontoRoutes.json";
// d3.json(torontoData).then(function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data,{
//     color:'yellow',
//     weight: 2,
//     onEachFeature: function onEachFeature(features, layer) {
//         layer.bindPopup(`<h2>Airlines: ${features.properties.airline}</h2> 
//                         <hr><h3>Destination: ${features.properties.dst}</h3>`);
//     }    
//   }).addTo(map);
// });


// let airportData = "https://raw.githubusercontent.com/brand0nM/Java/main/majorAirports.json";
// d3.json(airportData).then(function(data) {
//     data.features.forEach(function(row){
//         row.properties.popupContent = `<h2>Airport Code: ${row.properties.faa}</h2> <hr> 
//                                     <h3>Airport Name: ${row.properties.name}</h3>`
//     });
//     L.geoJSON(data, {
//         onEachFeature: function onEachFeature(features, layer) {
//             if (features.properties && features.properties.popupContent) {
//                 layer.bindPopup(features.properties.popupContent);
//             }
//         }
//     }).addTo(map)
// });
