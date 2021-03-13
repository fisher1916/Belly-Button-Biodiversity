var names = [];
var metadata = [];
var samples = [];

// Create funtion to grab data, and place key data into variables, and push data
function initApp(call) {
  d3.json("data/samples.json").then((data) => {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    names.forEach((name)=> {
        d3.select("#selDataset").append("option").property('value', name).text(name);
    });

    names.forEach((name) => {
      names.push(name);
    });
    metadata.forEach((metaData) => {
      metadata.push(metaData);
    });
    samples.forEach((sample) => {
      samples.push(sample);
    });
  })
  
  .then(call);
};

// Initialize charts
function init()
    {

     // Bar Chart
     var trace1 = [{
         x: samples[0].sample_values.slice(0,10).reverse(),
         y: samples[0].otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
         text: samples[0].otu_labels.slice(0,10).reverse(),
         type: "bar",
         orientation: "h",
     }];

    // Bar chart layout
    var layout1 = {
        title: `<b>Top 10 Bacteria Cultures<b>`,
        xaxis: { title: "Sample Value"},
        yaxis: { title: "Bacteria ID"},
        autosize: false,
        width: 500,
        height: 500
    };

    // Plot bar chart
    Plotly.newPlot("bar", trace1, layout1);

    // Bubble chart
    var trace2 = [{
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        text: samples[0].otu_labels,
        mode: 'markers',
        marker: {
            size: samples[0].sample_values,
            color: samples[0].otu_ids,
            colorscale: "Blueorange"
        }
    }];

    // Bubble chart layout
    var layout2 = {
        title: `<b>Bacteria Cultures per Sample<b>`,
        xaxis: {title: "Bacteria ID's"},
    };

    // Plot bubble chart
    Plotly.newPlot("bubble", trace2, layout2);

    // Create gauge chart
    gaugeChart = [
        {
          domain: {x: [0, 1], y:[0, 1]},
          value: metadata[0].wfreq,
          title: {
            text: "<b>Bellybutton Washing per Week",
          },
          type: "indicator",
          mode: "gauge+number",
          delta: {reference: 9},
          gauge: {
            // axis: { range: [null, 9], tick0: 0, dtick: 1 },
            axis: {range: [null,9], tickwidth: 2, tickcolor: 'black', dtick: 1},
            bar: {color: 'darkmagenta'},
            steps: [
              {range: [0, 1], color: "rgb(255,81,171"},
              {range: [1, 2], color: "rgb(208,83,224"},
              {range: [2, 3], color: "rgb(176,104,247"},
              {range: [3, 4], color: "rgb(100,83,224)"},
              {range: [4, 5], color: "rgb(92,132,248)"},
              {range: [5, 6], color: "rgb(71,173,222)"},
              {range: [6, 7], color: "rgb(81,245,231)"},
              {range: [7, 8], color: "rgb(64,222,142)"},
              {range: [8, 9], color: "rgb(73,245,83)"},
            ],
          },
        }
    ];

    // Gauge layout
    var layout3 = {width: 600, height: 500, margin: {t:0, b:0}};

    // Plot gauge
    Plotly.newPlot("gauge", gaugeChart, layout3);
};

// Grab dropdown value, default set to first value
function defaultData(){
  dropdownMenu(names);
  updateMetadata(names[0]);
  init(names);
};

initApp(defaultData);

// Create dropdown menu
function dropdownMenu(data){
  d3.select("#selDataset").selectAll("option")
      .data(data)
      .enter().append("option")
      .text((d) => d).attr("value", ((d) => d)
    );
};

//Draw page after changing option in dropdown
function optionChanged(selected){
 
    //Call functions to update charts based on sample id selected
    updateMetadata(selected);
    updateBarChart(selected);
    updateBubbleChart(selected);
    updateGauge(selected);
}

// Create function to update metadata value
function updateMetadata(value){

  //get demographic element from HTML and filter
  //update html element with new demographic data
  var demographic = metadata.filter((demo) => demo.id === parseInt(value));
 
  //Grabbed element
  var demoPrint = d3.select("#sample-metadata");

  //Cleared html inside element
  demoPrint.html("");
  Object.entries(demographic[0]).forEach(([key, value]) => demoPrint.append("text").text(`${key}:${value}`).append("p"));
}

//Create function to restyle bar plot
function updateBarChart(value){
  var sample = samples.filter((d) => d.id === value)[0];
  var yaxis = sample.otu_ids.slice(0, 10).reverse().map(function(d){
    return "OTU " + d;
  });

  Plotly.restyle("bar", "x", [sample.sample_values.slice(0, 10).reverse()]);
  Plotly.restyle("bar", "y", [yaxis]);
  Plotly.restyle("bar", "text", [sample.otu_labels.slice(0, 10).reverse()]);
};

//Create function to restyle bubble chart
function updateBubbleChart(value){
  var sample = samples.filter((d) => d.id === value)[0];

  Plotly.restyle("bubble", "y", [sample.sample_values]);
  Plotly.restyle("bubble", "x", [sample.otu_ids]);
  Plotly.restyle("bubble", "text", [sample.otu_labels]);
  Plotly.restyle("bubble", "marker.size", [sample.sample_values]);
  Plotly.restyle("bubble", "marker.color", [sample.otu_ids]);
}

// Create function to restyle gauge
function updateGauge(value){
  var wfreq = metadata.filter((d) => d.id === +value)[0];
  var value = wfreq.wfreq;

  Plotly.restyle("gauge", "value", [value]);
}