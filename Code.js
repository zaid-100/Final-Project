var AllPromise = d3.csv("GDP per Hour.csv");
var hoursPromise = d3.csv("Hours Worked per Year.csv");
var compPromise = d3.csv("Comp.csv");
Promise.all([AllPromise,hoursPromise,compPromise])
.then(
function(countries)
{ 
    console.log("original data", countries)      
    join(countries); //join done

})


var join = function(countries)
//hash join done here
{
var hash = {}
countries[1].forEach(function(hours)
        {
            hash[hours.TIME+","+hours.LOCATION]=hours;
        //console.log( "workss", countries[0])
        
        })
    
    countries[0].forEach(function(GDP)
        {
        //console.log(hash)
        var Gval = hash[GDP.TIME+","+GDP.LOCATION]
        //console.log([hours.TIME+","+hours.LOCATION],Hval)
        if(Gval)
        {
        Gval.Gdata = GDP
            //console.log(Hval)
        }})
    countries[2].forEach(function(comp)
    {
    var Cval = hash[comp.TIME+","+comp.LOCATION]
    if(Cval)
    {
        Cval.Cdata=comp
    }
    
    })
    
console.log("joined data (countries[1])", countries[1])    
}
        
var screen = {width: 400, height:500}
var margins = {top:10, right:50, bottom:50,left:50}

var setup = function(countries)
        {                     
d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
            
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
            
                     
                     
                     
                     
                     
                     
         }
//build the layout





