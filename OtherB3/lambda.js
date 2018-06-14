let AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {


	console.log("Hello BrightTalk");

	callback(null,'Successfully executed');
}