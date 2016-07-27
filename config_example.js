/* Copy to config.js and configure */
var config = {};

// Application ID from developer.amazon.com
config.applicationId = 'amzn1.echo-sdk-ams.app.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// PowerView Hub IP Address
config.powerViewIP = 'x.x.x.x' 

// Scene names
config.rooms = ['living room', 'bedroom', 'stairs'];
config.windows = ['living room top', 'living room bottom', 'living room left', 'bedroom left', 'bedroom right', 'stairs left', 'stairs right'];

// Map scene names to scene IDs
config.scenes = {
  'living room top': {
    'open': '0',
    'closed': '1',
    '20%': '2',
    '50%': '3',
    '75%': '4'
  },
  'living room bottom': {
    'open': '5',
    'closed': '6',
    '20%': '7',
    '50%': '8',
    '75%': '9'
  }
};

module.exports = config;
