const mapperService = require('./../modules/skilltest/mapper.service'),
    templateService = require('./../modules/skilltest/template.service'),
    locatorService = require('./../modules/skilltest/locator.service'),
    converterService = require('./../modules/skilltest/converter.service'),
    scriptService = require('./../modules/skilltest/script.service'),
    taskService = require('./../modules/skilltest/task.service'),
    runHandler = require('./../modules/skilltest/run.handler'),
    config = require('./../config/skilltest.config'),
    runConfig = require('./../config/skilltest.run.config');


class SkillTest {

    /**
     * Controllers for locators
     */
    getApplicationLocator(appType) {
        return locatorService.getApplicationLocators(appType);
    }

    /**
     * Controllers for template
     */
    getTemplateList(appType) {
        return templateService.getTemplateList(appType);
    }

    getTemplateById(templateId, appType) {

        return templateService.getTemplateById(templateId, appType);
    }

    getTemplateLinkage(templateId) {

        return templateService.getTemplateLinkage(templateId);
    }

    /**
     * Controllers for mapper
     */

    getMapperByTemplateId(templateId, appType) {

        return mapperService.getMapperByTemplateId(templateId, appType);
    }

    /**
     * Controllers for script
     */

    getScriptList(appType) {

        return scriptService.getScriptList(appType);
    }

    getScriptBySleId(sleId, appType, format) {

        return scriptService.getScriptBySleId(sleId, appType, format);
    }

    generateAndSaveScript(req, res) {

        return new Promise((resolve, reject) => {
            let script_meta = {
                template_id: req.body.test_template_id,
                step_number: req.body.step_number,
                sle_id: req.body.task_id,
                task_id: (this.splitSleId(req.body.task_id)).task_id,
                scenario: (this.splitSleId(req.body.task_id)).scenario,
                params: req.body.params,
                pathways: req.body.pathways,
                appName: req.body.app_name
            };

            // generate script
            scriptService.generateScript(script_meta)
                .then((script) => {
                    return scriptService.saveScript(script)
                })
                .then((status) => {
                    resolve(status)
                })
                .catch(e => reject(e));

        })

    }

    /**
     * Controllers for taskrun
     * Sample request body
     *
     {
       "script": {
         "test_template_id": "df380df4-450d-11e7-a919-92ebcb67fe33",
         "step_number": "1",
         "task_id": "SKL16.XL.04.01.03.T1",
         "app_name": "excel",
         "params": {
           "source_range": "G5:H6",
           "destination_start_cell_number": "D5",
           "destination_range": "D5:E6"
         },
         "pathways": [
           "1",
           "4"
         ]
       },
       "run": {
         "config": {
           "env": "hub",
           "os": "windows",
           "resolution": "1600x1280",
           "app": {
             "url": "http://dev2.comprotechnologies.com/SimBuilderPreview/SIM5Frame.aspx",
             "public": "false",
             "build": ""
           },
           "browser": {
             "node": "aws",
             "name": "chrome",
             "version": "ANY"
           }
         },
         "user": {
           "name": "Abhishek",
           "ip": "192.168.1.251",
           "userdata": {}
         }
       }
     }
     */



    generateScriptAndRun(req, res) {

        return new Promise((resolve, reject) => {

            var _script, _run, script_meta, filename, run_request_body;

            // todo: add validation on request body
            try {
                _script = req.body.script;
                _run = req.body.run;

                script_meta = {
                    template_id: _script.test_template_id,
                    step_number: _script.step_number,
                    sle_id: _script.task_id,
                    task_id: (this.splitSleId(_script.task_id)).task_id,
                    scenario: (this.splitSleId(_script.task_id)).scenario,
                    params: _script.params,
                    pathways: _script.pathways,
                    appName: _script.app_name
                };

                filename = ((script_meta.sle_id.replace(/\./gi, "_")).trim());

                run_request_body = {
                    "user": _run.user,
                    "run": _run.config,
                    "task": {
                        "filename": filename,
                        "appName": _script.app_name,
                        "xml": "",
                        "java": "",
                        "json": "",
                        "xpaths": [],
                        "commit": "false"
                    },
                    "svn": {
                        "url": "",
                        "username": "",
                        "password": "",
                        "message": ""
                    }
                };
            } catch (er) {
                console.log('error in request body json' + er);
            }

            // generate script
            scriptService.generateScript(script_meta)
                .then((script) => {
                    try {
                        run_request_body.task.xml = converterService.jsonToDistXml(script);
                        run_request_body.task.java = converterService.jsonToDistJava(script);
                        run_request_body.task.json = script;
                    } catch (error) {
                        Promise.reject(error);
                    }

                    return locatorService.getApplicationLocators(run_request_body.task.appName);
                })
                .then((locators) => {

                    // create locators array

                    var _xpaths = [];
                    if (locators.length) {
                        for (var i in locators) {
                            var _temp = (locators[i].xpath.key.trim()) + ' = ' + (locators[i].xpath.value.trim());
                            _xpaths.push(_temp)
                        }
                    }

                    run_request_body.task.xpaths = _xpaths;
                    // todo: move script conversion code to runner server send json in request, save script in runner
                    return runHandler.triggerTestRun(run_request_body)
                })
                .then((status) => {
                    resolve(status);
                })
                .catch(e => reject(e));

        })

    };

    getRunConfigurations() {
        // todo: move this conf to database
        return new Promise((resolve, reject) => {
            resolve(runConfig);
        })
    }


    getPathwaysByTaskId(task_id, step_no, appType) {

        return taskService.getPathwaysForTask(task_id, step_no);
    }


    splitSleId(sle_id) {
        var lastIndex = sle_id.lastIndexOf(".")

        return {
            task_id: sle_id.substring(0, lastIndex),
            scenario: sle_id.substring(lastIndex + 1)
        };

    }

    updateTestStatus(taskId, step, pathwaysData) {
        return taskService.updateTestStatus(taskId, step, pathwaysData);
    }

    getTestStatus(taskId, step) {
        return taskService.getTestStatus(taskId, step);
    }

    getTestDetails(taskId, step) {
        return taskService.getTestDetails(taskId, step);
    }
}

module.exports = new SkillTest();


