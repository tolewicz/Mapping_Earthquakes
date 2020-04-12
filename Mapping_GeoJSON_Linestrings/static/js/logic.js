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
let satelite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Satelite: satelite
  };

  //making baseline map
  let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: satelite //setting one base layer, otherwise it's all gray
})


// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/tolewicz/Mapping_Earthquakes/master/torontoRoutes.json";

d3.json(torontoData).then(function(data){
    console.log(torontoData);
    L.geoJson(data,{ 
      color: "yellow",
      weight: 1,
              onEachFeature: function(feature, layer) {
                console.log(layer);
              layer.bindPopup("<h3>" + "Airport Code:" + feature.properties.airline +  "</h3>" + "<hr>" +
                            "<h3>" + "Airport Name:" + feature.properties.dst + "</h3>");
             }
        
        }).addTo(map);
});


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);