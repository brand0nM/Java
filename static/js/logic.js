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


// Functions to create legends


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


// Default show Earthquakes layer and legend


populateLegend2();
earthquakes.addTo(map);


// Logic to listen for changes and create legends


let clicked1 = true;
let clicked2 = false;
document.querySelectorAll(".leaflet-control-layers-selector")[4].onclick = function(){ // listen to if input is clicked
    if (clicked1){legend2.remove(); //  remove existing legend
    } else {populateLegend2()}; // create legend if doesn't exist
    clicked1 = !clicked1};
document.querySelectorAll(".leaflet-control-layers-selector")[5].onclick = function(){
    if (clicked2){legend1.remove();
    } else {populateLegend1()};
    clicked2 = !clicked2};


