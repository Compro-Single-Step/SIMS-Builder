
class dummyDependencyFile{
  dummyFun1(value){
      console.log("dummyDependencyFile : "+value);
  }
  dummyFun2(value){
      console.log("dummyDependencyFile : "+value);
  }
  getSelectedCell(value){
      console.log("dummyDependencyFile : "+value);
  }
}

module.exports = new dummyDependencyFile();
