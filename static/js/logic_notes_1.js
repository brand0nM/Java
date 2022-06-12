// let map = L.map('mapid').setView([40.7, -94.5], 4);

// cities.forEach(function(city){
//     L.circleMarker(city.location,{radius: ((city.population - 200000)/100000), color:'violet', 
//         fill:true, fillColor:'teal', weight:.5}).addTo(map)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + 
//         city.population.toLocaleString('en-US') + "</h3>")
// });

// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// streets.addTo(map);

// // Create a polyline using the line coordinates and make the line yellow.
// // Coordinates for each point to be used in the polyline.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];
// L.polyline(line, {
//    color: "yellow"
// }).addTo(map);


// let map = L.map('mapid').setView([37.5, -122.5], 10);
// let sanFranAirport =
// [{"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]}];
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng);
//       .bindPopup("<h2>" + feature.properties.city + "</h2>")
//     }

//   }).addTo(map);


