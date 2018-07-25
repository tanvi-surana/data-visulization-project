//data = [
    //52.6, 53.1, 53.5, 54.0, 54.7, 55.4, 56.1, 56.8, 
    //57.4, 58.1, 58.7, 59.2, 59.7, 60.1, 60.6, 61.0, 
    //61.5, 61.9, 62.2, 62.6, 62.9, 63.2, 63.5, 63.8, 
    //64.0, 64.3, 64.6, 64.8, 65.0, 65.2, 65.4, 65.6, 
   // 65.8, 65.9, 66.1, 66.3, 66.6, 66.9, 67.2, 67.4, 
    //67.7, 68.0, 68.2, 68.5, 68.9, 69.1, 69.5, 69.8, 
    //70.1, 70.4, 70.7, 71.0, 71.2, 71.5, 71.7, 71.9, 
    //72.0
//]
var yeardata_1 = [];
for (var i = 1960; i < 2017; i ++) {
      yeardata_1.push(i);
}

svg = d3.select('#world_le')
        .append('svg')
        .attr('width', 960)
        .attr('height', 500);
        margin = {top: 20, right: 20, bottom: 110, left: 40},
        margin2 = {top: 430, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;

var parseDate = d3.timeParse("%Y");

var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().domain(yeardata_1).range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);

var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

var area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x(d.year); })
    .y0(height)
    .y1(function(d) { return y(d.le); });

var area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x2(d.year); })
    .y0(height2)
    .y1(function(d) { return y2(d.le); });

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("data/world life expectanct at birth, total.csv", type, function(error, data) {
    if (error) throw error;
    //console.log(data);

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([35, 80]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .style('font-size', 12)
        .text('Life Expectancy');

    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2)
        .append('text')
        .attr('transform', 'rotate(0)translate(+' + 450 + ',60)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .style('font-size', 12)
        .text('Year')
        ;

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
});

function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
}

function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function type(d) {
    d.year= parseDate(d.year);
    d.le = +d.le;
    return d;
};
