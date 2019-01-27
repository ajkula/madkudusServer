
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logule = require('logule').init(module);

module.exports = class Server {

    /**
     * Init project
     */
    constructor () {
      this.container = {user: "MadKudus"};
      this.app = express();
      this.app.use(bodyParser.json());
      this.app.use(this.cors)
      
      this.loadDBs();
      this.loadControllers();
      logule.info("this.container", this.container);
    }

  /**
   * Connect to databases
   */
  async loadDBs () {
    // const dynamoConnector = new DynamoConnector('dbName', false)
    // this.container.campaignModel = new CampaignModel(dynamoConnector)
  }

  
  cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }

  /**
   * Load Http controllers
   */
  loadControllers () {
    console.log(__dirname + '/controllers/');
    const files = fs.readdirSync(__dirname + '/controllers/');
    files.forEach((file) => {
      if (/Controller\.js/.test(file)) {
        const classCtrl = require(__dirname + '/controllers/' + file);
        this.app.use(new classCtrl(this.container).router);
      }
    })
  }
}
	