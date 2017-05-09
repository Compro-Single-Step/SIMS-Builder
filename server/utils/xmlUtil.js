class XMLUtil{

	generateTaskFolderPath(taskId){
        return '{#approot#}/';
	}

    generateStepFolderPath(taskId, stepIndex){
        return this.generateTaskFolderPath(taskId) + stepIndex + "/";
    }

    genStepAssetsFolderPath(taskId, stepIndex){
        return this.generateStepFolderPath(taskId, stepIndex) + "Assets/";
    }
}

module.exports = new XMLUtil();
