class ResourceUtil{

    getUploadResourceFolderRelativePath(taskId, stepIndex) {
        return taskId + "/" + stepIndex + "/";
    }

    getFileType(fileName) {
        let fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
        return {
            "png": "img",
            "jpeg": "img",
            "jpg": "img",
            "json": "json",
            "txt": "text",
            "html": "html",
            "xml": "xml"
        }[fileExtension] || fileExtension;
    }

    getFileNameWithExtension(filePath) {
        let filepathArr = filePath.split("/");
        return filepathArr[filepathArr.length - 1].trim();
    }
} 

module.exports = new ResourceUtil();