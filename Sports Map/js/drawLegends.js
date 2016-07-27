var maplegend = mapsvgL.append("g")
    .attr("x",200)
    .attr("y",0)
    .attr("height", 400)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var maplegendCircle = maplegend.selectAll('circle').data(mapradius);
maplegendCircle.enter()
  .append("circle")
  .attr("cx", function(d,i){
    return mapradius[i]*.1+70;
  })
  .attr("r", function(d,i){
    return mapradius[i];
  })
  .attr("cy", function(d, i) {
      return mapradius[i]*3;
  })
  .style("fill", "blue")
  .style("opacity",0.5);

  
var maplegendText = maplegend.selectAll('text').data(mapcount);
maplegendText.enter()
  .append("text")
  .attr("x", function(d,i){
    return mapradius[i]*.1+66;
  })
  .attr("y", function(d, i) {
      return mapradius[i]*3;
  })
  .text(function(d, i) {
      return mapcount[2-i];
  })
  .style("alignment-baseline","central"); 

var mySports = ["MLB", "NBA", "NFL", "NHL"];
var myColors = ["#7e383e", "#dc981e", "#3B6380", "#C4C4C4"];
var svgL = d3.select("#biggercontainer").append("svg").attr("class","pieLegend");

var legend = svgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(50,70)");
    
var legendContainer = legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
var legendCircle = legend.selectAll('circle').data(myColors);
legendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return myColors[i];
  });

  
var legendText = legend.selectAll('text').data(mySports);
legendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return mySports[i];
  })
  .style("alignment-baseline","central");
  
//mlb legend
var mlbcount = ["35", "12", "9", "4","1","0"];
var mlbcolor = ["#ff0000", "#ff3333", "#ff6666", "#ff9999","#ffcccc","white"];

var mlbsvgL = d3.select("#container1").append("svg").attr("class","legend");

var mlblegend = mlbsvgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var mlblegendContainer = mlblegend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
    
var mlblegendCircle = mlblegend.selectAll('circle').data(mlbcolor);
mlblegendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return mlbcolor[i];
  })
  .style("stroke","black");

  
var mlblegendText = mlblegend.selectAll('text').data(mlbcount);
mlblegendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return mlbcount[i];
  })
  .style("alignment-baseline","central");  
  
//nba legend
var nbacount = ["17", "6", "5", "3","1","0"];
var nbacolor = ["#ff6600", "#ff8533", "#ffa366", "#ffc299","#ffe0cc","white"];

var nbasvgL = d3.select("#container2").append("svg").attr("class","legend");

var nbalegend = nbasvgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var nbalegendContainer = nbalegend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
    
var nbalegendCircle = nbalegend.selectAll('circle').data(nbacolor);
nbalegendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return nbacolor[i];
  })
  .style("stroke","black");

  
var nbalegendText = nbalegend.selectAll('text').data(nbacount);
nbalegendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return nbacount[i];
  })
  .style("alignment-baseline","central");  
  
//nfl legend
var nflcount = ["13", "10", "5", "4","1","0"];
var nflcolor = ["#1f4865", "#3b6380", "#5e819a", "#8ca7ba","#c0d1dc","white"];
//1f4865
var nflsvgL = d3.select("#container3").append("svg").attr("class","legend");

var nfllegend = nflsvgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var nfllegendContainer = nfllegend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
    
var nfllegendCircle = nfllegend.selectAll('circle').data(nflcolor);
nfllegendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return nflcolor[i];
  })
  .style("stroke","black");

  
var nfllegendText = nfllegend.selectAll('text').data(nflcount);
nfllegendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return nflcount[i];
  })
  .style("alignment-baseline","central");
  
//nhl legend
var nhlcount = ["11", "8", "5", "3","1","0"];
var nhlcolor = ["#5a5a5a", "#7b7b7b", "#9c9c9c", "#bdbdbd","#dedede","white"];

var nhlsvgL = d3.select("#container4").append("svg").attr("class","legend");

var nhllegend = nhlsvgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var nhllegendContainer = nhllegend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
    
var nhllegendCircle = nhllegend.selectAll('circle').data(nhlcolor);
nhllegendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return nhlcolor[i];
  })
  .style("stroke","black");

  
var nhllegendText = nhllegend.selectAll('text').data(nhlcount);
nhllegendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return nhlcount[i];
  })
  .style("alignment-baseline","central");
  
//total legend
var totcount = ["60", "44", "36", "18","4","0"];
var totcolor = ["#001900", "#004200", "#005200", "#4d864d","#b2cbc2","white"];

var totsvgL = d3.select("#container5").append("svg").attr("class","legend");

var totlegend = totsvgL.append("g")
    .attr("x",0)
    .attr("y",0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "translate(0,0)");
    
var totlegendContainer = totlegend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 70)
    .attr("height",80)
    .style("fill","white");
    
    
var totlegendCircle = totlegend.selectAll('circle').data(totcolor);
totlegendCircle.enter()
  .append("circle")
  .attr("cx", 10)
  .attr("r", 8)
  .attr("cy", function(d, i) {
      return 10 + i*20;
  })
  .style("fill", function(d, i) {
      return totcolor[i];
  })
  .style("stroke","black");

  
var totlegendText = totlegend.selectAll('text').data(totcount);
totlegendText.enter()
  .append("text")
  .attr("x", 25)
  .attr("y", function(d, i) {
      return 10 + i*20;
  })
  .text(function(d, i) {
      return totcount[i];
  })
  .style("alignment-baseline","central");
