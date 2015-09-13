//d3.csv is asynchronous so we have to make the draw functions wait until the data is parsed 

//global data structures used throughout the graps
var map1;
var map2;
var legendTopText;
var legendBottomText;
var stateNameToAbbreviation = [];
var stateTotalPop = [];
var stateName;
var colorRed;
var colorBlue;
var oldRedSlider=2;
var oldBlueSlider=2;
var illicit_drugs_percent=[];
var obesity_percent = [];
var marijuana_percent = [];
var alcohol_percent = [];
var non_marijuana_percent = [];
var tobacco_percent = [];
var income = [];
var violent_crime_percent = [];
var property_crime_percent = [];
var population = [];
var Northeastern = ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont", "New Jersey", "New York", "Pennsylvania"]; 
var MidWestern = ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"];
var Southern = ["Delaware", "District of Columbia", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "West Virginia", "Alabama", "Kentucky", "Mississippi", "Tennessee", "Arkansas", "Louisiana", "Oklahoma", "Texas"];
var Western = ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", "Alaska", "California", "Hawaii", "Oregon", "Washington"];

//used to make sure data is parsed before drawing 
preProcessDoneViolentCrime = false;
preProcessDoneIncome = false;
preProcessDoneAlcohol = false;
preProcessDoneDrugs = false;
preProcessDoneObesity = false;
preProcessDoneMarijuana = false;
preProcessDoneNonMarijuana = false;
preProcessDoneTobacco = false;
preProcessDonePopulation = false;

//preProcessData goes through csv and populates data structures
function preProcessData(){

  //convert names to abbrev
  d3.csv("data/states.csv", function(error,data) {
    data.forEach(function(d){
      stateName = d['State'];
      stateNameToAbbreviation[stateName]=d['Abbreviation'];
      });
  });

  d3.csv("data/illicit_drugs_past_month.csv", function(error,data) {
    data.forEach(function(d,i){

        illicit_drugs_percent.push({"State" : d['State'],
           "Percent" : Number(d['12+'])
        });

      if(i==data.length-1){
        preProcessDoneDrugs=true;
      }
    });
  });

  d3.csv("data/obesity2013.csv", function(error,data) {
    data.forEach(function(d,i){

        obesity_percent.push({"State" : d['State'],
          "Percent" : Number(d['prevalence'])
        });
      
      if(i==data.length-1){
        preProcessDoneObesity=true;
      }
    });
  });

  d3.csv("data/marijuana_past_month.csv", function(error,data) {
    data.forEach(function(d,i){

        marijuana_percent.push({"State" : d['State'],
          "Percent" : Number(d['12+'])
        });
      
      if(i==data.length-1){
        preProcessDoneMarijuana=true;
      }
    });
  });

  d3.csv("data/alcohol_past_month.csv", function(error,data) {
    data.forEach(function(d,i){

        alcohol_percent.push({"State" : d['State'],
          "Percent" : Number(d['12+'])
        });
      
      if(i==data.length-1){
        preProcessDoneAlcohol=true;
      }
    });
  });

  d3.csv("data/illicit_drugs_non_marijuana_past_month.csv", function(error,data) {
    data.forEach(function(d,i){
        
        non_marijuana_percent.push({"State" : d['State'],
          "Percent" : Number(d['12+'])
        });
      
      if(i==data.length-1){
        preProcessDoneNonMarijuana=true;
      }
    });
  });

    d3.csv("data/tobacco_use_past_month.csv", function(error,data) {
    data.forEach(function(d,i){
        
        tobacco_percent.push({"State" : d['State'],
          "Percent" : Number(d['12+'])
        });
      
      if(i==data.length-1){
        preProcessDoneTobacco=true;
      }
    });
  });

  d3.csv("data/income_2013.csv", function(error,data) {
    data.forEach(function(d,i){
        
        income.push({"State" : d['State'],
          "Percent" : d['Median income']
        });
      
      if(i==data.length-1){
        preProcessDoneIncome=true;
      }
    });
  });

  d3.csv("data/crime_2013.csv", function(error,data) {
    data.forEach(function(d,i){

        violent_crime_percent.push({"State" : d['State'],
          "Percent" : d['Voilent Crime Rate']
        });
        property_crime_percent.push({"State" : d['State'],
          "Percent" : d['Property Crime Rate']
        });
      
      if(i==data.length-1){
        preProcessDoneViolentCrime=true;
      }
    });
  });

  d3.csv("data/population_2013.csv", function(error,data) {
    data.forEach(function(d,i){

      population.push({"State" : d['NAME'],
        "Percent" : d['POPESTIMATE2013']
      });
      
      if(i==data.length-1){
        preProcessDonePopulation=true;
      }
    });
  });
}