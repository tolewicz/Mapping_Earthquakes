// Add console.log to check to see if our code is working.
console.log("working");


//MAP STYLES
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
  zoom: 2,
	layers: streets //setting one base layer, otherwise it's all gray
});

// Accessing the earthquake GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Accessing tectonic plates data
let tectonicData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Create the earthquake layer for our map. "L.layerGroup()" calls out the array of map layers
let earthquakes = new L.layerGroup();
let tectonic = new L.layerGroup();


// We define an object that contains the overlays.
// // This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes,
  Tectonic: tectonic 
};

//Adding daytime information
function dateConversion(binaryDate){
  var myDate = new Date(binaryDate);
  convertedDate = myDate.toLocaleString();
  return convertedDate
}

//Setting color and radius style for earthquake circles
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

//color f-n sets color based on earthquake magnitude
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

//setting radius of the circle based on magnitude
function getRadius(magnitude) {
  
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
};


//making tectonic data layer
d3.json(tectonicData).then(function(data){
    console.log(data)
    L.geoJson(data, { //adding fancy deatures to the layer
    weight:2,
    color: "red"
    }).addTo(tectonic); //that will add above code to "overlayers" 
    tectonic.addTo(map)
  })


//making earthquake data layer
d3.json(earthquakeData).then(function(data){
  console.log(data)
  
  L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
              //console.log(data);
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
        
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function () {
          var div = L.DomUtil.create('div', 'info legend');
          
          //defining magnitude intervals for color ranges
          const magnitudes = [0,1,2,3,4,5];
           

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
            
            //we use getColor() function to assign color to provided magnitude
            '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }
    //console.log(colors)  

    return div;
};

  //adding legend to map
    legend.addTo(map);

    });
   


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);
