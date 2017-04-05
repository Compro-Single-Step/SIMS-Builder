webpackJsonp([2],{

/***/ 1019:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(59)();
// imports


// module
exports.push([module.i, ".skill-container {\n  margin-left: 28px;\n  margin-top: 2px; }\n\n.template_label {\n  font-size: 14px;\n  padding: 0px;\n  color: #000; }\n\n.scenario-step {\n  margin: 0;\n  padding: 0; }\n\n#generate {\n  padding: 15px 0px;\n  margin: 0; }\n\n.template_button {\n  padding-top: 0px;\n  padding-bottom: 0px;\n  background-color: #373a3c; }\n\n.taskbadges {\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.searchForm {\n  display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1020:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(59)();
// imports


// module
exports.push([module.i, "#stepList {\n  padding-top: 25px;\n  padding-left: 25px;\n  padding-bottom: 5px;\n  background-color: #fff;\n  margin-bottom: 10px;\n  color: #000; }\n  #stepList:hover {\n    background-color: #f7f7f9;\n    cursor: pointer; }\n\n.fileIcon {\n  margin-top: -4px; }\n\n.arrow {\n  margin-top: 4%; }\n\n.redText {\n  color: red; }\n\n.greenText {\n  color: green; }\n\n.testSymbol {\n  font-size: 30px; }\n\n.right_arrow {\n  font-size: 25px;\n  margin-top: 35%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1043:
/***/ (function(module, exports) {

module.exports = "<div id=\"TaskMetadata\">\r\n   <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n         <h3 class=\"page-title\">\r\n            <span><strong>TASK ID:</strong> &nbsp;</span>\r\n            <span>\r\n            <img [src]=\"AppImage\"/>\r\n            </span>\r\n            <span class=\"fw-semi-bold\">\r\n            {{TaskData.id}}\r\n            </span>\r\n         </h3>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <h3 class=\"taskbadges pull-right\">\r\n          <span class=\"badge badge-pill badge-success align-middle\">Task Commit Status : {{TaskData.testStatus}}</span>\r\n          <span class=\"badge badge-pill badge-info align-middle\">Task Tested : {{TaskData.commitStatus}}</span>\r\n        </h3>\r\n      </div>\r\n   </div>\r\n</div>\r\n<div class=\"row\">\r\n   <div class=\"col-md-12\">\r\n      <taskbuilder-taskstep *ngFor=\"let step of StepData\" [stepData]=\"step\"></taskbuilder-taskstep>\r\n   </div>\r\n</div>\r\n<div class=\"row\" >\r\n   <div class=\"col-md-12\">\r\n\t\t\t<button class=\"btn btn-inverse mr-1\">\r\n          Test Task\r\n        </button>\r\n      <div class=\"pull-right\">\r\n\t\t\t\t<button (click) = \"lauchPreviewTask()\"class=\"btn btn-inverse mr-1\">\r\n\t\t\t\t\tPreview Task\r\n\t\t\t\t</button>\r\n\t\t\t\t<button class=\"btn btn-inverse width-100\">\r\n\t\t\t\t\tGenerate\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n   </div>\r\n</div>\r\n"

/***/ }),

/***/ 1044:
/***/ (function(module, exports) {

module.exports = "<div id=\"stepList\" class=\"widget-body\" (click)=\"navigateToStepBuilder()\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-10\" >\r\n          <div class=\"text-color row\">\r\n            <div class=\"col col-md-auto\">\r\n                <span class=\"fw-bold step_number\">Step {{step.Index}}</span>\r\n            </div>\r\n            <div class=\"col-md-10 step_text\">\r\n                <span [innerHTML]=\"step.Text\"></span>\r\n                <div class=\"row col-md-12\">\r\n                  <span class=\"skill_metadata\">Skill :&nbsp;{{step.SkillName}}</span>\r\n                  <span>|</span>\r\n                  <span class=\"method-count skill_metadata\">Method Count: <span>{{step.MethodCount}}</span></span>\r\n                  <span>|</span>\r\n                  <span class=\"template_label\">Template: {{step.TemplateName}}</span>\r\n                </div>\r\n            </div>\r\n          </div>       \r\n      </div>\r\n      <div class=\"col-md-2\">\r\n          <div class=\"row\">\r\n            <!--<div class=\"col-md-5\">\r\n                <div class=\"row col-md-12 text-center\">\r\n                  <span class=\"icon_label\">Attributes Filled</span>\r\n                </div>\r\n                <div class=\"row col-md-12\">\r\n                        <div class=\"progress\">\r\n                          <div class=\"progress-bar bg-info\" [ngStyle]=\"{'width':step.stepProgress}\" role=\"progressbar\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">{{step.stepProgress}}</div>\r\n                        </div>\r\n                </div>\r\n\r\n            </div>-->\r\n            <div class=\"col-md-8\">\r\n                <div class=\"row\">\r\n                  <span class=\"icon_label text-center\">Test Status</span>\r\n                </div>\r\n                <div class=\"row testSymbol\">\r\n                  <div class=\"col-md-8 offset-md-2\">\r\n                      <span *ngIf=\"step.TestStatus\" class=\"glyphicon glyphicon-ok greenText\" aria-hidden=\"true\"></span>\r\n                      <span *ngIf=\"!step.TestStatus\" class=\"glyphicon glyphicon-remove redText\" aria-hidden=\"true\"></span>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-1\">\r\n              <div class=\"row\">\r\n                <span class=\"glyphicon glyphicon-menu-right right_arrow\" aria-hidden=\"true\" tooltip=\"Build\"></span>\r\n              </div>\r\n            </div>\r\n            </div>\r\n      </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_builder_component__ = __webpack_require__(998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__taskstep_taskstep_component__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__task_builder_shared_taskDataResolver_service__ = __webpack_require__(997);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskBuilderModule", function() { return TaskBuilderModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__task_builder_component__["a" /* TaskBuilderComponent */], pathMatch: 'full', resolve: {
            taskData: __WEBPACK_IMPORTED_MODULE_5__task_builder_shared_taskDataResolver_service__["a" /* TaskDataResolver */]
        } }
];
var TaskBuilderModule = (function () {
    function TaskBuilderModule() {
    }
    TaskBuilderModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes)],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__task_builder_component__["a" /* TaskBuilderComponent */], __WEBPACK_IMPORTED_MODULE_4__taskstep_taskstep_component__["a" /* TaskstepComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5__task_builder_shared_taskDataResolver_service__["a" /* TaskDataResolver */]]
        }), 
        __metadata('design:paramtypes', [])
    ], TaskBuilderModule);
    return TaskBuilderModule;
}());
//# sourceMappingURL=D:/Sim_Builder_Pack_Deploy/checkout/develop/client/task-builder.module.js.map

/***/ }),

/***/ 997:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_taskData_service__ = __webpack_require__(401);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDataResolver; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskDataResolver = (function () {
    function TaskDataResolver(dataService) {
        this.dataService = dataService;
    }
    TaskDataResolver.prototype.resolve = function (route) {
        return this.dataService.getTaskData(route.params['id']);
    };
    TaskDataResolver = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_taskData_service__["a" /* TaskDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_taskData_service__["a" /* TaskDataService */]) === 'function' && _a) || Object])
    ], TaskDataResolver);
    return TaskDataResolver;
    var _a;
}());
//# sourceMappingURL=D:/Sim_Builder_Pack_Deploy/checkout/develop/client/taskDataResolver.service.js.map

/***/ }),

/***/ 998:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_preview_service__ = __webpack_require__(403);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskBuilderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskBuilderComponent = (function () {
    function TaskBuilderComponent(route, previewService, router) {
        this.route = route;
        this.previewService = previewService;
        this.router = router;
        this.TaskData = {};
    }
    TaskBuilderComponent.prototype.ngOnInit = function () {
        this.initialiseTaskData();
    };
    TaskBuilderComponent.prototype.initialiseTaskData = function () {
        var _this = this;
        this.route.data
            .subscribe(function (taskData) { return _this.TaskData = taskData; }, function (error) { return _this.errorMessage = error; });
        if (this.TaskData["taskData"] == "Invalid task ID") {
            this.router.navigate(["/"]);
        }
        else {
            this.TaskData = this.TaskData["taskData"];
            this.StepData = this.TaskData["stepData"];
            this.AppImage = this.ApplicationImage(this.TaskData["app"]);
        }
    };
    TaskBuilderComponent.prototype.ApplicationImage = function (taskApp) {
        return {
            "Excel": "assets/images/Excel.png",
            "Word": "assets/images/Word.png",
            "Access": "assets/images/Access.png",
            "PPT": "assets/images/PPT.png"
        }[taskApp] || "assets/images/Access.png";
    };
    TaskBuilderComponent.prototype.lauchPreviewTask = function () {
        // this.previewService.launchPreviewWindow(this.TaskData["id"]);
    };
    TaskBuilderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-task-builder',
            template: __webpack_require__(1043),
            styles: [__webpack_require__(1019)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_preview_service__["a" /* PreviewService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_preview_service__["a" /* PreviewService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _c) || Object])
    ], TaskBuilderComponent);
    return TaskBuilderComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Sim_Builder_Pack_Deploy/checkout/develop/client/task-builder.component.js.map

/***/ }),

/***/ 999:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(165);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskstepComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskstepComponent = (function () {
    function TaskstepComponent(route, router) {
        this.route = route;
        this.router = router;
        this.stepData = [];
    }
    TaskstepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.step = this.stepData;
        this.route.params.subscribe(function (params) {
            _this.taskID = params["id"];
        });
    };
    TaskstepComponent.prototype.navigateToStepBuilder = function () {
        this.router.navigate(["task", this.taskID, "step", this.step.Index]);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], TaskstepComponent.prototype, "stepData", void 0);
    TaskstepComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'taskbuilder-taskstep',
            template: __webpack_require__(1044),
            styles: [__webpack_require__(1020)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _b) || Object])
    ], TaskstepComponent);
    return TaskstepComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Sim_Builder_Pack_Deploy/checkout/develop/client/taskstep.component.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map