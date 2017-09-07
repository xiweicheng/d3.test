var margin = { top: 30, right: 20, bottom: 30, left: 50 };
width = 600 - margin.left - margin.right;
height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

//?
var valueline = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//定义填充区域
var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.close); });

//Get the data
d3.tsv("data.tsv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    //Scale(规模) the range of the data
    x.domain(d3.extent(data, function(d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.close;
    })]);

    //Add the valueline path
    svg.append("path")
        .attr("d", valueline(data));


    //绘制填充区域
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    //Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    //Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
});

//增加一个x轴的标签
svg.append("text")
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Date");


//增加一个y轴的标签
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Value");


//给图表添加一个标题
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("一个简单的图表");


//定义格栅绘制函数
function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);
}

function make_y_axis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);
}

//绘制格栅-x方向
svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat("")
    );

//绘制格栅-y方向
svg.append("g")
    .attr("class", "grid")
    .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    );