class TaskFactory {
   constructor() {
       this.factoryMap = {
       billi:"./BilliTaskData",
       Baloo:"./DemoData"
   }
   }

    // getFactoryInstance(){
    //     let TaskData = require(factoryMap.Billi);
    //     return  new TaskData(resData);

    // }s
    getTaskDataModel(modelType,res){
        var modelRef = require(this.factoryMap[modelType]);
        return new modelRef(res);
    }
}

module.exports = new TaskFactory();