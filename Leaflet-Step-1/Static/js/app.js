

var myMap = L.map('mapid').setView([37.7749, -122.4194], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

//End point
var queryUrl="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Get data for the map
// d3.json(queryUrl).then(function(data){
//   console.log(data.features)
// });

//  GET color radius call to the query URL
d3.json(queryUrl).then(function(data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // set different color from magnitude
    function getColor(magnitude) {
    switch (true) {
    case magnitude>9:
      return "#4e004f";
    case magnitude>8:
      return "#722040";
    case magnitude>7:
      return "#af2d46";
    case magnitude>6:
      return "#d3394c";
    case magnitude > 5:
      return "#ff4200";
    case magnitude > 4:
      return "#ff6600";
    case magnitude > 3:
      return "#ffbd58";
    case magnitude > 2:
      return "#fbf2a1";
    case magnitude > 1:
      return "#106e45";
    default:
      return "#c2f9ff";
    }
  }

// get earthquake level
function earthquakeLevel(magnitude) {
  switch (true) {
  case magnitude>9:
    return "Desaster";
  case magnitude>8:
    return "Extreme Accedent";
  case magnitude>7:
    return "Mayor Accedent";
  case magnitude>6:
    return "Serius Accedent";
  case magnitude > 5:
    return "Accedent with off-site risk";
  case magnitude > 4:
    return "Accedent without off-site risk";
  case magnitude > 3:
    return "Serius incident";
  case magnitude > 2:
    return "Incident";
  case magnitude > 1:
    return "Anormaly";
  default:
    return "Not Felt";
  }
}

  // set radiuss from magnitude
    function getRadius(magnitude) {
    if (magnitude === 0) {
      return 2;
    }

    return magnitude * 6;
  }


    // GeoJSON layer
    L.geoJson(data, {
      // Maken cricles
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // cirecle style
      style: styleInfo,
      // popup for each marker
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h4> Earthquake Level: "+ earthquakeLevel(feature.properties.mag)+"</h4>"+
        "<hr><p>Magnitude: <strong>" + feature.properties.mag + "</strong></p>"
        +"<p>Location: " + feature.properties.place +"</p>"
        +"<p>Time:"+  new Date(feature.properties.time) +"</p>");
      }
    }).addTo(myMap);
  
    //Adding legend
    let legend=L.control({
      position:'bottomleft'
    });

    legend.onAdd=function(map){

      //create container 
      var div=L.DomUtil.create("div", "legend_for_levels");

      div.innerHTML = "<h4>Magnitude</h4>"+
      "<table>"+
      "<tr><th style='background-color: #c2f9ff' heigth='15' width='15'>"+"</th><td>0-1</td>"+
      "<tr><th style='background-color: #106e45' heigth='15' width='15'>"+"</th><td>1-2</td>"+
      "<tr><th style='background-color: #fbf2a1' heigth='15' width='15'>"+"</th><td>2-3</td>"+
      "<tr><th style='background-color: #ffbd58' heigth='15' width='15'>"+"</th><td>3-4</td>"+
      "<tr><th style='background-color: #ff6600' heigth='15' width='15'>"+"</th><td>4-5</td>"+
      "<tr><th style='background-color: #ff4200' heigth='15' width='15'>"+"</th><td>5-6</td>"+
      "<tr><th style='background-color: #d3394c' heigth='15' width='15'>"+"</th><td>6-7</td>"+
      "<tr><th style='background-color: #af2d46' heigth='15' width='15'>"+"</th><td>7-8</td>"+
      "<tr><th style='background-color: #722040' heigth='15' width='15'>"+"</th><td>8-9</td>"+
      "<tr><th style='background-color: #4e004f' heigth='15' width='15'>"+"</th><td>9+</td>"
      

        return div;
    };

  

    //Add legend
    legend.addTo(myMap);




  
  });
