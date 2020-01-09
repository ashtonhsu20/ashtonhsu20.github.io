var width = 960,
    height = 500;

var projection = d3.geo.albersUsa();
var path = d3.geo.path().projection(projection);
var svg = d3.select("#map1").append("svg")
    .attr("width", width)
    .attr("height", height);

var radiusScale = d3.scale.sqrt();
var states,p1Data,drawnCity=[];
var mapcount = ["1","12","54"];
var mapradius = [radiusScale(54)*10,radiusScale(12)*10,radiusScale(1)*10]
var mapsvgL = d3.select("#map1").append("svg").attr("class","biggerLegend").attr("height","400");
var statePaths = svg.append("g");


d3.csv("data/p1Dataset.csv", function (error, rows) {
  p1Data=rows;
});

//draws map with circles over each state
d3.json("data/us.json", function(error, shapes) {

	states = topojson.feature(shapes, shapes.objects.states).features;	
  
  //draws map
	statePaths.selectAll("path").data(states).enter()
		.append("path").attr("d", path)
		.style("fill", function(){
			return "#B0B0B0";
		})
		.style("stroke", "black");
  
  //draws circles over each state
  d3.csv("data/newCities.csv", function(error, data) {
    statePaths.selectAll("circle").data(data).enter()
     .append("circle")
       .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
       })
       .attr("r", function(d){
        for (var i=0; i < p1Data.length;i++){
          //check to see if city and state match
          if ((p1Data[i]["City"]==d["city"]) && (p1Data[i]["State"]==d["state"]) ){

            return radiusScale(p1Data[i]["4 major leagues champions overall"])*10;
          }
        }
        return 0;
       })
       .style("fill", "blue")
       .style("opacity",0.5);
  });
});


var colororange = d3.scale.linear()
    .domain([0, 10])
    .range(["white", "orange"])

var colorred = d3.scale.linear()
    .domain([0, 10])
    .range(["white", "red"])

var colorBlue = d3.scale.linear()
    .domain([0, 10])
    .range(["white", "#1F4865"])

var colorgrey = d3.scale.linear()
    .domain([0, 10])
    .range(["white", "grey"])

var colorgreen = d3.scale.linear()
    .domain([0, 30])
    .range(["white", "green"])
  
//draw wins for each state
d3.csv("data/p1State.csv", function(error,data) {
  var dataset = data
  data.forEach(function(d){
    var state = d['State']
    var nbachamp = d['NBA']
    var mlbchamp = d['MLB']
    var nflchamp = d['NFL + AFL + AAFC']
    var nhlchamp = d['NHL']
    var totalchamp = d['Total']

    nba.updateChoropleth(help_nba(state,nbachamp))
    mlb.updateChoropleth(help_mlb(state,mlbchamp))
    nfl.updateChoropleth(help_nfl(state,nflchamp))
    nhl.updateChoropleth(help_nhl(state,nhlchamp))
    total.updateChoropleth(help_total(state,totalchamp))

    });
});

var mlb = new Datamap({
  scope: 'usa',
  width: 600,
  height: 350,
  element: document.getElementById('container1'),
  geographyConfig: {
            highlightOnHover: false,
            popupOnHover: false,
            borderColor: "black",
        },
  fills: {
  defaultFill: colororange(0)
}
});

var nba = new Datamap({
  scope: 'usa',
  width: 600,
  height: 350,
  element: document.getElementById('container2'),
  geographyConfig: {
            highlightOnHover: false,
            popupOnHover: false,
            borderColor: "black",
        },
  fills: {
  defaultFill: colororange(0)
}
});

var nfl = new Datamap({
  scope: 'usa',
  width: 600,
  height: 350,
  element: document.getElementById('container3'),
  geographyConfig: {
            highlightOnHover: false,
            popupOnHover: false,
            borderColor: "black",
        },
  fills: {
  defaultFill: colororange(0)
}
});

var nhl = new Datamap({
  scope: 'usa',
  width: 600,
  height: 350,
  element: document.getElementById('container4'),
  geographyConfig: {
            highlightOnHover: false,
            popupOnHover: false,
            borderColor: "black",
        },
  fills: {
  defaultFill: colororange(0)
}
});

var total = new Datamap({
  scope: 'usa',
  width: 600,
  height: 350,
  element: document.getElementById('container5'),
  geographyConfig: {
            highlightOnHover: false,
            popupOnHover: false,
            borderColor: "black",
        },
  fills: {
  defaultFill: colororange(0)
}
});


//Draw pie charts for each city
var projection3 = d3.geo.albersUsa()

var path3 = d3.geo.path()
    .projection(projection3);

var radius = 90,
    padding = 10;

var color = d3.scale.ordinal()
    .range(["brown","orange","#3B6380","#C4C4C4"]);

var arc = function(d){
  console.log(d);
  d.forEach(function(){return d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30)})
}

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

d3.csv("data/pie.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "City"; }));

  data.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });
  data.forEach(function(d) {
    var newData = pie(d.ages);
    var outR = Math.sqrt(newData[1].value+newData[2].value+newData[3].value+newData[0].value)*10
    var tempArc = d3.svg.arc().outerRadius(outR).innerRadius(0);
    if (outR>45){
    var tempSVG = d3.select("#map5").append("svg")
      .attr("width", outR*2+80)
      .attr("height", outR*2+80)
      .attr("class","pieChart")
    var svg5 = tempSVG.selectAll(".arc")
      .data(newData)
    .enter().append("g")
      .attr("class", ".arc")
      .attr("transform", "translate(" + radius + "," + radius + ")");
    svg5.append("path")
      .attr("d", tempArc)
      .style("fill", function(d) { return color(d.data.name); });
    svg5.append("text")
      .attr("dy", -(outR+5))
      .attr("dx", -(outR+10))
      .style("text-anchor", "top")
      .style("font-size","15px")
      .text(d.City);
    }
    else if (outR>25){
    var tempSVG = d3.select("#map5").append("svg")
      .attr("width", outR*2+100)
      .attr("height", outR*2+100)
      .attr("class","pieChart")
    var svg5 = tempSVG.selectAll(".arc")
      .data(newData)
    .enter().append("g")
      .attr("class", ".arc")
      .attr("transform", "translate(" + radius + "," + radius + ")");
    svg5.append("path")
      .attr("d", tempArc)
      .style("fill", function(d) { return color(d.data.name); });
    svg5.append("text")
      .attr("dy", -(outR+15))
      .attr("dx", -(outR+20))
      .style("text-anchor", "top")
      .style("font-size","12px")
      .text(d.City);
    }
    else {
      var tempSVG = d3.select("#map5").append("svg")
      .attr("width", outR*2+110)
      .attr("height", outR*2+110)
      .attr("class","pieChart")
      var svg5 = tempSVG.selectAll(".arc")
            .data(newData)
          .enter().append("g")
            .attr("class", ".arc")
            .attr("transform", "translate(" + radius + "," + radius + ")");
          svg5.append("path")
            .attr("d", tempArc)
            .style("fill", function(d) { return color(d.data.name); });
          svg5.append("text")
            .attr("dy", -(outR+10))
            .attr("dx", -(outR+20))
            .style("text-anchor", "top")
            .style("font-size","12px")
            .text(d.City);
    }
  })  
});


//helper functions for lookup on states
var help_mlb = function(state,champ){
    var dictionary = {}
    dictionary[state] = colorred(champ)
    return dictionary;
    }

var help_nba = function(state,champ){
    var dictionary = {}
    dictionary[state] = colororange(champ)
    return dictionary;
    }

var help_nfl = function(state,champ){
    var dictionary = {}
    dictionary[state] = colorBlue(champ)
    return dictionary;
    }

var help_nhl = function(state,champ){
    var dictionary = {}
    dictionary[state] = colorgrey(champ)
    return dictionary;
    }

var help_total = function(state,champ){
    var dictionary = {}
    dictionary[state] = colorgreen(champ)
    return dictionary;
    }