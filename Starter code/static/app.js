// Create placeholders for data
var names = []
var metadata = []
var samples = []

// Fetch data from samples JSON file

d3.json("samples.json").then((data) => {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })

    function init()  {

        // **Can we do this instead?**
        // Select dropdown menu
        var inputID = d3.select("#selDataset");
        // Grab dropdown value
        var inputValue = inputID.property("value");
        sampleDataset = data.samples.filter(sample => sample.id === inputValue)[0];

        // ***The above would replace: sampleData=data.sample.id

        // Put sample ID's into a variable
        sampleDataset = data.sample.id;

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
});

init();