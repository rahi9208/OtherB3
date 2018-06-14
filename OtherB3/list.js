let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	let response = {
		"isBase64Encoded": false,
		"statusCode": 200,
		"headers": {
			"Access-Control-Allow-Origin": "*",
			"MyHeader":"Yo",
			"Access-Control-Allow-Headers":"*"
		},
		"body": "..."
	};

	let itemType = (event.queryStringParameters && event.queryStringParameters.type) || "NON_VEG";
	console.log("Searching for ", itemType);

	ddb.scan({
		TableName: 'otherb3', ExpressionAttributeValues: { ':it': itemType }, FilterExpression: 'itemType = :it'
	}, function (err, data) {
		if (!err && data.Items) {
			response.body = Buffer.from(JSON.stringify(data.Items)).toString("base64");
		} else {
			response.statusCode = 404;
			response.body = "No items found";
		}
		callback(err, response);
	});
}