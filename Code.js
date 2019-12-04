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
                              }})
    var TC1990 = goodcountries.filter(Tfilter)
    var TC2000 = goodcountries.filter(TTfilter)
    var TC2010 = goodcountries.filter(TTTfilter)
    var TC2018 = goodcountries.filter(TTTTfilter)
    /*console.log("1990", TC1990)
    console.log("2000", TC2000)
    console.log("2010", TC2010)
    console.log("2018", TC2018)*/
    setup(TC1990);
    ninety(TC1990);
    hundred(TC2000);
    hunten(TC2010);
    huneight(TC2018);
    console.log("filtred", goodcountries)
    })
var ninety = function(countries)
{
    d3.select(".NI").data(countries).on("click", function(d)
                       {
                        setup(countries)
                        }
                       )}
var hundred = function(countries)
{
    d3.select(".TWO").data(countries).on("click", function(d)
                       {
                        setup(countries)
                        }
                       )
}
var hunten = function(countries)
{
    d3.select(".TEN").data(countries).on("click", function(d)
                       {
                        setup(countries)
                        }
                       )
}
var huneight = function(countries)
{
    d3.select(".EIGHT").data(countries).on("click", function(d)
                       {
                        setup(countries)
                        }
                       )
}
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
        
var screen = {width: 1330, height:900}
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
    .domain([0,1960])
    .range([0,width]);
    var CoScale = d3.scaleLinear()
    .domain([0,136])
    .range([0,width])
    ;
            var ProdScale = d3.scaleLinear()
    .domain([0,150])
    .range([0,width]);
            console.log("read", goodcountries)
    drawvis(goodcountries, HScale, CoScale, ProdScale)
                
            
            //console.log(goodcountries);
        }
    var drawvis = function(goodcountries, HScale, CoScale, ProdScale)
{
    var vis = d3.select("#graph")
    .selectAll(".plot")
    .data(goodcountries)
    .enter()
    .append("g").attr("class", "plot")
    .append("rect").on("mouseover",function(d)
            {   
           var HLabel = "Hours worked/Year:"+d.Value
            d3.select("#tooltip").text(HLabel)
            .style("left",(d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            }).on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    
    
    
    .attr("class","Hworked").attr("width", function(hours)
    {
        return HScale(hours.Value)
    })
    .attr("height", 18)
    .attr("margin", 10)
    .attr("y", function(d, index)
    {
        return index*45 - 4
    })
    .attr("fill", "teal")
    
    d3.selectAll(".plot").append("text").text(function(names)
    {
        return names.LOCATION
    })
        .attr("x", 1150)
    .attr("y", function(d, index)
        {
         return index*45+5
        })
    
   d3.select("#graph").selectAll(".plot").append("rect")
       .on("mouseover",function(d)
            {   
           var CLabel = "Labor Compensation:"+d.Cdata.Value
            d3.select("#tooltip").text(CLabel)
            .style("left",(d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            }).on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
       .attr("class", "comp")
       .attr("width", 10)
       .attr("height", 25)
    .attr("y", function(d,index)
         {
          return index*45-8
        }
         ).attr("fill", "skyblue").attr("x",function(comp, index)
         {
                 return CoScale(comp.Cdata.Value)
        })
    d3.select("#graph").selectAll(".plot").append("rect")
        .on("mouseover",function(d)
            {   
           var PLabel = "Productivity(GDP/Hour):"+d.Gdata.Value+"$"
            d3.select("#tooltip").text(PLabel)
            .style("left",(d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            }).on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .attr("class","prod").attr("height", 5).attr("y",function(d,index)
        {
          return index*45+2.5
        }).attr("fill", "limegreen").attr("width", function(d,index)
               {
                return ProdScale(d.Gdata.Value)
                }
               );
    
}
    //filtre function here
    var filtred = function(country)
        {
           if (country.Cdata && country.Gdata 
               && country.Gdata.MEASURE && country.Gdata.MEASURE.includes('IDX2010')
                )
            
            {
                return true
            }
            else {return false}
        console.log("read")
        };
var Tfilter = function(country)
    {
        if (country.TIME == 1990)
            {return true}
            else {return false}
    }
    var TTfilter = function(country)
    {
        if (country.TIME == 2000)
            {return true}
            else {return false}
    }
    var TTTfilter = function(country)
    {
        if (country.TIME == 2010)
            {return true}
            else {return false}
    }
        var TTTTfilter = function(country)
    {
        if (country.TIME == 2018)
            {return true}
            else {return false}
    }

//build the layout


//IMMEDIATE QUESTIONS:
/* make buttons and animation

*/



