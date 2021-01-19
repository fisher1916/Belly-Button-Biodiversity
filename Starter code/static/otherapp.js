// 1. Use the D3 library to read in `samples.json`.

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

// metadata = patient demographic data
// names = id #'s for pateints
// otu_ids = bacteria id #'s
// otu_labels = bacteria name in data file

// Create placeholders for data
var names = []
var metadata = []
var samples = []

// Fetch data from samples JSON file
function initData(getElements) {

    d3.json("samples.json").then((data) => {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        names.forEach((name) => {
            names.push(name);
        });
        metadata.forEach((meta) => {
            metadata.push(meta);
        })
        samples.forEach((sample) => {
            samples.push(sample);
        });
    })
    .then(getElements);
}

function init()  {
    // Create loop for subject ID's
    var subjectSample = sampleID(names[0]);

    // Create dropdown menu for subject ID's
    dropdownNames(names);

    var trace1 = {
        x: barInfo(subjectSample.sample_values, 10),
        y: barInfo(subjectSample.otu_ids, 10),
        text: barInfo(subjectSample.otu_labels, 10),
        type: "bar",
        orientation: "h",
    };
    
    var barData = [trace1];

    Plotly.newPlot("bar", barData);


}

initData(init);