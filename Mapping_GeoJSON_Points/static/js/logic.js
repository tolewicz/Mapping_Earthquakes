// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// 

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
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
// ]};

// Grabbing our GeoJSON data. and putting point on the map, simple version
//L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data. method 1
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng).bindPopup("<h2>" + feature.properties.city + "</h2>")
//       ;
//     }

//   }).addTo(map);

//   // Grabbing our GeoJSON data. method 2
//   L.geoJson(sanFranAirport, {
//       onEachFeature: function(feature, layer) {
//         console.log(layer);
//       layer.bindPopup("<h2>" + "Airport Code:" + feature.properties.faa + "Airport Name:" + feature.properties.city + "</h2>");
//      }
// }).addTo(map);



//streets-v11   -std view
//dark-v10      -dark map
//satellite-streets-v11  -satelite view

//streets type map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
    accessToken: API_KEY
});

//satelite type map
let satelite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// dark map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a dictionary of maps with values as variables with urls to map type
let baseMaps = {
    Street: streets,
    Dark: dark,
    Satelite: satelite
  };

  
  let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [streets] //setting one base layer, otherwise it's all gray
})

let airportData = "https://raw.githubusercontent.com/tolewicz/Mapping_Earthquakes/master/majorAirports.json";

d3.json(airportData).then(function(data){
    console.log(airportData);
    L.geoJson(data,{ 
              onEachFeature: function(feature, layer) {
                console.log(layer);
              layer.bindPopup("<h3>" + "Airport Code:" + feature.properties.faa +  "</h3>" + "<hr>" +
                            "<h3>" + "Airport Name:" + feature.properties.name + "</h3>");
             }
        
        }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map. single layer
// streets.addTo(map);

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);