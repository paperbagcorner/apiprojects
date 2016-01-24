'use strict';

var path = process.cwd();

module.exports = function (app) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/:time')
		.get(function(req, res) {
			console.log("Reached the regexp route for", req.url);
			let timeStr = req.params.time;
			console.log(timeStr);
			let timestamp;
			let result = {};
			
			console.log("Time string:", timeStr);
			// If the time string contains non-numeric characters, attempt to parse it as as time string.
			if (timeStr.match(/\D/)) {
				timestamp = Date.parse(timeStr);
			} else {
				// Question: Do we need to round to the start of the day?
				timestamp = Number(timeStr * 1000);
			}
				
			if (!isNaN(timestamp)) {
				let theDate = new Date(timestamp);
				result = {
					unix: Math.floor(timestamp / 1000),
					natural: theDate.toDateString()
				}
			}
			res.json(result);
		});
};
