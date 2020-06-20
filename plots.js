function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      optionChanged(sampleNames[0])
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
 
  
      PANEL.html("");
      PANEL.append("h6").text(`ID: ${result.id}`);
      PANEL.append("h6").text(`ETHNICITY: ${result.ethnicity}`);
      PANEL.append("h6").text(`GENDER: ${result.gender}`);
      PANEL.append("h6").text(`AGE: ${result.age}`);
      PANEL.append("h6").text(`LOCATION: ${result.location}`);
      PANEL.append("h6").text(`BBTYPE: ${result.bbtype}`);
      PANEL.append("h6").text(`WFREQ: ${result.wfreq}`);
    });
  }

// Sort the data array using the greekSearchResults value
  function buildCharts(sample) {

    d3.json("samples.json").then((data) => {
        var sampleData = data.samples;
        var resultArray = sampleData.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var sampleSlice = result.sample_values.slice(0,10);
        var idSlice = result.otu_ids.slice(0,10);
        var labelSlice = result.otu_labels.slice(0,10);
        var allSamples = result.sample_values
        var allIds = result.otu_ids
        var allLabels = result.otu_labels
        // console.log(allSamples)

        // Create the bar Chart
        var trace1 = {
            x: sampleSlice.reverse(),
            y: idSlice.reverse(),
            text: labelSlice.reverse(),
            name: "",
            type: "bar",
            orientation: "h"
        };

        var layout = {
            yaxis: {
                type: 'category',
            }
        };

        // data
        var data = [trace1];
        

        Plotly.newPlot("plot", data, layout);

        // Create Bubble Chart

        var trace2 = {
            x: allIds,
            y: allSamples,
            text: allLabels,
            mode: 'markers',
            marker: {
                size: allSamples, 
                color: allIds,
                colorscale: 'Jet'
            }
        }

        // data
        var data2 = [trace2];

        var layout2 = {
            title: "OTU ID"
        };

        Plotly.newPlot("bubble", data2, layout2)



    });
  }


