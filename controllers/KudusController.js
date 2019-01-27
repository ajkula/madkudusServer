
	const Abstract = require('./Abstract');
	const logule = require('logule').init(module);
	const async = require('async');
	const request = require('request');
	
	module.exports = class kudus extends Abstract {
			constructor(container) {
					super(container);
					this.container = container;
					this.router.get('/kudus', this.getKudus.bind(this));
					this.router.get('/', this.message.bind(this));
			}
	
			message(req, res) {
					res.json({"Usage:": "/kudus/"});
			}
	
			getKudus(req, res) {
				let BODY = null;
				async.parallel([
					callback => {
						request('https://s3-us-west-2.amazonaws.com/team.madkudu.com/species.json', function (error, response, body) {
							// if (!error && response.statusCode == 200) {
								BODY = body;
								logule.warn(...JSON.parse(body).map(e => { return '\n\t' + e.name + ' - ' + e.continent; })); 
								callback();
							// } else {
								// callback(error)
							// }
						});
					}
				], err => {
					err ? logule.error(err) : null;
					res.json(JSON.parse(BODY));
				});
		}
	}
	