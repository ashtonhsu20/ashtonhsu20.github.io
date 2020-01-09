//draws maps
function makeChloroplethMap(){
  //if data has been parsed then go, else wait
  if (preProcessDoneDrugs && preProcessDoneObesity && preProcessDoneMarijuana && preProcessDoneAlcohol && preProcessDoneNonMarijuana && preProcessDoneTobacco && preProcessDoneIncome && preProcessDoneViolentCrime) {

    //map JSON is part of datamaps JS library
    map1 = new Datamap({
      scope: 'usa',
      width: 700,
      height: 400,
      element: document.getElementById('map1'),
      geographyConfig: {
                highlightOnHover: true,
                   popupTemplate: function(geography, data) {
                          return "<div class='hoverinfo'><div class='hover_state'>" + geography.properties.name + "</div>" +
                          "<div class='hover_illicit_drugs'>Illicit Drugs <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,illicit_drugs_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Median Income <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,income)+"</span></div>"+
                          "<div class='hover_illicit_drugs'>Obesity <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,obesity_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Hard Drugs <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,non_marijuana_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Marijuana <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,marijuana_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Tobacco <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,tobacco_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Alcohol <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,alcohol_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Violet Crime <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,violent_crime_percent)+"%</span></div>"+
                          "<div class='hover_illicit_drugs'>Property Crime <span class='hover_illicit_percent'>" +  getPercentByState(geography.properties.name,property_crime_percent)+"%</span></div>";
                          },
                borderColor: "black",
            },
      fills: {
      defaultFill: "white"
      }
    });

    DrawGraph(0,map1);
    DrawLegend(illicit_drugs_percent);
  }
  else {
      setTimeout(makeChloroplethMap,100);
  }
  
}


//fills graphs with color and updates slider text
//this function is called when the page first loads and when the slider changes position
var DrawGraph = function(value,map){
  var data = illicit_drugs_percent;
  var buttonId=['drug_button','income_button','obesity_button','hard_drugs_button','marijuana_button','tobacco_button','alcohol_button','violent_crime_button','property_crime_button'];

  //set slider text to color of graph
  if(map==map1){
    d3.selectAll('.'+buttonId[value]).style({'color':'#970000'});
    //set previous text to old style
    d3.selectAll('.'+buttonId[oldRedSlider]).style({'color':'black','font-size': '14px'});
    oldRedSlider=value;
  }
  d3.selectAll('.'+buttonId[oldRedSlider]).style({'color':'#970000','font-size': '14px'});
  // d3.selectAll('.'+buttonId[oldBlueSlider]).style({'color':'blue','font-weight': 'bold','font-size': '14px'});

    if(value == 1){
      data = income;
    }
    else if(value ==2){
      data = obesity_percent;
    }
    else if(value ==3){
      data = non_marijuana_percent;
    }
    else if(value ==4){
      data = marijuana_percent;
    }
    else if(value ==5){
      data = tobacco_percent;
    }
    else if(value ==6){
      data = alcohol_percent;
    }
    else if(value ==7){
      data = violent_crime_percent;
    }
    else if(value ==8){
      data = property_crime_percent;
    }
    //have to recalculate color scale
    var max = d3.max(data,function(d){
        //if string, need to parse
        if(typeof d["Percent"] =="string"){
          return parseFloat(d["Percent"].replace(',',''));
        }
        else{
          return Number((d["Percent"]))
        }
      });

    var min = d3.min(data,function(d){
        //if string, need to parse
        if(typeof d["Percent"] =="string"){
          return parseFloat(d["Percent"].replace(',',''));
        }
        else{
          return Number((d["Percent"]))
        }
      });

    colorRed=d3.scale.linear()
      .domain([min-min*.1,max])
      .range(["#FCFBFB", "#970000"]);

    colorBlue = d3.scale.linear()
      .domain([min-min*.1,max])
      .range(["#FCFBFB", "blue"]);

    //function goes through each state in map and redraws color
    data.forEach(function(d){
      var stateName = d['State']
      var StateAbbreviation = stateNameToAbbreviation[stateName];
      //replace commas
      if(typeof d["Percent"] =="string"){
        var drugPercent = parseFloat(d["Percent"].replace(',',''));
      }
      else{
        var drugPercent =(d['Percent']);
      }
      if(map == map1){
        map.updateChoropleth(help_choloropleth_red(StateAbbreviation,drugPercent));
      }
      else{
        map.updateChoropleth(help_choloropleth_blue(StateAbbreviation,drugPercent));
      }
    });
    if(map == map1){
      UpdateLegend(data,1);
    }
    else{
      UpdateLegend(data,2);
    }
    
}


//called once to draw initial legend
var DrawLegend = function(data){

  var svgL = d3.select("#map_container1").append("svg").attr("class","legend_container");

  var legend = svgL.append("g")
      .attr("x",0)
      .attr("y",0)
      .attr("width", 300)
      .attr("height",300)
      .style("fill","blue");

  //calc values
  var max = d3.max(data,function(d){
      //if string, need to parse
      if(typeof d["Percent"] =="string"){
        return parseFloat(d["Percent"].replace(',',''));
      }
      else{
        return Number((d["Percent"]))
      }
    });

  var min = d3.min(data,function(d){
      //if string, need to parse
      if(typeof d["Percent"] =="string"){
        return parseFloat(d["Percent"].replace(',',''));
      }
      else{
        return Number((d["Percent"]))
      }
    });

  var minY = 0;
  var maxY = 200;

  var gradient = svgL
      .append("linearGradient")
      .attr("y1", minY)
      .attr("y2", maxY)
      .attr("x1", "0")
      .attr("x2", "0")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      
    gradient
      .append("stop")
      .attr("offset", "0")
      .attr("stop-color", colorRed(max));

    gradient
      .append("stop")
      .attr("offset", "1")
      .attr("stop-color", colorRed(min));

    svgL
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", minY)
      .attr("width", 20)
      .attr("height", maxY)
      .attr("fill", "black")
      .attr("fill", "url(#gradient)");
    
    var legendText = legend.selectAll('text').data([1]);
    legendText.enter()
      .append("text")
      .attr("x", 25)
      .attr("y", 10)
      .text(max+"%")
      .attr("fill", "black")
      .attr("id","legendMaxText")
      .style("alignment-baseline","central")
      // .style("font-size","16"); 

    legendText.enter()
      .append("text")
      .attr("x", 25)
      .attr("y", maxY-10)
      .text(min+"%")
      .attr("fill", "black")
      .attr("id","legendMinText")
      .style("alignment-baseline","central")
      // .style("font-size","16"); 

    legendTopText = legendMaxText;
    legendBottomText = legendMinText;

  data = income;
  var svgL = d3.select("#map_container2").append("svg").attr("class","legend_container");
  var oldMin=min;
  var oldMax = max;
  var legend = svgL.append("g")
      .attr("x",0)
      .attr("y",0)
      .attr("width", 300)
      .attr("height",300)
      .style("fill","blue");

  //calc values
  max = d3.max(data,function(d){
       return (d["Percent"])
    });

  min = d3.min(data,function(d){
       return (d["Percent"])
    });

  var minY = 0;
  var maxY = 200;

  var gradient = svgL
      .append("linearGradient")
      .attr("y1", minY)
      .attr("y2", maxY)
      .attr("x1", "0")
      .attr("x2", "0")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      
    gradient
      .append("stop")
      .attr("offset", "0")
      .attr("stop-color", colorBlue(oldMax));

    gradient
      .append("stop")
      .attr("offset", "1")
      .attr("stop-color", colorBlue(oldMin));

    svgL
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", minY)
      .attr("width", 20)
      .attr("height", maxY)
      .attr("fill", "black")
      .attr("fill", "url(#gradient)");
    
    var legendText = legend.selectAll('text').data([1]);

    legendText.enter()
      .append("text")
      .attr("x", 25)
      .attr("y", maxY-10)
      .text(min)
      .attr("fill", "black")
      .attr("id","legendMinText2")
      .style("alignment-baseline","central")
      // .style("font-size","16"); 

}

//called everytime slider is moved
var UpdateLegend = function(data,mapNum){
  if(mapNum==1){
    if(legendTopText!=undefined){
      var max = d3.max(data,function(d){
        return d["Percent"]
      });

    var min = d3.min(data,function(d){
        return d["Percent"]
      });
      if(typeof max =="string"){
       legendTopText.textContent = max;
       legendBottomText.textContent = min;
      }
      else{
       legendTopText.textContent = max + "%";
       legendBottomText.textContent = min + "%";
      }
    }
  }
  if(mapNum==2){
    if(legendTopText!=undefined){
      var max = d3.max(data,function(d){
        return d["Percent"]
      });

    var min = d3.min(data,function(d){
        return d["Percent"]
      });
      if(typeof max =="string"){
       legendTopText2.textContent = max;
       legendBottomText2.textContent = min;
      }
      else{
       legendTopText2.textContent = max + "%";
       legendBottomText2.textContent = min + "%";
      }
    }
  }
}

function makeBubbleChart(value) {
  if (preProcessDoneDrugs && preProcessDoneObesity && preProcessDoneMarijuana && preProcessDoneAlcohol && preProcessDoneNonMarijuana && preProcessDoneTobacco && preProcessDoneIncome && preProcessDoneViolentCrime) {
  

  var end = illicit_drugs_percent.length; 
  var data0 = illicit_drugs_percent.slice(5, illicit_drugs_percent.length);
  var newIncome = income.slice(1, 52);
  changeData(newIncome);

  var data = merge(data0, newIncome);
  console.log(data);
  var height = 840;
  var width = 1200;
  
  var maxPercent = d3.max(data,function(d){
    //if string, need to parse
    if(typeof d["Percent"] =="string"){
      return parseFloat(d["Percent"].replace(',',''));
    }
    else{
      return Number((d["Percent"]))
    }
        }); 
  
  var maxIncome = d3.max(data,function(d){
    //if string, need to parse
    if(typeof d["Income"] =="string"){
      return parseFloat(d["Income"].replace(',',''));
    }
    else{
      return Number((d["Income"]))
    }
  });

  var svg = d3.select("#bubble_chart").append("svg")
  .attr("height", height)
  .attr("width", width)
  .attr("class","bubble_svg");

  var xScale = d3.scale.ordinal()
    .domain(data.map(function (d) {return d.State}))
    //.domain((for i=5; i<data.length; i++) { return data.State[1];})
    .range(data.map(function (d,i) {return i*10}));

  var yScale = d3.scale.linear().domain([0, maxPercent]).range([720,60]);
  
  var radiusScale = d3.scale.sqrt()
  .domain([0, maxIncome]).range([0, 25]);
  
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
       
  var yAxis = d3.svg.axis().scale(yScale)
  .orient("left");
  
  svg.append("g").attr("class", "x axis")
  .attr("transform", "translate(80,720)")
  .call(xAxis).selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });
    
  svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height - 30) + ")")
        .style("text-anchor", "middle")
  .style("font-size", "30")
        .text("State");
  
  svg.append("g").attr("class", "y axis")
  .attr("transform", "translate(80,0)")
  .call(yAxis);
  
  svg.append("text")
  .attr("transform", "rotate(-90)")
        .attr("x", -375)
        .attr("y", 60)
        .style("text-anchor", "middle")
  .style("font-size", "30")
        .text("Percent");
  
  console.log(maxIncome); 
  var circles = svg.selectAll("dot").data(data)
    .enter().append("circle").attr("class", "dot"); 
  
  
  circles.attr("cx", function(d) { return xScale(d.State) + 120;})
    .attr("cy", function(d) { return yScale(d.Percent); })
    .attr("r", function(d) { return radiusScale(parseFloat(d.Income.replace(',',''))) })
    //.attr("r", 30)
    .attr("opacity", 0.6)
    .style("fill", "blue")
  .append("svg:circle")
    .text(function(d) { return (d.State + "<br/>" + d.Percent +"<br>" + parseFloat(d.Income.replace(',',''))) });
  
  $('svg circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        title: function() {
          var d = this.__data__     
          return 'State: <span style="color:red">'+ d.State +'</span><br>Percent: <span style="color:red">' + d.Percent + '%</span><br>Income: <span style="color:red">$' + d.Income + '</span>'; 
        }
      });
  
  updateBubbleChart(0);

  }
  else {
        setTimeout(makeBubbleChart,100);
  }
}

function updateBubbleChart(value) {
  if (preProcessDoneDrugs && preProcessDoneObesity && preProcessDoneMarijuana && preProcessDoneAlcohol && preProcessDoneNonMarijuana && preProcessDoneTobacco && preProcessDoneIncome && preProcessDoneViolentCrime) {
  if(value ==0){
    var end = illicit_drugs_percent.length; 
    var data0 = illicit_drugs_percent.slice(5, end);

  }
  else if(value ==1){
    var end = obesity_percent.length; 
    var data0 = obesity_percent.slice(0, end);

  }
  else if(value ==2){
    var end = violent_crime_percent.length; 
    var data0 = violent_crime_percent.slice(0, end);
    
  } 
  else if(value ==3){
    var end = property_crime_percent.length; 
    var data0 = property_crime_percent.slice(0, end);   
  }
  

  
  var newIncome = income.slice(1, 52);
  changeData(newIncome);
  var data = merge(data0, newIncome);
  
  var maxPercent = d3.max(data,function(d){
    //if string, need to parse
    if(typeof d["Percent"] =="string"){
      return parseFloat(d["Percent"].replace(',',''));
    }
    else{
      return Number((d["Percent"]))
    }
        }); 
  
  var maxIncome = d3.max(data,function(d){
    //if string, need to parse
    if(typeof d["Income"] =="string"){
      return parseFloat(d["Income"].replace(',',''));
    }
    else{
      return Number((d["Income"]))
    }
  });
  
  var xScale = d3.scale.ordinal()
    .domain(data.map(function (d) {return d.State}))
    //.domain((for i=5; i<data.length; i++) { return data.State[1];})
    .range(data.map(function (d,i) {return i*21}));

  var yScale = d3.scale.linear().domain([0, maxPercent]).range([720,60]);
  
  var radiusScale = d3.scale.sqrt()
  .domain([0, maxIncome]).range([0, 25]);
  
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
       
  var yAxis = d3.svg.axis().scale(yScale)
  .orient("left");
  
    
  <!-- var svg = d3.select("#bubble_chart");


var svg = d3.select("#bubble_chart").transition();
  // change the x axis
   svg.select("g.y.axis") // change the y axis
            .duration(750)
      .call(yAxis);



  var svg= d3.select(".bubble_svg");

    svg.selectAll(".dot")
        .data(data).enter();

    var x0 = xScale.domain(data.sort(function(a, b) { return (b.Percent-a.Percent);} )
        .map(function(d) { return d.State; }))
        .copy();
    svg.selectAll(".dot")
        .sort(function(a, b) { return x0(a.State) - x0(b.State); });

  var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  
    var transition = svg.transition().duration(600),
        delay = function(d, i) { return 0; };

    transition.selectAll(".dot")
        .delay(delay)
        .attr("r", function(d) { return radiusScale(parseFloat(d.Income.replace(',',''))) })
      .attr("cx", function(d) { return x0(d.State) +120;})
      .attr("cy", function(d) { return yScale(d.Percent); })
    

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);


      }
  else {
        setTimeout(updateBubbleChart,100);
  }
        
}

function dataByRegion (region, array) {
    var data = 0;
    for (var i = 0; i < region.length; i++) {
      if(typeof getPercentByState(region[i], array) == "string"){
         data +=  parseFloat(getPercentByState(region[i], array).replace(',','')) *getPercentByState(region[i], population);
      }
      else{
         data += getPercentByState(region[i], array) *getPercentByState(region[i], population);
      }
     
    }
    return data;
}

function makeBarGraph(){
   if (preProcessDoneDrugs && preProcessDoneObesity && preProcessDoneMarijuana && preProcessDoneAlcohol && preProcessDoneNonMarijuana && preProcessDoneTobacco && preProcessDoneIncome && preProcessDoneViolentCrime) {

      var drug_Northeastern = (dataByRegion(Northeastern, illicit_drugs_percent) / getPercentByState("Northeast Region", population)).toFixed(2);
      var drug_MidWestern = (dataByRegion(MidWestern, illicit_drugs_percent) / getPercentByState("Midwest Region", population)).toFixed(2);
      var drug_Southern = (dataByRegion(Southern, illicit_drugs_percent) / getPercentByState("South Region", population)).toFixed(2);
      var drug_Western = (dataByRegion(Western, illicit_drugs_percent) / getPercentByState("West Region", population)).toFixed(2);

      var income_Northeastern = dataByRegion(Northeastern, income) / Number(getPercentByState("Northeast Region", population));
      var income_MidWestern = dataByRegion(MidWestern, income) / Number(getPercentByState("Midwest Region", population));
      var income_Southern = dataByRegion(Southern, income) / Number(getPercentByState("South Region", population));
      var income_Western = dataByRegion(Western, income) / Number(getPercentByState("West Region", population));
      console.log("income northeastern: "+income_Northeastern);

      var obesity_Northeastern = (dataByRegion(Northeastern, obesity_percent) / getPercentByState("Northeast Region", population)).toFixed(2);
      var obesity_MidWestern = (dataByRegion(MidWestern, obesity_percent) / getPercentByState("Midwest Region", population)).toFixed(2);
      var obesity_Southern = (dataByRegion(Southern, obesity_percent) / getPercentByState("South Region", population)).toFixed(2);
      var obesity_Western = (dataByRegion(Western, obesity_percent) / getPercentByState("West Region", population)).toFixed(2);

      var violent_crime_Northeastern = (dataByRegion(Northeastern, violent_crime_percent) / getPercentByState("Northeast Region", population)).toFixed(4);
      var violent_crime_MidWestern = (dataByRegion(MidWestern, violent_crime_percent) / getPercentByState("Midwest Region", population)).toFixed(4);
      var violent_crime_Southern = (dataByRegion(Southern, violent_crime_percent) / getPercentByState("South Region", population)).toFixed(4);
      var violent_crime_Western = (dataByRegion(Western, violent_crime_percent) / getPercentByState("West Region", population)).toFixed(4);

      var property_crime_Northeastern = (dataByRegion(Northeastern, property_crime_percent) / getPercentByState("Northeast Region", population)).toFixed(4);
      var property_crime_MidWestern = (dataByRegion(MidWestern, property_crime_percent) / getPercentByState("Midwest Region", population)).toFixed(4);
      var property_crime_Southern = (dataByRegion(Southern, property_crime_percent) / getPercentByState("South Region", population)).toFixed(4);
      var property_crime_Western = (dataByRegion(Western, property_crime_percent) / getPercentByState("West Region", population)).toFixed(4);


      //bar chart
      var margin = {top: 50, right: 50, bottom: 30, left: 40},
          width = 600 + margin.left + margin.right,
          height = 500 - margin.top - margin.bottom;

      var x0 = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var x1 = d3.scale.ordinal();

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.ordinal()
          .range(["#BB7365", "#6D748C", "#FF8362", "#79BEDB"]);

      var xAxis = d3.svg.axis()
          .scale(x0)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));


      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Percent:</strong> <span style='color:red'>" + d.value + "%"+ "</span>";
          })
      
      var svg = d3.select("#bar_chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

      d3.csv("data/regional_data.csv", function(error, data) {
        var category = d3.keys(data[0]).filter(function(key) { return key !== "Region"; });

        data.forEach(function(d) {
          d.categories = category.map(function(name) { return {name: name, value: +d[name]}; });
        });

        x0.domain(data.map(function(d) { return d.Region; }));
        x1.domain(category).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(d.categories, function(d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Percent");

        var state = svg.selectAll(".Region")
            .data(data)
          .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x0(d.Region) + ",0)"; });

        state.selectAll("rect")
            .data(function(d) { return d.categories; })
          .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .style("fill", function(d) { return color(d.name); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

        var legend = svg.selectAll(".legend")
            .data(category.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(10," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);


        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

      });
   }
  else {
      setTimeout(makeBarGraph,100);
  }
}
preProcessData();
makeChloroplethMap();
makeBubbleChart(0);
makeBarGraph();



//helper functions
var getPercentByState = function(state,array){
  for(var i = 0; i<array.length; i++){
    if(state == array[i]['State']){
      return array[i]['Percent'];
    }
  }
}

var help_choloropleth_red = function(state, percentage){
  var dictionary = {};
  dictionary[state] = colorRed(percentage)
  return dictionary;
}

var help_choloropleth_blue = function(state, percentage){
  var dictionary = {};
  dictionary[state] = colorBlue(percentage)
  return dictionary;
}

function changeData(data){
    for(var i = 0; i < data.length; i++){
        if(data[i].hasOwnProperty("Percent")){
            data[i]["Income"] = data[i]["Percent"];
        }
    }
}

function merge(a1,a2) {
    var i = -1;
    while ((i = i+1)<a1.length)  {
     for (var l in a2[i]) {
            if (!(l in a1[i] )) {
                a1[i][l] = a2[i][l];
            }
     }
    }
   return a1; 
}