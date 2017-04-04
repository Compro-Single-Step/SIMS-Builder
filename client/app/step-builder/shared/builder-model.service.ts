class BuilderModel {
    private builderModel: Object;

    setModel(newModel) {
        this.builderModel = newModel;
    }

    getModel() {
        return this.builderModel;
    }

    getModelRef(modelRefStr) {
        return eval("this.builderModel." + modelRefStr.replace(/['{{','}}']/g, ""));
    }
};

export let BuilderModelObj = new BuilderModel();
