const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to create charts displayed in the dashboard
function charts(sample_index){
  let values = [];
  let sample_otu_ids = [];
  let sample_otu_ids_text =[];
  let sample_otu_labels = [];
  
  // extract the data for the variables needed to populate bar chart and buble chart
  d3.json(url).then(function(data) {
 // console.log(data);
  values = data.samples[sample_index].sample_values;
  //console.log(values);
  sample_otu_ids = data.samples[sample_index].otu_ids;
  //console.log(sample_otu_ids);
  sample_otu_ids.map((outids,i)=>{
    sample_otu_ids_text.push('OTU '+ sample_otu_ids[i])
  });
  //console.log(sample_otu_ids_text);
  sample_otu_labels = data.samples[sample_index].otu_labels;
  //console.log(sample_otu_labels);
  
  // Retrieve all metadata
  let metadata = data.metadata[sample_index];
  console.log(metadata);
  // select Sample-metadata panel
  d3.select("#sample-metadata").html("");
  // Use Object.entries to add each key/value pair to the panel
  Object.entries(metadata).forEach(([key,value]) => {
  
      // Log the individual key/value pairs as they are being appended to the metadata panel
    //  console.log(key,value);
  
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });
  
  
  
  //HORIZONTAL BAR CHART
    // convert to objectmatch all data into an object, key value pair
    let merged = values.map((val,i)=> {
      return {"subjectValues": values[i], "subjectOTUs": sample_otu_ids_text[i],
      "subjectLabels": sample_otu_labels[i]}
    }
    );
    //console.log(merged);
    // Sort the object baseed on subject values
    const dataSort = merged.sort(function (b,a) {
      return a.subjectValues - b.subjectValues
    });
    // arrays to be charted
     const limited_values = [];
     const limited_OTUs = [];
     const limited_text = [];
  
     // for loop to chart top 10 values
     //limit set to 10 for subjetcs with more than 10 OTUs. Else limit set to sample size
     let limit
     if (dataSort.length >10){
      limit =10;
     }
     else {
      limit = dataSort.length;
     }
     for (i =0; i<limit; i++){
      limited_values.push(dataSort[i].subjectValues);
      limited_OTUs.push(dataSort[i].subjectOTUs);
      limited_text.push(dataSort[i].subjectLabels);
     }
  
      let databarh = [{
           type: 'bar',
           // Use sample_values as the values for the bar chart
           x: limited_values.reverse(),
           //Use otu_ids as the labels for the bar chart.
           y: limited_OTUs.reverse(),
          //Use otu_labels as the hovertext for the chart.
           text: limited_text.reverse(),
           orientation: 'h'
       }];
    
       Plotly.newPlot("bar", databarh);
      
  //BUBLE CHART

    // Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.
  // function plotbublechart() {
  
  
   var trace1 = {
    x: sample_otu_ids,
    y: values,
    text: sample_otu_labels,
    mode: 'markers',
    marker: {
      size: values,
      color: sample_otu_ids
    }
  };
  
  var data = [trace1];
  
  Plotly.newPlot('bubble', data);
  
  
  });
  
  
};

//  init function to create and initialize dashboard 

function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
           // console.log(id);
           // console.log(names.indexOf(id));

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
        // // Invoke Charts function to build the initial plots
        charts(0);

    });
};

//  Code Call optionchanged() when a change takes place to the DOM

d3.selectAll("#selDataset").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  //console.log(dataset);

  //call charts function to update plots based on the dataset selected

  d3.json(url).then(function(data) {
     let index = data.names.indexOf(dataset)
     console.log(index);
     charts(index);
     });
  
  }

init();

