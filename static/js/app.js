//GETS THE SAMPLE JSON FROM URL

//creates variable for URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//creates data promise
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//inline function to fecth JSON from URL
d3.json(url).then(function(data) {
  console.log(data);


  //CREATES THE DROPDOWN WITH PARTICIPANT NAMES
  //------------------------------------------------------------------------------------
  //creates a variable for names
  const names = data.names;

  //D3 select to access the dropdown
  let selection = d3.select("#selDataset");

  //loops through names and appends them to the dropdown
  for (let i = 0; i < names.length; i++){
    selection.append("option").attr("value", names[i]).text(names[i]);
  }


  //CALLS FUNCTION 'chartGen' TO POPULATE CHARTS AND DEMOGRAPHICS ON PAGE LOAD
  //------------------------------------------------------------------------------------
  chartGen();
  

  //EVENT LISTENER FOR DROP DOWN THAT CALLS 'chartGen' ON CHANGE
  //------------------------------------------------------------------------------------
  d3.selectAll("#selDataset").on("change", chartGen);


  //FUNCTION FOR POPULATING CHARTS AND DEMOGRAPHIC DATA (chartGen)
  //------------------------------------------------------------------------------------
  function chartGen() {
    let dropdownMenu = d3.select("#selDataset"); //uses D3 to access drop down
    let partId = dropdownMenu.property("value"); //assigns dropdown value to variable
  
    //queries the sample array by participant id
    let participant = data.samples.find(entry => entry.id == partId);
    console.log(participant);
  
    //creates variables for each data point for bar chart
    let otuIds = participant.otu_ids.slice(0, 10).reverse();
    let otuAsString = otuIds.map(number => 'OTU ' + number.toString());
    let otuValues = participant.sample_values.slice(0, 10).reverse();
    let otuLabels = participant.otu_labels.slice(0, 10).reverse();
  
    //defines the trace for the bar chart
    let traceBar = {
      x: otuValues,
      y: otuAsString,
      hovertext: otuLabels,
      type: "bar",
      orientation: "h"
    };
  
    //plots the bar chart
    Plotly.newPlot("bar", [traceBar], {title: "Test Subject's Top OTUs by Value"});
  
    //creates variables for each data point for bubble chart
    let allIds = participant.otu_ids;
    let allValues = participant.sample_values;
    let allLabels = participant.otu_labels;
  
    //defines the trace for the bubble chart
    let traceBubble = {
      x: allIds,
      y: allValues,
      text: allLabels,
      mode: 'markers',
      marker: {
        size: allValues,
        text: allLabels,
        color: allIds
      }
    };
  
    //plots the bubble chart
    Plotly.newPlot('bubble', [traceBubble], { title: "Complete OTU Values for Test Subject"});


    //POPULATES THE DEMOGRAPHIC INFO PANEL
    //------------------------------------------------------------------------------------
    //queries the metadata array by participant id
    let participantMeta = data.metadata.find(entry => entry.id == partId);
    console.log(participantMeta);

    //creates variables for each data point
    let demoId = participantMeta.id;
    let demoEth = participantMeta.ethnicity;
    let demoGender = participantMeta.gender;
    let demoAge = participantMeta.age;
    let demoLoc = participantMeta.location;
    let demoBb = participantMeta.bbtype;
    let demoFreq = participantMeta.wfreq;
    console.log(demoId, demoEth,demoGender, demoAge, demoLoc, demoBb, demoFreq);

    //selects and changes values of demographic data using D3
    d3.select("#demo_id>p").text("id: " + demoId);
    d3.select("#demo_eth>p").text("ethnicity: " + demoEth);
    d3.select("#demo_gender>p").text("gender: " + demoGender);
    d3.select("#demo_age>p").text("age: " + demoAge);
    d3.select("#demo_loc>p").text("location: " + demoLoc);
    d3.select("#demo_bb>p").text("bbtype: " + demoBb);
    d3.select("#demo_wfreq>p").text("wfreq: " + demoFreq);

  }

});
