// Add console.log to check to see if our code is working.
console.log("working");




//streets-v11   -std view
//dark-v10      -dark map
//satellite-streets-v11  -satelite view
//light-v10   -light view

//streets type map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
    accessToken: API_KEY
});

//satelite type map
let sateliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// light map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light,
    Satelite: sateliteStreets
  };

  //making baseline map
  let map = L.map('mapid', {
	center: [43.7, -79.3],
	zoom: 11,
	layers: streets //setting one base layer, otherwise it's all gray
});

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/tolewicz/Mapping_Earthquakes/master/torontoNeighborhoods.json";

//Json that is loaded has arrays of district that are build from arrys of micropolygons (4 coordinate points)
//like puzzles, 
//so some have e.g. 90 arrays, some more complicated have 500 arrays
//the addToMap, just add the puzzles on the map

//importing data from Json address and adding it as a layer to the map
d3.json(torontoHoods).then(function(data){
  console.log(data)
  L.geoJson(data, { //adding fancy deatures to the layer
  weight:1,
  fillColor: "yellow",
    onEachFeature: function(features, layer) {
      console.log(layer.feature.properties["AREA_NAME"])
      layer.bindPopup("<h3>" + "District Name:" + layer.feature.properties["AREA_NAME"]+  "</h3>")
    }

  }).addTo(map)
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);