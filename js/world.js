var width = 400;
var height = 200;

var data = [{"country": "China",
	"pop": 1323057352.94,
	"le": 74.6059,
        "f-le": 76.1412,
        "m-le": 73.0706},
{
	"country": "India",
	"pop": 1193683740.06,
	"le": 65.7647,
        "f-le": 66.8529,
        "m-le": 64.6765
},
{
	"country": "United States",
	"pop": 303380319.29,
	"le": 78.0265,
        "f-le": 80.5235,
        "m-le": 75.5294
},
{
	"country": "Indonesia",
	"pop": 236253558.47,
	"le": 67.7971,
        "f-le": 69.7941,
        "m-le": 65.8000
},
{
	"country": "Brazil",
	"pop": 192442470.47,
	"le": 73.0500,
        "f-le": 76.8059,
        "m-le": 69.2941
},
{
	"country": "Pakistan",
	"pop": 164576012.00,
	"le": 64.6706,
        "f-le": 65.5765,
        "m-le": 63.7647
},
{
	"country": "Nigeria",
	"pop": 151810722.29,
	"le": 49.7882,
        "f-le": 50.5588,
        "m-le": 49.0176
},
{
	"country": "Bangladesh",
	"pop": 148278321.53,
	"le": 69.2353,
        "f-le": 70.2647,
        "m-le": 68.2059
},
{
	"country": "Russian Federation",
	"pop": 143898392.00,
	"le": 68.1353,
        "f-le": 74.2588,
        "m-le": 62.0118
},
{
	"country": "Japan",
	"pop": 127590735.94,
	"le": 82.6294,
        "f-le": 85.9706,
        "m-le": 79.2882
},
{
	"country": "Mexico",
	"pop": 114045445.88,
	"le": 75.7794,
        "f-le": 78.2059,
        "m-le": 73.3529
},
{
	"country": "Philippines",
	"pop": 90738844.00,
	"le": 68.2324,
        "f-le": 71.5176,
        "m-le": 64.9471
},
{
	"country": "Vietnam",
	"pop": 87045170.06,
	"le": 74.7559,
        "f-le": 79.6294,
        "m-le": 69.8824
},
{
	"country": "Ethiopia",
	"pop": 83682352.41,
	"le": 59.1941,
        "f-le": 60.7765,
        "m-le": 57.6118
},
{
	"country": "Germany",
	"pop": 81853253.35,
	"le": 79.6265,
        "f-le": 82.2941,
        "m-le": 76.9588
}];

var x = d3.scale.linear()
	.domain([0,15])
    .range([0,width]);
    
var y = d3.scale.linear()
	.domain([0,100])
    .range([height,0]);

svg = d3.select("#world")
	.attr("width",width)
    .attr("height",height)
	.selectAll("rect")
	.data(data)
    .enter().append("rect")
    .attr("width",20)
    .attr("height",function(d) { return height - y(d.pop / 10000000); })
    .attr("x",function(d,i) { return x(i); })
    .attr("y",function(d) { return y(d.pop / 10000000); }).attr("fill", color);