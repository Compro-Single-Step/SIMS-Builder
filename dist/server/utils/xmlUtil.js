class XMLUtil {

    generateTaskFolderPath(taskId) {
        let taskIdArr = taskId.toLowerCase().split('.');
        // if(taskIdArr[0].length > 3) {
        //     taskIdArr[0] = taskIdArr[0].slice(0, taskIdArr[0].length - 2);
        // }

        let taskIdPath = "";
        let taskFolder = "";

        for (let i = 0; i < taskIdArr.length; i++) {
            if (i < taskIdArr.length - 3) {
                taskIdPath += taskIdArr[i] + "/";
            } else if (i == taskIdArr.length - 1) {
                taskFolder += taskIdArr[i] + "/";
            } else {
                taskFolder += taskIdArr[i] + ".";
            }
        }

        // let filePath = config.fileStore.xmlFolder + "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        let taskFolderPath = "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        return taskFolderPath;
    }

    generateStepFolderPath(taskId, stepIndex) {
        return this.generateTaskFolderPath(taskId) + stepIndex + "/";
    }

    genStepAssetsFolderPath(taskId, stepIndex) {
        return this.generateStepFolderPath(taskId, stepIndex) + "Assets/";
    }
}

module.exports = new XMLUtil();