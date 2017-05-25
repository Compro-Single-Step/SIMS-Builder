const config = require('../../config/config');
const fs = require('fs');


class BaseFileStore {

    constructor(){
        
    }
    
    readCsvFile(absolutePath) {
        
    }
    // Below function was a duplicate. Use 'getStepXMLFolderPath' instead.
    // getFileStoreStepFolderPath(taskId, stepIdx) {
    //  }

    getSimsXmlStepFolderPath(taskId, stepIdx) {
        return this.getTaskFolderPath(taskId, stepIdx) + stepIdx + "/";
    }


    copyAssetToTaskFolder(srcPath, taskParams) {

    }
    /**
     * @param {*} sourceFileLocation : Location from which file to be copied 
     * Ex: "GO16.WD.12.12B.02.T1/1/1493790231823.DocumentData.json"
     * @param {*} resourceMap : It's an object which contains following key-value pairs:
     *   AssetFolderHierarchy: Any custom folder hierarchy
     *   fileName: "1493790231823.DocumentData.json"
     *   resourceType: "step | skill" => 
     *          skill means that it's a skill resource and has to be copied from "filestore/skills/" folder
     *          step means that it's a user uploaded resource and has to be copied from "filestore/resources/" folder
     * @param {*} taskId : Task ID
     * @param {*} stepIndex : Step Index
     * OUTPUT : This function copies the resource file from a source location to corresponding 
     * destination and returns the promise for same
     */
    copyAssetToTaskFolderEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex) {

    }

    readTaskRes(filepath, readFileType) {

    }
    
    getTaskFolderPath(taskId) {
        return '{#approot#}/';
    }

    getSkillFile(filePath, folder) {
        return new Promise((resolve, reject) => {
            let absolutePath = filePath;

            if (folder) {
                absolutePath = folder + filePath;
            }

            fs.readFile(absolutePath, 'utf8', function (error, data) {
                if (error) {
                    error.filePath = filePath;
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        })
    }

    saveStepXML(taskId, stepIndex, OutputXML) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";//this will come from out side.
        return this.saveFileToFileStore(folderPath, fileName, OutputXML);
    }

    /**
     * 
     * @param {*} taskParams TaskParamas contains task metadata.
     * @param {*} File The data that is to be stored in the File
     * @param {*} FileName Name for the File to be stored
     * Output: Relative Path of the File saved in File Store to be added in Task XML
     */
    saveTaskResources(taskParams, File, FileName) {
        let destPath = this.getStepXMLFolderPath(taskParams.taskId, taskParams.stepIndex);
        let relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);
        let fileName = FileName; //this will come from out side.
        return this.saveFileToFileStore(destPath, fileName, File).then(()=>{
            var relativeResourcePath = relativeXmlPath+fileName;
            return Promise.resolve(relativeResourcePath);
        });
    }

    saveResourceFile() {
        return this.uploadFileHandler();
    }

    removeResourceFile(filePath) {
    
    }

    getFileFromFileStore(filePath, folder) {
    
    }

    uploadFileHandler() {
        
    }

    createFolder(folderPath) {
        
    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIndex + "/";
    }
    
    /**
     * @param {*} taskId : Task ID
     * @param {*} stepIndex : Step Number
     * OUTPUT : Absolute Folder Path of the corresponding Task till the Assets folder
     */
    getStepAssetsFolderPath(taskId, stepIndex) {
        return this.getStepXMLFolderPath(taskId, stepIndex) + "Assets/";
    }

    getUploadedResourceFolderPath(relPath) {
        return config.fileStore.resourceFolder + relPath;
    }

    saveFileToFileStore(filepath, fileName, file) {
    
    }

    getResource(filePath, folder) {
        return this.getFileFromFileStore(filePath, folder);
    }

    getTaskFolderOnLocal(taskId){

    }
}

module.exports = BaseFileStore;