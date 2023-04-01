console.log(data);

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

//Use sample_values as the values for the bar chart.

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.




// Create a custom function to return Roman gods with more than 1 million search results
function popular(roman) {
  return roman.romanSearchResults > 100000000;
}

// Call the custom function with filter()
let popularRomans = data.filter(popular);

// Trace for the Roman Data
let trace1 = {
    x: popularRomans.map(row => row.romanName),
    y: popularRomans.map(row => row.romanSearchResults),
    type: "bar"
};

// Data trace array
let traceData = [trace1];

// Apply title to the layout
let layout = {
  title: "Popular Roman gods search results"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);