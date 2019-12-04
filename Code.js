var AllPromise = d3.csv("GDP per Hour.csv");
var hoursPromise = d3.csv("Hours Worked per Year.csv");
var compPromise = d3.csv("Comp.csv");
Promise.all([AllPromise,hoursPromise,compPromise])
.then(
function(countries)
{ 
    console.log("original data", countries)      
    join(countries); //join done
    //setup(countries);
    //filtred(countries[1])
    var goodcountries = []
    countries[1].forEach(function(d)
                        {
                          if (filtred(d))
                              {
                                  goodcountries.push(d)
                              }
        
                        })
    setup(goodcountries);
    console.log("filtred", goodcountries)
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
        
var screen = {width: 1250, height:900}
var margins = {top:10, right:50, bottom:50,left:50}

var setup = function(goodcountries)
        {                     
d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
            
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    var HScale = d3.scaleLinear()
    .domain([0,2500])
    .range([0,width-100]);
    var CoScale = d3.scaleLinear()
    .domain([0,100])
    .range(0,width)
    drawvis(goodcountries, HScale, CoScale)
            //console.log(goodcountries);
        }
var drawvis = function(goodcountries, HScale, CoScale)
{
    var vis = d3.select("#graph")
    .selectAll(".plot")
    .data(goodcountries)
    .enter()
    .append("g").attr("class", "plot")
    .append("rect").attr("width", function(hours)
    {
        return HScale(hours.Value)
    })
    .attr("height", 50)
    .attr("margin", 10)
    .attr("y", function(d, index)
    {
        return index*100
    })
    .attr("fill", "brown")
    
    d3.selectAll(".plot").append("text").text(function(names)
    {
        return names.LOCATION
    })
        .attr("x", 760)
    .attr("y", function(d, index)
        {
         return index*100+30
        })
    
   d3.select("#graph").selectAll(".plot").append("rect").attr("class", "comp").attr("width", 10).attr("height", 80)
    .attr("y", function(d,index)
         {
          return index*100-15
        }
         ).attr("x",function(comp, CoScale)
         {
                 return comp.Cdata.Value//CoScale(comp.Cdata.Value)
        //console.log("read", comp)
        })//scale not working here
    d3.select("#graph").selectAll(".plot").append("rect")
        .attr("class","prod").attr("height", 20).attr("y",function(d,index)
        {
          return index*100+15
        }).attr("width", function(d,index)
               {
                return d.Gdata.Value
                }
               )
}
//filtre function here
var filtred = function(country)
        {
           if (typeof country.Cdata !='undefined'&& typeof country.Gdata !='undefined')
            {
                return true
            }
            else {return false}
        console.log("read")
        };

//build the layout
//how to plot only for 1 year and only for 1 measure type (US dollars)

//IMMEDIATE QUESTIONS: CoScale not working
// for penguins day was just index, here that is not the case. Also, how do we chose to plot graphs for only 1 measure type (USD).                //hover needed to show value of what's hovered over    