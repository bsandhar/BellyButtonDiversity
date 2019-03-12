function buildMetadata(sample) {

    //use d3.json to fetch metadata
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(response){
        //use d3 to select the panel with id of #sample-meta
        console.log(response);
        var sampleData = d3.select('#sample-metadata');
        // Use html"" to clear any existing md
        sampleDAta.html("");

        //use object.entries to add each key and value pair to the panel
    var data = Object.entries(response);
    data.foreach(function ([key, value]) {
        sampleData.append('div').text(`${key}: ${value}`)
    });
    })}

function buildCharts(sample) {

    //use d3.json to fetch data to plot
    var url `samples/${sample}`;
    //bubble chart
    d3.json(url).then(function (response) {
        console.log(response);

        trace1 = {
        x: response.otu_ids,
        y: response.sample_values,
        text: response.otu_labels,
        mode: 'markers',
        marker: {
            size: response.sample_values,
            color: response.otu_ids
        }
    };

    var data = [trace1];

    var layout = {
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot('bubble', data, layout);
});

//build pie
d3.json(url)then(function (response){
    let firstTenOtuIds = response.otu_ids.slice(0,10);
    let firstTenOtuLabels = response.otu_labels.slice(0,10);
    let firstTenSampleValues = response.sample_values.slice(0,10);

    var trace1 = {
        values: firstTenSampleValues,
        labels: firstTenOtuIds,
        hovertext: firstTenOtuLabels,
        type: 'pie'
    };

    var data = [trace1];

    Plotly.newPlot('pie', data)

});
}


function init() {
    //grab a reference to dropdown element
    var selector = d3.select("#selDataset");

    //use list of sample names to populate select options
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        //Use first sample from list to build initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}


function optionChanged(newSample) {
    //fetch new data
    buildCharts(newSample);
    buildMetadata(newSample);
}

//initialize dashboard
init();