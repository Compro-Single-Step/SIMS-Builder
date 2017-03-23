module.exports = class baseSkill{
    // This is the function of the TaskBar tooltip image path
    createTooltipImagePath(paramValueObj){
      
      return paramValueObj["DocTitle"].path;
    }
}