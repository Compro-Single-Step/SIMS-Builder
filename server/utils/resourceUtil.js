module.exports = class ResourceUtil {
    static getUploadResourceFolderRelativePath(taskId, stepIndex) {
        return taskId + "/" + stepIndex + "/";
    }
} 