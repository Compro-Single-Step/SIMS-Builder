const config = require('./../../config/skilltest.config'),
  request = require('request');

class RunHandler {

  triggerTestRun(testdata) {

    return new Promise((resolve, reject) => {
      /**
       * Sample request body
       {
         "user" : {
             "name" : "abhishekk",
             "ip" : "192.168.1.251",
             "userdata" : {}
         },
         "run" : {
             "env" : "hub",
             "os" : "windows",
             "resolution": "1600x1280",
             "app" : {
                 "url" : "http://dev2.comprotechnologies.com/SimBuilderPreview/SIM5Frame.aspx",
                 "public" : "false",
                 "build" : ""
                 },
             "browser" : {
                 "node" : "abhishekk",
                 "name" : "chrome",
                 "version" : "ANY"
                 }
         },
         "task": {
             "filename": "SKL16_XL_04_01_03_T1",
             "appName" : "excel",
             "xml": "null",
             "java": "null",
             "json": "",
             "commit":"false"
             },
         "svn": {
             "url": "",
             "username":"",
             "password":"",
             "message" :""
             }
         }
       */

      let url = (config.runner.url + config.runner.runtask),
        options = {
          method: 'post',
          body: testdata,
          json: true,
          url: url
        };

      request(options, (err, runner_response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
  }

}
;

module.exports = new RunHandler();


