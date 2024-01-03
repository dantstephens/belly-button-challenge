# belly-button-challenge
Completed by Daniel Stephens

## About this project
This project is a dashboard that is used to explore data from a 'Belly button biodiversity' dataset. This dataset catalogs the microbiobes(also known as 'operational taxonomic units', or OTUs) that colonize the belly buttons of participating subjects. 

### index.html
The dashboard is located on this index page and uses D3 and Plotly script libraries, along with the app.js script.

Bootstrap style sheets are used to apply styling to the page.

### app.js
The file can be accessed in the [static/js](static/js) folder in this repo

This app.js script utilizes D3 to retrieve the JSON dataset from the host. The data in the JSON is parsed and is used to populate the drop down menu, charts, and demographic data. An event listener is used to detect value changes in the drop down and calls a function to re-render the charts and demographic data based on the new value.

#### Running the app
The app is hosted on GitHub and can be accessed here: [https://dantstephens.github.io/belly-button-challenge/](https://dantstephens.github.io/belly-button-challenge/)
