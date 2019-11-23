var AllPromise = d3.csv("GDP per Hour.csv");
var hoursPromise = d3.csv("Hours Worked per Year.csv");
var compPromise = d3.csv("Comp.csv");
Promise.all([AllPromise,hoursPromise,compPromise]).then(
function(countries)
{
    
console.log("Working", countries)      
}
)
var join = function(countries)
{
var hash = {}
countries[0].forEach(function(GDP)
        {
            hash
        }
                    )








}

//Do the hash joins
//build the layout




