var margin2 = {
        top: 20,
        right: 210,
        bottom: 50,
        left: 70
    },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin2.left - margin2.right,
    height = outerHeight - margin2.top - margin2.bottom;

var x2 = d3.scale.linear()
    .range([0, width]).nice();

var y2 = d3.scale.linear()
    .range([height, 0]).nice();

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom")
    .tickSize(-height);

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
    .tickSize(-width);

var xCat2 = "Literacy",
    yCat2 = "Infant_mortality",
    colorCat2 = "Region";

var labels2 = {
    "Region": "Region",
    "Infant_mortality": "Infant Mortality",
    "Literacy": "Literacy"
}

d3.csv("countriesoftheworld.csv", function(data) {
    data.forEach(function(d) {
        d.Literacy = +d.Literacy;
        d.Infant_mortality = +d.Infant_mortality;
        d.Region = d.Region;
    });

    var xMax2 = d3.max(data, function(d) {
            return d[xCat2];
        }) * 1.05,
        xMin2 = d3.min(data, function(d) {
            return d[xCat2];
        }),
        xMin2 = xMin2 > 0 ? 0 : xMin2,
        yMax2 = d3.max(data, function(d) {
            return d[yCat2];
        }) * 1.05,
        yMin2 = d3.min(data, function(d) {
            return d[yCat2];
        }),
        yMin2 = yMin2 > 0 ? 0 : yMin2;
    x2.domain([xMin2, xMax2]);
    y2.domain([yMin2, yMax2]);
    var color = d3.scale.category10();

    var tip = d3.tip()
        .attr("class", "d3-tip2")
        .offset([-10, 0])
        .html(function(d) {
            return labels2[xCat2] + ": " + d[xCat2] + "<br>" + labels2[yCat2] + ": " + d[yCat2] + "<br>" + labels2[colorCat2] + ": " + d[colorCat2];
        });

    var zoomBeh2 = d3.behavior.zoom()
        .x(x2)
        .y(y2)
        .scaleExtent([0, 1000])
        .on("zoom", zoom2);

    var svg2 = d3.select("#scatter2")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
        .call(zoomBeh2);
    svg2.call(tip);
    svg2.append("rect")
        .attr("width", width)
        .attr("height", height);
    svg2.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2)
        .append("text")
        .classed("label2", true)
        .attr("x", width)
        .attr("y", margin2.bottom - 10)
        .style("text-anchor", "end")
        .text("Literacy");
    svg2.append("g")
        .classed("y axis", true)
        .call(yAxis2)
        .append("text")
        .classed("label2", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin2.left)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("Infant Mortality");

    var objects = svg2.append("svg")
        .classed("objects2", true)
        .attr("width", width)
        .attr("height", height);
    objects.append("svg:line")
        .classed("axisLine2 hAxisLine2", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x", width)
        .attr("y", 0)
        .attr("transform", "translate(0," + height + ")");
    objects.append("svg:line")
        .classed("axisLine2 vAxisLine2", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x", 0)
        .attr("y", height);
    objects.selectAll(".dot2")
        .data(data)
        .enter().append("circle")
        .classed("dot2", true)
        .attr({
            r: function(d){return 5;},
            cx: function(d) {
                return x2(d[xCat2]);
            },
            cy: function(d) {
                return y2(d[yCat2]);
            }
        })
    .style("fill", function(d) {
        return color(d[colorCat2]);
    })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    var legend = svg2.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .classed("legend2", true)
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        })
		.attr("overflow", "auto");
    legend.append("rect")
        .attr("x", width + 10)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", color);
    legend.on("click", function(type) {
        // dim all of the icons in legend
        d3.selectAll(".legend2")
            .style("opacity", 0.1);
        // make the one selected be un-dimmed
        d3.select(this)
            .style("opacity", 1);
        // select all dot2s and apply 0 opacity (hide)
        d3.selectAll(".dot2")
        // .transition()
        // .duration(500)
        .style("opacity", 0.0)
        // filter out the ones we want to show and apply properties
        .filter(function(d) {
            return d["Region"] == type;
        })
            .style("opacity", 1) // need this line to unhide dot2s
        .style("stroke", "black")
        // apply stroke rule
        .style("fill", function(d) {
            
        });
    });
    legend.append("text")
        .attr("x", width + 26)
        .attr("dy", ".65em")
		.style("font-size","12px")
        .text(function(d) {
            return d;
        });
    d3.select("button.reset2").on("click", change2)
    d3.select("button.changexlos2").on("click", updatex2)

    function change2() {
        xMax2 = d3.max(data, function(d) {
            return d[xCat2];
        });
        xMin2 = d3.min(data, function(d) {
            return d[xCat2];
        });
        zoomBeh2.x(x2.domain([xMin2, xMax2])).y(y2.domain([yMin2, yMax2]));

        var svg2 = d3.select("#scatter2").transition();
        svg2.select(".x.axis").duration(750).call(xAxis2).select(".label2").text(labels2[xCat2]);
        objects.selectAll(".dot2").transition().duration(1000)
            .attr({
                r: function(d){return 5;},
                cx: function(d) {
                    return x2(d[xCat2]);
                },
                cy: function(d) {
                    return y2(d[yCat2]);
                }
            })
    }

    function zoom2() {
        svg2.select(".x.axis").call(xAxis2);
        svg2.select(".y.axis").call(yAxis2);
        svg2.selectAll(".dot2")
            .attr({
				r: function(d){return 5;},
                cx: function(d) {
                    return x2(d[xCat2]);
                },
                cy: function(d) {
                    return y2(d[yCat2]);
                }
            })
            // .attr("transform", transform);
    }

    function transform(d) {
        return "translate(" + x2(d[xCat2]) + "," + y2(d[yCat2]) + ")";
    }

    function updatex2() {
        xCat2 = "Literacy",
        yCat2 = "Infant_mortality",
        colorCat2 = "Region";
        xMax2 = d3.max(data, function(d) {
            return d[xCat2];
        }) * 1.05,
        xMin2 = d3.min(data, function(d) {
            return d[xCat2];
        }),
        xMin2 = xMin2 > 0 ? 0 : xMin2,
        yMax2 = d3.max(data, function(d) {
            return d[yCat2];
        }) * 1.05,
        yMin2 = d3.min(data, function(d) {
            return d[yCat2];
        }),
        yMin2 = yMin2 > 0 ? 0 : yMin2;
        x.domain([xMin2, xMax2]);
        y.domain([yMin2, yMax2]);

        var zoomBeh2 = d3.behavior.zoom()
            .x(x)
            .y(y)
            .scaleExtent([0, 1000])
            .on("zoom", zoom2);

        var svg2 = d3.select("#scatter2").select("svg").transition();
        svg2.select(".y.axis")
            .duration(1000)
            .call(yAxis2);
        svg2.select('.x.axis')
            .duration(1000)
            .call(xAxis2);
        svg2.select('.label')
            .duration(1000)
        .attr("x", width)
            .attr("y", margin2.bottom - 10)
            .style("text-anchor", "end")
            .text("Length of Stay");

        d3.select("#scatter2").selectAll("circle.dot2")
            .transition()
            .duration(1000)
            .attr({
                r: function(d){return 5;},
                cx: function(d) {
                    return x2(d[xCat2]);
                },
                cy: function(d) {
                    return y2(d[yCat2]);
                }
            })
    }
});