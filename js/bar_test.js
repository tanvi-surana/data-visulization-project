//d3.csv(data = "http://localhost:8888/Japan_Sierra life expectancy.csv", type, function(error, data) {
    //if (error) throw error;
    //console.log(data)
    //} );
   
//var data = Array.from(data);
var yeardata = [];
for (var i = 2000; i < 2017; i ++) {
    yeardata.push(i);
  }
var japanle = [81.1,
    81.4,
    81.6,
    81.8,
    82,
    81.9,
    82.3,
    82.5,
    82.6,
    82.9,
    82.8,
    82.6,
    83.1,
    83.3,
    83.6,
    83.8,
    84]
var sierrale = [38.7,
    39.7,
    40.7,
    41.7,
    42.7,
    43.6,
    44.6,
    45.5,
    46.4,
    47.3,
    48.2,
    49,
    49.8,
    50.4,
    51,
    51.4,
    51.8
  ]

var margin = {top: 5, right: 5, bottom: 110, left: 50};
// here, we want the full chart to be 700x200, so we determine
// the width and height by subtracting the margins from those values
var fullWidth = 760;
var fullHeight = 450;
// the width and height values will be used in the ranges of our scales
var width = fullWidth - margin.right - margin.left;
var height = fullHeight - margin.top - margin.bottom;

var tooltip = floatingTooltip('bar_tooltip', 30);

var svg = d3.select('#stackedbar').append('svg')
    .attr('width', fullWidth)
    .attr('height', fullHeight)
    // this g is where the bar chart will be drawn
    .append('g')
    // translate it to leave room for the left and top margins
    .attr('transform', 'translate(' + margin.left + ',' + margin.left + ')');

// x value determined by year
//var x = d3.scaleTime().range([0, width]);
var yearScale = d3.scaleBand()
    .domain(yeardata)
    .range([0, width])
    .paddingInner(0.2);
  
  // the width of the bars is determined by the scale
var bandwidth = yearScale.bandwidth();
  
  // y value determined by le
  //var maxTemp = d3.max(data, function(d) { return d.jle; });
var leScale = d3.scaleLinear()
    .domain([30, 140])
    .range([height, 0]);
  
var xAxis_bar = d3.axisBottom(yearScale).tickSizeOuter(6);
  //console.log(xAxis_bar);
var yAxis_bar = d3.axisLeft(leScale);
  
  
  // draw the axes
svg.append('g')
    .classed("x axis", "true")
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis_bar)
    //.attr("d", "M0.5,6V0.5H805.5V06")
    .append('text')
    .attr('transform', 'rotate(0)translate(+' +350+ ',60)')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('dy', '-1.5em')
    .style('font-size', 14)
    .text('Year');

var yAxisEle = svg.append('g')
    .classed('y axis', true)
    .call(yAxis_bar);
  
  // add a label to the yAxis
var yText = yAxisEle.append('text')
    .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('dy', '-2.5em')
    .style('font-size', 14)
    .text('Life Expectancy');

  //var data = d3.layout.stack();
var barHolder = svg.append('g')
    .classed('bar-holder', true);
  
  // draw the bars
var bars = barHolder.selectAll(".bar")
    .data(japanle).enter()
    .append('rect')
    .classed('bar', true).attr("fill", "steelblue").attr('stroke', 'darkblue')
    .attr('x', function(d, i) {
        return 0.5 + yearScale(yeardata[i]);
    })
    .attr('width', 35)
    .attr('y', function(d, i) {

        return leScale(japanle[i] + sierrale[i]);
      })
    .attr('height', function(d, i) {
        return height - leScale(japanle[i]+ sierrale[i]);
      })
    .on("mouseover",showDetail)
    .on('mouseout', hideDetail);



function showDetail(d, i) {
// change outline to indicate hover state.
d3.select(this).attr('stroke', 'black').attr('fill', "orangered").attr('stroke-width', 2);

var content = '<span class="name">Sum of life expectancy: </span><span class="value">' +
                (japanle[i] + sierrale[i]).toFixed(1) + '</span><br/>'+ 
                '<span class="name">Country: </span><span class = "value">' +
                "Japan" +
                '</span><br/>' +  
                '<span class="name">Average life expectancy: </span><span class="value">' +
                japanle[i] + '<span class="name">  Difference: </span><span class="value">' +
                (japanle[i] - sierrale[i]).toFixed(1) + 
                '</span><br/>' + 
                '<span class="name">Year: </span><span class="value">' +
                yeardata[i] +
                '</span><br/>';

tooltip.showTooltip(content, d3.event);
}

/*
* Hides tooltip
*/

function hideDetail(d,i) {
    d3.select(this).attr('stroke', 'darkblue').attr("fill", "steelblue");
    tooltip.hideTooltip();
}
/*
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    
    return x1 + x2;
    }

*/
// draw the bars
var barHolder_2 = svg.append('g')
    .classed('bar-holder', true);
var bars_s = barHolder_2.selectAll(".bar")
    .data(sierrale).enter()
    .append('rect')
    .classed('bar', true).attr("fill", "green").attr('stroke', 'darkgreen').attr('opacity', 1)
    .attr('x', function(d, i) {
        return 0.5 + yearScale(yeardata[i]);
    })
    .attr('width', 35)
    .attr('y', function(d, i) {

        return leScale(sierrale[i]);
    })
    .attr('height', function(d, i) {
        return height - leScale(sierrale[i]);
    })
    .on("mouseover",showDetail_2)
    .on('mouseout', hideDetail_2);

function showDetail_2(d, i) {
// change outline to indicate hover state.
d3.select(this).attr('stroke', 'black').attr('fill', "navajowhite").attr('stroke-width', 2);

var content = '<span class="name">Country: </span><span class = "value">' +
                "Sierra Leone" +
                '</span><br/>' +
                '<span class="name">Average life expectancy: </span><span class="value">' +
                sierrale[i] + '<span class="name">  Difference: </span><span class="value">' +
                (-japanle[i] + sierrale[i]).toFixed(1) + 
                '</span><br/>' + 
                '<span class="name">Year: </span><span class="value">' +
                yeardata[i]+
                '</span><br/>';

    tooltip.showTooltip(content, d3.event);
}

/*
* Hides tooltip
*/

function hideDetail_2(d,i) {
    d3.select(this).attr('stroke', 'darkgreen').attr("fill", "green");
    tooltip.hideTooltip();
}
/*
var tooltip = svg.append("g")
.attr("class", "tooltip")
.style("display", "none");
    
tooltip.append("rect")
.attr("width", 60)
.attr("height", 20)
.attr("fill", "white")
.style("opacity", 0.5);

tooltip.append("text")
.attr("x", 30)
.attr("dy", "1.2em")
.style("text-anchor", "middle")
.attr("font-size", "12px")
.attr("font-weight", "bold");
*/
    