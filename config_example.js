/* Copy to config.js and configure */
var config = {};

// PowerView Hub Hostname
// example: test.com
config.host = '';

// set open scene endpoints
// example: 'scenecollections?sceneCollectionID=123'
//   or 'scenes?sceneID=123'
config.openAll = '';
config.openBedroom = '';
config.openStairs = '';
config.openLivingRoom = '';

//set close scene endpoints
config.closeAll = '';
config.closeBedroom = '';
config.closeStairs = '';
config.closeLivingRoom = '';

//set partial scene endpoints
config.partialAll = '';
config.partialBedroom = '';
config.partialStairs = '';
config.partialLivingRoom = '';

module.exports = config;
