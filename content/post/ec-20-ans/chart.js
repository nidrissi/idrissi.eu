// faculty.js

var state = {
  data: [],
  filteredData: [],
  rawMax: 1000,
  normMax: 200,
  normalize: false,
  groupList: {
    1: { nom: "Droit et science politique", enabled: true },
    2: { nom: "Sciences économiques et de gestion", enabled: true },
    3: { nom: "Langues et littératures", enabled: true },
    4: { nom: "Sciences humaines", enabled: true },
    5: { nom: "Mathématiques et informatique", enabled: true },
    6: { nom: "Physique", enabled: true },
    7: { nom: "Chimie", enabled: true },
    8: { nom: "Sciences de la terre", enabled: true },
    9: {
      nom: "Mécanique, génie mécanique, génie informatique, énergétique",
      enabled: true,
    },
    10: { nom: "Biologie et biochimie", enabled: true },
    11: { nom: "Pharmacie", enabled: true },
    12: { nom: "Groupe interdisciplinaire", enabled: true },
    T: { nom: "Théologie", enabled: true },
  },
};

var minDate = new Date(1998, 1, 1),
  maxDate = new Date(2018, 1, 1);

var chart = d3.select("#chart");
var svg = chart.append("svg").attr("width", "100%").attr("max-width", "100%");
var gMargin;
var gPath;

var color = d3.scaleOrdinal(d3.schemeSet3);
var margin = { top: 20, right: 20, bottom: 20, left: 35 };

// to be initialized later
var outerWidth, outerHeight, width, height;
var xScale, yScale, xAxis, yAxis;
var xAxis, yAxis, xAxisDOM, yAxisDOM;

var line = d3.line().x(function (d) {
  return xScale(d.year);
});

function joinData() {
  var paths = gPath
    .selectAll(".path-group")
    .data(state.filteredData, (d) => (d ? d.section : this.id));

  paths.exit().remove();
  var paths_enter = paths.enter().append("g").attr("class", "path-group");
  paths = paths.merge(paths_enter);

  let cats = [];
  if (d3.select("#mcf").node().checked) {
    cats.push("mcf");
  }
  if (d3.select("#pr").node().checked) {
    cats.push("pr");
  }
  paths.selectAll("*").remove();
  for (let cat of cats) {
    paths
      .append("path")
      .attr("class", cat)
      .style("stroke", (d) => color(d.groupe))
      .style("stroke-width", 2)
      .style("fill", "none")
      .style("opacity", ".5")
      .on("mouseover", function (d) {
        gMargin
          .select("#tooltip")
          .text(d.section + " " + d.nom + " (" + cat.toUpperCase() + ")");
        d3.select(this).style("opacity", "1").style("stroke-width", 4);
      })
      .on("mouseout", function (d) {
        gMargin.select("#tooltip").text("");
        d3.select(this).style("opacity", ".5").style("stroke-width", 2);
      })
      .attr("d", function (d) {
        return line(d[cat]);
      });
  }
}

// check if we want to normalize
function setScales() {
  if (d3.select("#normalize").node().checked) {
    // normalized data
    yScale.domain([0, state.normMax + 10]);
    line.y(function (d) {
      return yScale(d.normalized);
    });
  } else {
    // raw data
    yScale.domain([0, state.rawMax + 100]);
    line.y(function (d) {
      return yScale(d.num);
    });
  }
}

function toggleSelection(group) {
  state.groupList[group].enabled = !state.groupList[group].enabled;
  redraw();
}

function filterData() {
  state.filteredData = state.data.filter(
    (d) => state.groupList[d.groupe].enabled
  );

  let mcf = d3.select("#mcf").node().checked;
  let pr = d3.select("#pr").node().checked;

  fullData = Array.from(state.filteredData, (d) => [
    mcf ? d.mcf : 0,
    pr ? d.pr : 0,
  ]).flat(2);
  state.rawMax = d3.max(fullData, (d) => d.num);
  state.normMax = d3.max(fullData, (d) => d.normalized);
}

// redraw the axes and the lines
function redraw() {
  filterData();
  setScales();
  yAxisDOM.call(yAxis);
  joinData();
}

function draw() {
  // dynamic width and height
  outerWidth = chart.node().getBoundingClientRect().width;
  outerHeight = outerWidth / 2;

  // margin trick
  width = outerWidth - margin.left - margin.right;
  height = outerHeight - margin.top - margin.bottom;
  svg.attr("height", outerHeight);
  gMargin = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // tooltip
  gMargin
    .append("text")
    .attr("id", "tooltip")
    .attr("text-anchor", "middle")
    .attr("filter", "url(#solid)")
    .attr("transform", "translate(" + width / 2 + "," + 15 + ")");
  let filter = svg
    .insert("defs")
    .append("filter")
    .attr("id", "solid")
    .attr("x", -0.0625)
    .attr("y", 0)
    .attr("width", 1.125)
    .attr("height", 1.1);
  filter.append("feFlood").attr("flood-color", "blue");
  filter
    .append("feComposite")
    .attr("in", "SourceGraphic")
    .attr("operator", "xor");

  // scaling
  xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);
  yScale = d3.scaleLinear().range([height, 0]);

  // axis
  xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(1));
  xAxisDOM = gMargin
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  yAxis = d3.axisLeft(yScale);
  yAxisDOM = gMargin.append("g");

  // lines
  gPath = gMargin.append("g");

  redraw();
}

var groupeDOM = d3.select("#groups");
for (let k in state.groupList) {
  let div = groupeDOM
    .append("div")
    .attr("class", "form-check form-check-inline");
  div
    .append("input")
    .on("change", function () {
      toggleSelection(k);
    })
    .attr("checked", "")
    .attr("class", "form-check-input")
    .attr("type", "checkbox")
    .attr("id", "g-" + k)
    .attr("value", "g-" + k);
  div
    .append("label")
    .attr("class", "form-check-label")
    .attr("for", "g-" + k)
    .text(k + " - " + state.groupList[k].nom);
}

d3.selectAll("#mcf,#pr,#normalize").on("change", redraw);

d3.json("demos.json").then((data) => {
  state.data = data;

  // normalize at 100 in 1998
  // parse years
  for (d of state.data) {
    for (cat of ["mcf", "pr"]) {
      var initial = d[cat].find(function (x) {
        return x.year == 1998;
      }).num;
      d[cat].forEach(function (x, i, arr) {
        arr[i].num = +arr[i].num;
        arr[i].year = new Date(x.year, 1, 1);
        arr[i].normalized = (x.num * 100.0) / initial;
      });
    }
  }

  draw();
});
