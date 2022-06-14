// Map Layers


let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, 
                <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) 
                <a href="https://www.mapbox.com/">Mapbox</a>`, maxZoom: 18, accessToken: API_KEY
});
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`, maxZoom: 18, accessToken: API_KEY
});
let satellite = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: `Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`, maxZoom: 18, accessToken: API_KEY
});
let techtonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();
let map = L.map('mapid', {center: [0, 0],zoom: 2,layers: [dark,techtonicPlates]});  // Create Data layers and an Empty map
L.control.layers({Dark: dark,Street: streets,Satellite: satellite},  // Define toggle Layers for map and data type
        {TechtonicPlates: techtonicPlates,Earthquakes: earthquakes,MajorEarthquakes: majorEarthquakes}).addTo(map);


// Define map logic outside of json call for memory


function styleTech(feature) {return {color: "teal", weight: 1.5};};
function styleAll(feature) {return {opacity: 1,fillOpacity: 1,fillColor: getColorAll(feature.properties.mag),
    color: "#000000",radius: getRadius(feature.properties.mag),stroke: true,weight: 0.5};};
function styleTop(feature) {return {opacity: 1,fillOpacity: 1,fillColor: getColorTop(feature.properties.mag),
    color: "#000000",radius: getRadius(feature.properties.mag),stroke: true,weight: 0.5};};
function getRadius(magnitude) {if (magnitude === 0) {return 1;}
  return magnitude * 4;}
function getColorAll(magnitude) {
  if (magnitude > 5) {return "#ea2c2c";}
  if (magnitude > 4) {return "#ea822c";}
  if (magnitude > 3) {return "#ee9c00";}
  if (magnitude > 2) {return "#eecc00";}
  if (magnitude > 1) {return "#d4ee00";}
  return "#98ee00";}
function getColorTop(magnitude) {
  if (magnitude < 5) {return "orange";}
  if (magnitude > 6) {return "red";}
  return "yellow";}


// Use d3 to call and plot the data


d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json').then(function(data) {
    L.geoJSON(data, {style: styleTech}).addTo(techtonicPlates);
});
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    L.geoJSON(data, {pointToLayer: function(feature, latlng){return L.circleMarker(latlng);},style: styleTop, 
        onEachFeature: function(feature, layer) {layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + 
            feature.properties.place);}}).addTo(majorEarthquakes);   
    L.geoJSON(data, {pointToLayer: function(feature, latlng){return L.circleMarker(latlng);},style: styleAll,
        onEachFeature: function(feature, layer) {layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + 
            feature.properties.place);}}).addTo(earthquakes);
});


// Create legend layers and variables to acces them


let legend1 = L.control({position: "bottomright"});
let legend2 = L.control({position: "bottomright"});
function populateLegend1(){
    legend1.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = ['small','medium','large'];
        const colors = ['yellow','orange','red'];
        for (var i = 0; i < magnitudes.length; i++) {div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>": "+" );}
        return div};
    legend1.addTo(map)};
function populateLegend2(){
    legend2.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +="<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div};
    legend2.addTo(map)};

// default show
populateLegend2();
earthquakes.addTo(map);
document.querySelectorAll(".leaflet-control-layers-selector")[4].onclick = function(){
    // if clicked
        legend2.remove();
    // else if not clicked
        // populateLegend2();
};
document.querySelectorAll(".leaflet-control-layers-selector")[5].onclick = function(){
    // if clicked
        // legend1.remove();
    // else if not clicked
        populateLegend1();
};






























// let torontoHoods = "https://raw.githubusercontent.com/brand0nM/Java/main/torontoNeighborhoods.json";
// d3.json(torontoHoods).then(function(data){
//     console.log(data)
//     L.geoJSON(data, {
//         weight: 1,
//         color:'orange',
//         fillColor:'yellow',
//         onEachFeature: function onEachFeature(features, layer) {
//             layer.bindPopup(`<h2>Neighborhood: ${features.properties.AREA_NAME}</h2> 
//                             <hr>${features.properties.AREA_S_CD}</h3>`);
//         }          
//     }).addTo(map);
// });

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
