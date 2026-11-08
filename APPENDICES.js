APPENDICES

APPENDIX A

// Importing the necessary shapefiles
var shapefile1 = ee.FeatureCollection('projects/ee-zebulunarthur1/assets/survey_data-point');
var shapefile2 = ee.FeatureCollection('projects/ee-zebulunarthur1/assets/BeforeSurvey');
var routesShapefile = ee.FeatureCollection('projects/ee-zebulunarthur1/assets/newfyproutes');
var commonShapefile = ee.FeatureCollection('projects/ee-zebulunarthur1/assets/studyArea');
var currentShapefile = null;
// Create the map
var map = ui.Map();
map.setOptions('SATELLITE');
// Create the top bar
var topBar = ui.Panel({
  style: {
    stretch: 'horizontal',
    backgroundColor: 'white',
    padding: '10px',
    textAlign: 'center' }});
// Add title
var titleLabel = ui.Label('GIS Based Solid Waste Identification and Optimized Route Planning For Collection and Dumping In Quetta City', {
  fontSize: '18px',
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%' });
topBar.add(titleLabel);
// Create buttons
var afterSurveyButton = ui.Button({
  label: 'After Survey',
  style: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    margin: '5px',
    fontWeight: 'bold' },
  onClick: function() {
    currentShapefile = shapefile1;
    map.layers().reset();
    map.centerObject(shapefile1, 10);
    map.addLayer(shapefile1, {color: 'red'}, 'Shapefile1 Points');
    map.addLayer(commonShapefile, {fillColor: null, width: 2}, 'Common Shapefile Outline');
    displayFeatureDetails(shapefile1); }});
var beforeSurveyButton = ui.Button({

  label: 'Before Survey',
  style: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    margin: '5px',
    fontWeight: 'bold' },
  onClick: function() {
    currentShapefile = shapefile2;
    map.layers().reset();
    map.centerObject(shapefile2, 10);
    map.addLayer(shapefile2, {color: 'blue'}, 'Before Survey Data Points');
    map.addLayer(commonShapefile, {fillColor: null, width: 2}, 'Common Shapefile Outline');
    displayFeatureDetails(shapefile2, true); }});
var routesButton = ui.Button({
  label: 'Show Routes',
  style: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    margin: '5px',
    fontWeight: 'bold' },
  onClick: function() {
    currentShapefile = routesShapefile;
    map.layers().reset();
    map.centerObject(routesShapefile, 10);
    map.addLayer(routesShapefile, {color: 'yellow'}, 'Routes');
    map.addLayer(shapefile1, {color: 'red'}, 'Shapefile1 Points');
    map.addLayer(commonShapefile, {fillColor: null, width: 2}, 'Common Shapefile Outline');
    displayRoutesFeatureDetails(routesShapefile); }});
// Create panel for buttons
var buttonPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    stretch: 'horizontal',
    padding: '2px',
    backgroundColor: 'white' }});
buttonPanel.add(afterSurveyButton);
buttonPanel.add(beforeSurveyButton);
buttonPanel.add(routesButton);
// Create side panel for feature
var sidePanel = ui.Panel({
  style: {
    width: '25%',
    padding: '8px',
    backgroundColor: 'white',
    fontSize: '12px',
    position: 'bottom-right' }});

// Add title to the side panel
var sidePanelTitle = ui.Label('Details', {
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 6px 0'});
sidePanel.add(sidePanelTitle);
// Function to display feature details for "After Survey" and "Before Survey"
function displayFeatureDetails(shapefile, isBeforeSurvey) {
  sidePanel.clear();
  shapefile.evaluate(function(features) {
    features.features.forEach(function(feature) {
      var coordinates = feature.geometry.coordinates;
      var props = feature.properties;
      var detailsText = 'Coordinates: ' + coordinates.join(', ') + '\n';
      for (var key in props) {
        detailsText += key + ': ' + props[key] + '\n';
        var details = ui.Label(detailsText);
        sidePanel.add(details); }); });});
}
// Function to display feature details for "Show Routes"
function displayRoutesFeatureDetails(shapefile) {
  sidePanel.clear();
  shapefile.evaluate(function(features) {
    features.features.forEach(function(feature) {
      var props = feature.properties;
      var detailsText = '';
      detailsText += 'location_i: ' + props.location_i + '\n';
      detailsText += 'prop_dista: ' + props.prop_dista + '\n';
      var coordinates = feature.geometry.coordinates;
      detailsText += 'Coordinates: ' + coordinates.join(', ') + '\n';
      var details = ui.Label(detailsText);
      sidePanel.add(details); }); });
}
// Create a panel to hold the map and side panel
var mapSidePanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: sidePanel,
  orientation: 'horizontal',
  style: {
    stretch: 'both' }});
// Add the top bar, button panel, and map side panel to the main panel
var mainPanel = ui.Panel({
  widgets: [topBar, buttonPanel, mapSidePanel],
  style: {
    width: '100%',
    height: '100%' }});
// Reset UI root widgets to include main panel
ui.root.widgets().reset([mainPanel]);
// Set the initial map view
map.centerObject(commonShapefile, 10);
map.addLayer(commonShapefile, {fillColor: null, width: 2}, 'Common Shapefile Outline');