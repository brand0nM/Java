let map = L.map('mapid').setView([40.7, -94.5], 4);

cities.forEach(function(city){
    L.circleMarker(city.location,{radius: ((city.population - 200000)/100000), color:'violet', 
        fill:true, fillColor:'teal', weight:.5}).addTo(map)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + 
        city.population.toLocaleString('en-US') + "</h3>")
});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

streets.addTo(map);