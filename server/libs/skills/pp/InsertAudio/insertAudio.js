const PPTBaseSkill = require("../common/ppSkill");

module.exports = class InsertAudio extends PPTBaseSkill {

  createResXMLPath(skillParams){
    var paramValueObj = skillParams.paramsObj;

  },

  getSubCompTopPosition(){
  	var defaultAudioHeight = 0.67;
  	var top = parseInt(this.slideHeight)/2 - parseInt(defaultAudioHeight)/2;
  	var resolveParam = {"attrValue": top};
    return Promise.resolve(resolveParam);
  },

  getSubCompLeftPosition(){
  	var defaultAudioWidth = 0.67;
  	var left = parseInt(this.slideWidth)/2 - parseInt(defaultAudioWidth)/2;
  	var resolveParam = {"attrValue": left};
    return Promise.resolve(resolveParam);
  },

  getAudioTobeInsertedWithoutExt(skillParams){
  	var resName = skillParams.resAdded;
	  var regExpToRemoveFileExt = /(.+?)\.[^.]*$|$/g;
    var match = regExpToRemoveFileExt.exec(resName);
	  var resolveParam = {"attrValue": match[1]};
    return Promise.resolve(resolveParam);
  },

  getSubCompHostParam(skillParams){
    var selectedSlide = skillParams.selectedSlide;
    var hostParam = '{"Mode":"VideoPlaceHolder","HostParams":{"slide":' + selectedSlide + '}}';
    var resolveParam = {"attrValue": hostParam};
    return Promise.resolve(resolveParam);
  },

  getUpdatedSlideData(skillParams){
    var selectedSlide = skillParams.selectedSlide;
    var imgPath = skillParams.imgPath;
    var hostParam = '[{"Number":' + selectedSlide + ',"ThumbHtml":"<img src=' + imgPath '/>"}]';
    var resolveParam = {"attrValue": hostParam};
    return Promise.resolve(resolveParam);
  }


}