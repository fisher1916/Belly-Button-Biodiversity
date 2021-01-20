
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.
// Create placeholders for data
var names = []
var metadata = []
var samples = []

// Use the D3 library to read in `samples.json`.

d3.json("samples.json").then((data) => {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    // function somefunction_name(name) {
    //     d3.select("#selDataset").append("option").property('value', name).text(name);
    // }
    names.forEach((name)=> {
        d3.select("#selDataset").append("option").property('value', name).text(name);
    })
    // names.forEach(somefunction_name)

    function init()  {

        // **Can we do this instead?**
        // Select dropdown menu
        var inputID = d3.select("#selDataset");
        // Grab dropdown value
        var inputValue = inputID.property("value");
        sampleDataset = data.samples.filter(sample => sample.id === inputValue)[0];



        // Put sample values, otu id's, and otu labels into variables
        sampleValues = sampleDataset.sample_values;
        otuIDs = sampleDataset.otu_ids;
        otuLabels = sampleDataset.otu_labels;

        // Select top 10 otu's
        topSampleValues = sampleValues.slice(0,10).reverse();
        topOtuIDs = otuIDs.slice(0,10).reverse();
        topOtuLabels = otuLabels.slice(0,10).reverse();

        // Bar Chart
        var trace1 = {
            x: topSampleValues,
            y: topOtuIDs.map(otuID => `OTU ${otuID}`),
            text: topOtuLabels,
            type: "bar",
            orientation: "h",
        };
    
        // Convert trace into an array
        var barData = [trace1];

        // Plot bar chart
        Plotly.newPlot("bar", barData);


    }
    init();
});

function optionChanged(selected){
    console.log(selected);
    // refresh chart
};