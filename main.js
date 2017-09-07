// var theData = [1, 2, 3] //一个数组

// var p = d3.select("body").selectAll("p")
//     .data(theData)
//     .enter()
//     .append("p")
//     // .text("hello");
//     .text(function(d, i) {
//         console.log(this);
//         return `${i}:` + d;
//     });

// console.log(p);

// console.log(d3.select("body"));

// console.log(d3.select("body").data([1]));

// http://www.cnblogs.com/winleisure/p/3515128.html


// var circleRadii = [40, 20, 10];

// var svgContainer = d3.select("body").append("svg")
//     .attr("width", 200)
//     .attr("height", 200);

// var circles = svgContainer.selectAll("circle")
//     .data(circleRadii)
//     .enter()
//     .append("circle");

// var circleAttributes = circles
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", function(d) { return d; })
//     // .style("fill", "green");
//     .style("fill", function(d) {
//         var returnColor;
//         if (d === 40) {
//             returnColor = "green";
//         } else if (d === 20) {
//             returnColor = "purple";
//         } else if (d === 10) { returnColor = "red"; }
//         return returnColor;
//     });


// http://www.cnblogs.com/winleisure/p/3516320.html

var spaceCircles = [30, 70, 110];

var svgContainer = d3.select("body").append("svg")
    .attr("width", 200)
    .attr("height", 200);

var circles = svgContainer.selectAll("circle")
    .data(spaceCircles)
    .enter()
    .append("circle");

var circleAttributes = circles
    .attr("cx", function(d) { return d; })
    .attr("cy", function(d) { return d; })
    .attr("r", 20)
    .style("fill", function(d) {　　　　　　　　　　　　　　　　　　　　
        var returnColor;　　　　　　　　　　　　　　　　　　　　
        if (d === 30) {
            returnColor = "green";　　　　　　　　　　　　　　　　　　　　
        } else if (d === 70) {
            returnColor = "purple";　　　　　　　　　　　　　　　　　　　　
        } else if (d === 110) { returnColor = "red"; }　　　　　　　　　　　　　　　　　　　　
        return returnColor;　　　　　　　　　　　　　　　　　　　　
    });