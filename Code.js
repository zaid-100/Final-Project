var AllPromise = d3.csv("GDP per Hour.csv");
var hoursPromise = d3.csv("Hours Worked per Year.csv");
var compPromise = d3.csv("Comp.csv");
Promise.all([AllPromise,hoursPromise,compPromise]).then(
function(countries)
{
    console.log("Working", countries)      
    join(countries);

}
)
var join = function(countries)
{
var hash = {}
countries[0].forEach(function(GDP)
        {
            hash[GDP.TIME+","+GDP.LOCATION]=GDP;
        //console.log( "workss", countries[0])
        })
    
    countries[1].forEach(function(hours)
        {
        var Hval = hash[hours.TIME+","+hours.LOCATION]
        console.log([hours.TIME+","+hours.LOCATION],Hval)
        if(Hval)
        {
        Hval.data = hours
            //console.log(Hval)
        }
        
        })
console.log(countries[0])    
    
    
}
        
//Do the hash joins
//build the layout




