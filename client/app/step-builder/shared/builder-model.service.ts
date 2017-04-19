class BuilderModel {
    private builderState: Object;
    private builderModel: Object;

    setState(state) {
        this.builderState = state;
    }

    setModel(model) {
        this.builderModel = JSON.parse(JSON.stringify(model));
    }

    getState() {
        return this.builderState;
    }

    getStateRef(modelRefStr) {
        return this.getRef(modelRefStr, this.builderState);
    }

    getModelRef(modelRefStr) {
        return this.getRef(modelRefStr, this.builderModel);
    }

    getRef(modelRefStr, model) {
        var propertyAccessorPathArray = modelRefStr.replace(/['{{','}}']/g, "").split('.');
        for (let nestingLevel = 0; nestingLevel < propertyAccessorPathArray.length; nestingLevel++) {
            model = model[propertyAccessorPathArray[nestingLevel]];
        }
        return model;
    }
};

export let BuilderModelObj = new BuilderModel();
