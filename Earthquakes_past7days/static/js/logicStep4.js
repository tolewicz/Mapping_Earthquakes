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
	center: [39.5, -98.5],
  zoom: 3,
	layers: streets //setting one base layer, otherwise it's all gray
});

// Accessing the Toronto neighborhoods GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the earthquake layer for our map. "L.layerGroup()" calls out the array of map layers
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// // This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

//importing data from Json address and adding it as a layer to the map

function dateConversion(binaryDate){
  var myDate = new Date( binaryDate *1000);
  convertedDate = myDate.toLocaleString();
  return convertedDate
}

function styleInfo(feature) {
  magnitude = feature.properties.mag
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(magnitude),
    stroke: true,
    weight: 0.5,
    
  };
}

function getColor(magnitude){
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude >2) {
    return "#eecc00";
  }
  if (magnitude > 1){ 
    return "#d4ee00";
  }
  else {
  return "#98ee00";
  }
};

function getRadius(magnitude) {
  
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

function dateConversion(binaryDate){
  var myDate = new Date( binaryDate *1000);
  convertedDate = myDate.toLocaleString();
  return convertedDate
}

d3.json(earthquakeData).then(function(data){
  console.log(data)
  
  L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
              console.log(data);
              var rawDate = feature.properties.time;
              var quakePlace = feature.properties.place;
              var cmagnitude = feature.properties.mag

              console.log(dateConversion(rawDate));
              console.log(quakePlace);

              return L.circleMarker(latlng).bindPopup("<h3>" + "Location: " + quakePlace +  "</h3>" 
              + "<hr>" +"<h3>" + "Magnitude: " + cmagnitude +  "</h3>"+ "<h3>" + "time: " + convertedDate+  "</h3>");
            },
        
        //we apply the style features: circles, colorts etc
        style: styleInfo
        })
        .addTo(earthquakes); //that will add above code to "overlayers" 

        earthquakes.addTo(map) //that will add earthquakes to the map once its called
    });

      // weight:1,
  // fillColor: "yellow",
    
      //   quakePlace = layer.feature.properties.place
    //   console.log(layer.feature.properties["place"])
    //   rawDate = layer.feature.properties.time
    //   console.log(rawDate)
    //   console.log(dateConversion(rawDate))
       
    //  layer.bindPopup("<h3>" + "location:" + layer.feature.properties.place +  "</h3>" + "<hr>" +
    //  "<h3>" + "time: " + convertedDate+  "</h3>")
     


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);
