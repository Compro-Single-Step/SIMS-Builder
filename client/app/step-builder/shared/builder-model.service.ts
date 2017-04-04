class BuilderModel {
    private builderModel: Object;

    setModel(newModel) {
        this.builderModel = newModel;
    }

    getModel() {
        return this.builderModel;
    }

    getModelRef(modelRefStr) {
        var accessedObject = this.builderModel;
        var propertyAccessorPathArray = modelRefStr.replace(/['{{','}}']/g, "").split('.');
        for (let nestingLevel = 0; nestingLevel < propertyAccessorPathArray.length; nestingLevel++) {
            accessedObject = accessedObject[propertyAccessorPathArray[nestingLevel]];
        }
        return accessedObject;
    }
};

export let BuilderModelObj = new BuilderModel();
