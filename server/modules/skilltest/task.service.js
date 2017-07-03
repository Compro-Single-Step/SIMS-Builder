const dao = require('./dao'),
    config          = require('./../../config/skilltest.config'),
    templateService = require('./template.service');

class TaskService {

  getPathwaysForTask( task_id, step_no ){

    return new Promise((resolve, reject) => {

      if(step_no) {step_no = step_no.trim();}

      this.getDevTemplateListForTask(task_id)
      .then((dev_template_map) => {

          let dev_template_id = '';
        // todo: extend support to return pathways for a task, currentlr single step is supported
          try {
            dev_template_id = dev_template_map[0].steps['step_' + step_no].template;
          } catch(er){
            reject(er)
          }

        return templateService.getTemplateLinkage(dev_template_id);

      })
      .then((template_linkage) => {
        let test_template_id = template_linkage.test_template_id;

        return templateService.getPathwaysByTemplateId(test_template_id, step_no);
      })
      .then((pathways) => {
        resolve(pathways);
      })
      .catch(er => {reject(er)})

    })
  }


  getDevTemplateListForTask( task_id ) {

    let query = [];
    query.push({task_id : task_id});

    return dao.get( config.dao.task_template_map, query );

  };

};

module.exports = new TaskService();


