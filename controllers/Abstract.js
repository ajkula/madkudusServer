
	let express = require('express');
	const logule = require('logule').init(module);

	module.exports = class AbstractController {
		constructor (container) {
			this.container = container;
			this.router = express.Router();
		}
	
		get (serviceId) {
			logule.info("get (" + serviceId + ")")
			return this.container[serviceId];
		}
	}
	