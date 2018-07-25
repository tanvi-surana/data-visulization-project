svg = d3.select('#stackedbar')
        .append('svg')
        .attr('width', 960)
        .attr('height', 500);
        margin = {top: 20, right: 20, bottom: 110, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

var parseDate = d3.timeParse("%Y");

//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


var xAxisBar = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.timeParse("%Y"));

var yAxisBar = d3.axisLeft()
    .scale(y)
    .ticks(50);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

d3.csv(data = "Japan_Sierra_life_expectancy.csv", function(d, i, columns) {
    for (i = 1, t = 0; i < 3; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    d.year = d.year;
    return d;
    }, 
    function(error, data) {
    if (error) throw error;
    console.log(data)} );
svg.append("g")
	.attr("class", "axis axis--x")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxisBar)
	.selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

 svg.append("g")
    .attr("class", "axis axis--y")
    .call(yAxisBar)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Life Expectancy");

svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d, i) {return x(d.year); })
    .attr("width", x.bandwith)
    .attr("y", function(d) { return d.total; })
    .attr("height", function(d) { return d.total; });