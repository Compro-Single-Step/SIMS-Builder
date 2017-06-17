class BuilderModel {
    private builderState: Object;
    private builderModel: Object;

    setState(state) {
        this.builderState = state;
    }

    setDefaultState(model) {
        this.builderModel = JSON.parse(JSON.stringify(model));
    }

    getState() {
        return this.builderState;
    }

    getStateRef(modelRefStr) {
        return this.getRef(modelRefStr, this.builderState);
    }

    getDefaultState(modelRefStr) {
        return this.getRef(modelRefStr, this.builderModel);
    }

    getRef(modelRefStr, model) {
        var propertyAccessorPathArray = modelRefStr.replace(/['{{','}}']/g, "").split('.');
        for (let nestingLevel = 0; nestingLevel < propertyAccessorPathArray.length; nestingLevel++) {
            model = model[propertyAccessorPathArray[nestingLevel]];
        }
        return model;
    }

    evaluateParams(model, referenceObject, functionsObject) {
        let tempObj = {}
        for (let key in referenceObject) {
            if (typeof referenceObject[key] === "object" && referenceObject[key] !== null) {
                let func = referenceObject[key]["function-name"];
                let params = referenceObject[key]["params"];
                let updatedParams = {};

                //Evaluating values of each param
                for (let i in params) {
                    updatedParams[i] = this.getRef(params[i], model);
                }
                tempObj[key] = functionsObject[func](updatedParams);
            } else {
                tempObj[key] = this.getRef(referenceObject[key], model);
            }
        }

        return tempObj;
    }
};

export let BuilderModelObj = new BuilderModel();
