var dummyDependencyFile = (function () {
    function dummyDependencyFile() {
    }
    dummyDependencyFile.prototype.dummyFun1 = function (value) {
        console.log("dummyDependencyFile : " + value);
    };
    dummyDependencyFile.prototype.dummyFun2 = function (value) {
        console.log("dummyDependencyFile : " + value);
    };
    dummyDependencyFile.prototype.getSelectedCell = function (value) {
        console.log("dummyDependencyFile : " + value);
    };
    return dummyDependencyFile;
}());
module.exports = new dummyDependencyFile();
