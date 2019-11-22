var AllPromise = d3.csv("GDP per Hour.csv");
var hoursPromise = d3.csv("Hours Worked per Year.csv");
var compPromise = d3.csv("Comp.csv");
hoursPromise.then(
function(countries)
{  
//    console.log("Working", countries)      
})


AllPromise.then(
function(countries)
{
//  console.log("works", countries)   
    
    
})
compPromise.then(
function(countries)
{
    console.log("workeee", countries)
})
//Do the hash joins
//build the layout




