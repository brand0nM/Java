// Map Layers
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
//C Create empty map
let map = L.map('mapid', {center: [0, 0],zoom: 2,layers: [dark]})
let earthquakes = new L.LayerGroup();
// Define Layers toggle
let baseMaps = {
  Dark: dark,
  Street: streets,
  Satellite: satellite
};
let overlays = {
    Earthquakes: earthquakes
};
// Define toggle method
L.control.layers(baseMaps, overlays).addTo(map);
// Define map logic outside of json call for memory
function styleInfo(feature) {
    return {opacity: 1,fillOpacity: 1,fillColor: getColor(feature.properties.mag),color: "#000000",
                radius: getRadius(feature.properties.mag),stroke: true,weight: 0.5};
};
function getRadius(magnitude) {
  if (magnitude === 0) {return 1;}
  return magnitude * 4;
}
function getColor(magnitude) {
  if (magnitude > 5) {return "#ea2c2c";}
  if (magnitude > 4) {return "#ea822c";}
  if (magnitude > 3) {return "#ee9c00";}
  if (magnitude > 2) {return "#eecc00";}
  if (magnitude > 1) {return "#d4ee00";}
  return "#98ee00";
}
//perform json call using d3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
});
// Create a legend
let legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};
legend.addTo(map);









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
