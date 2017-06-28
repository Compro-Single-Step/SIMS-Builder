// note - legacy code, todo: refactor and use a templating engine

exports.jsonToDistXml = function(scriptData) {

  if(scriptData.task_json[0] !== undefined){

    var taskData = scriptData.task_json[0];

    var xmlPre = '<?xml version="1.0" encoding="UTF-8"?><Task id="'+ taskData.id +'" name="'+ taskData.name +'">  <description>'+ taskData.description +'</description>  <friendlyTaskID>'+ taskData.id +'.'+ taskData.scenario +'</friendlyTaskID>  <scenario name="'+ taskData.scenario +'">';
    var xmlPost =   '</scenario>    </Task>';

    /*var itemsInitCount = 0;
     for(var p=0;p<taskData.items.length;p++){
     if(taskData.items[p].init){
     itemsInitCount++;
     }
     }*/

    var taskDataPre = '<Items count="'+taskData.items.length+'">';
    var taskDataPost = '</Items>';

    for(var i=0;i<taskData.items.length;i++){

      // if(taskData.items[i].init){
      var suffix='';
      var selectedType = '';
      var methodCount = 0;
      var methodTypeCount = {
        "Ribbon" : 0,
        "Keyboard" : 0,
        "Toolbar" : 0,
        "Mouse" : 0,
        "Shortcut Menu" : 0,
        "Other" : 0,
        "Menu" : 0,
        "Right - Click" : 0
      };

      taskDataPre = taskDataPre + '<Item sno="'+(i+1)+'">';

      for(var j=0;j<taskData.items[i].methods.length;j++){
        suffix = '';

        selectedType = taskData.items[i].methods[j].type;
        methodCount = methodTypeCount[selectedType];

        methodTypeCount[selectedType] = ++methodCount;

        if (methodCount > 1) {
          suffix = "(" + methodCount + ")";
        }

        // if(taskData.items[i].methods[j].init){
        taskDataPre = taskDataPre + '<Method group="'+taskData.items[i].methods[j].group+'" name="'+taskData.items[i].methods[j].type+suffix+'" sno="'+(j+1)+'"><Actions>';

        for(var k=0;k<taskData.items[i].methods[j].actions.length;k++){

          //  if(taskData.items[i].methods[j].actions[k].init){
          taskDataPre = taskDataPre + '<Action sno="'+(k+1)+'"><actionType name="'+(taskData.items[i].methods[j].actions[k].name).toString().trim().replace("()","")+'">';

          for(var l=0;l<taskData.items[i].methods[j].actions[k].values.length;l++){
            taskDataPre = taskDataPre + '<'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>'+taskData.items[i].methods[j].actions[k].values[l].actVal+'</'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>';
          }

          taskDataPre = taskDataPre + '</actionType></Action>';
          //  }
        }
        taskDataPre = taskDataPre + '</Actions></Method>';
        //  }
      }
      taskDataPre = taskDataPre + '</Item>';
      //  }
    }

    return xmlPre + taskDataPre + taskDataPost + xmlPost;
  }

};

exports.jsonToDistJava = function(scriptData) {

  // note: expects no duplicate pathways, todo:add check for same

  if(scriptData.task_json[0] !== undefined){
    var taskData = scriptData.task_json[0];
    var pathwayListData = scriptData.task_json[1];


    /*var itemsInitCount = 0;
     for(var p=0;p<taskData.items.length;p++){
     if(taskData.items[p].init){
     itemsInitCount++;
     }
     }*/

    var preJ = 'package testcase.' +
      taskData.appName +
      ';    import org.testng.annotations.Test;    import runner.TestRunner;    public class Test_' +
      ((taskData.id).replace(/\./gi, "_")).trim()

      +
      '_' +
      taskData.scenario.toUpperCase().trim()
      +
      ' extends TestRunner {    ';

    var postJout = ' }';

    var runJFinal = preJ;

    var testCount = 0;
    if(pathwayListData !== undefined){
      for (var q = 0; q < pathwayListData.length; q += 2) {
        var arrayItem = pathwayListData[q];

        if(arrayItem.constructor === Array){

          var runJ = '';

          var _pathwaySuffix = '';

          arrayItem.forEach(function (arrayItem2) {
            _pathwaySuffix += parseInt((arrayItem2.split(',')[1]).replace(/"/g, ""));
          });

          var preJin = '\n    ' +
            '@Test (groups = {' + pathwayListData[q+1] + '})' +
            'public void ' +
            ((taskData.id).replace(/\./gi, "_")).trim() +
            '_' +
            //(taskData.scenario.toUpperCase()).trim() + '_' + (++testCount).toString()

            (taskData.scenario.toUpperCase()).trim() + '_' + _pathwaySuffix +
            '() throws Exception {            System.out.println("START..");            ';

          var postJ = 'Thread.sleep(3000);            ' +
            'System.out.println("DONE.");        }   \n';

          arrayItem.forEach(function (arrayItem2) {
            runJ = runJ + 'executeItem(' +
            '"' + taskData.id.trim() + '.' + taskData.scenario.trim() + '", ' +
            '"' + taskData.scenario.trim() + '", ' +
            '' + arrayItem2 +
            ');';
          });

          runJFinal = runJFinal + (preJin + runJ + postJ );
        }
      };
    }
    runJFinal = runJFinal + postJout;

    return runJFinal;
  }
};
