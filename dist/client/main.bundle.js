webpackJsonp([7,10],{

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoaderService = (function () {
    function LoaderService() {
        this.loader = {
            Visible: false
        };
    }
    LoaderService.prototype.setLoaderVisibility = function (isvisible) {
        this.loader.Visible = isvisible;
    };
    LoaderService.prototype.getLoaderVisibility = function () {
        return this.loader;
    };
    LoaderService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], LoaderService);
    return LoaderService;
}());
//# sourceMappingURL=E:/Single Step Builder/client/loader.service.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_http_client__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(httpClient) {
        this.httpClient = httpClient;
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    AuthService.prototype.getCurrentUserToken = function () {
        return (this.token);
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        //console.log(JSON.stringify({ username: username, password: password }));
        return this.httpClient.post('/api/login', { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            //console.log('Token'+token);
            if (token) {
                // set token property
                _this.token = token;
                // localStorage.setItem('id_token', token);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        // clear this token from user machine from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_http_client__["a" /* HttpClient */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_http_client__["a" /* HttpClient */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/auth.service.js.map

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../administration/administration.module": [
		738,
		0
	],
	"../step-builder/step-builder.module": [
		740,
		1
	],
	"../task-builder/task-builder.module": [
		741,
		3
	],
	"../taskSearch/taskSearch.module": [
		742,
		4
	],
	"./home/home.module": [
		739,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 265;


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/auth.guard.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(256);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, route, authenticationService) {
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.model = {};
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this.error = 'Username or password is incorrect';
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            template: __webpack_require__(443),
            styles: [__webpack_require__(434)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=E:/Single Step Builder/client/login.component.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(425);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=E:/Single Step Builder/client/main.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_client__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TaskDataService = (function () {
    function TaskDataService(http) {
        this.http = http;
    }
    TaskDataService.prototype.getTaskData = function (taskId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('TaskId', taskId);
        if (this.data && this.taskId.toUpperCase() == taskId.toUpperCase()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.data);
        }
        else {
            return this.http.get("/api/fetchTaskData", { search: params })
                .map(this.extractData.bind(this))
                .catch(this.handleError);
        }
    };
    TaskDataService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.Error) {
            return body.Error;
        }
        else {
            // body = this.mapTaskData(body);
            this.data = body;
            this.taskId = body.id;
            return body || {};
        }
    };
    TaskDataService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Response"]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errMsg);
    };
    TaskDataService.prototype.getTemplateOptions = function () {
        if (this.templateOptions) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.templateOptions);
        }
        else {
            return this.http.get("/api/fetchTaskData/templateOptions")
                .map(this.extractOptions.bind(this))
                .catch(this.handleError);
        }
    };
    TaskDataService.prototype.extractOptions = function (res) {
        var body = res.json();
        if (body.Error) {
            return body.Error;
        }
        else {
            this.templateOptions = body;
            return body || {};
        }
    };
    TaskDataService.prototype.setTaskTemplate = function (taskId, step, templateId) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        var body;
        return this.http.post("/api/fetchTaskData/stepTemplate", { TaskId: taskId, Step: step, TemplateId: templateId }, options)
            .map(function (res) {
            body = res.json();
            var index;
            for (index = 0; index < _this.data.stepData.length && _this.data.stepData[index].Index != body.stepData.Index; index++)
                ;
            _this.data.stepData[index] = body.stepData;
            return res.json();
        })
            .catch(this.handleError);
    };
    TaskDataService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_client__["a" /* HttpClient */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__http_client__["a" /* HttpClient */]) === 'function' && _a) || Object])
    ], TaskDataService);
    return TaskDataService;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/taskData.service.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_client__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUsers = function () {
        return this.http.get("/api/user")
            .map(this.extractData.bind(this))
            .catch(this.handleError);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Response"]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errMsg);
    };
    UserService.prototype.getUser = function (name) {
        if (this.currentUser && this.currentUser.username == name) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.currentUser);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('username', name);
        return this.http.get("/api/user", { search: params })
            .map(this.extractUser.bind(this))
            .catch(this.handleError);
    };
    UserService.prototype.extractUser = function (res) {
        var body = res.json();
        body = body[0];
        this.currentUser = body;
        return body || {};
    };
    UserService.prototype.addUser = function (newUser) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.post("/api/user", newUser, options)
            .map(this.extractResponse.bind(this))
            .catch(this.handleError);
    };
    UserService.prototype.extractResponse = function (res) {
        var body = res.json();
        return body || {};
    };
    UserService.prototype.editUser = function (newUser) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.put("/api/user", newUser, options)
            .map(this.editresponse)
            .catch(this.handleError);
    };
    UserService.prototype.editresponse = function (res) {
        var body = res.json();
        return body || {};
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_client__["a" /* HttpClient */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__http_client__["a" /* HttpClient */]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/user.service.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppConfig = (function () {
    function AppConfig() {
        this.config = {
            name: 'Compro',
            title: 'SIMS Builder Dashboard',
            version: '3.2.0',
            /**
             * Whether to print and alert some log information
             */
            debug: true,
            /**
             * In-app constants
             */
            settings: {
                colors: {
                    'white': '#fff',
                    'black': '#000',
                    'gray-light': '#999',
                    'gray-lighter': '#eee',
                    'gray': '#666',
                    'gray-dark': '#343434',
                    'gray-darker': '#222',
                    'gray-semi-light': '#777',
                    'gray-semi-lighter': '#ddd',
                    'brand-primary': '#5d8fc2',
                    'brand-success': '#64bd63',
                    'brand-warning': '#f0b518',
                    'brand-danger': '#dd5826',
                    'brand-info': '#5dc4bf'
                },
                screens: {
                    'xs-max': 543,
                    'sm-min': 544,
                    'sm-max': 767,
                    'md-min': 768,
                    'md-max': 991,
                    'lg-min': 992,
                    'lg-max': 1199,
                    'xl-min': 1200
                },
                navCollapseTimeout: 2500
            },
            /**
             * Application state. May be changed when using.
             * Synced to Local Storage
             */
            state: {
                /**
                 * whether navigation is static (prevent automatic collapsing)
                 */
                'nav-static': false
            }
        };
        this._resizeCallbacks = [];
        this._screenSizeCallbacks = {
            xs: { enter: [], exit: [] },
            sm: { enter: [], exit: [] },
            md: { enter: [], exit: [] },
            lg: { enter: [], exit: [] },
            xl: { enter: [], exit: [] }
        };
        this._initResizeEvent();
        this._initOnScreenSizeCallbacks();
    }
    AppConfig.prototype.isScreen = function (size) {
        var screenPx = window.innerWidth;
        return (screenPx >= this.config.settings.screens[size + '-min'] || size === 'xs')
            && (screenPx <= this.config.settings.screens[size + '-max'] || size === 'xl');
    };
    AppConfig.prototype.getScreenSize = function () {
        var screenPx = window.innerWidth;
        if (screenPx <= this.config.settings.screens['xs-max']) {
            return 'xs';
        }
        if ((screenPx >= this.config.settings.screens['sm-min'])
            && (screenPx <= this.config.settings.screens['sm-max'])) {
            return 'sm';
        }
        if ((screenPx >= this.config.settings.screens['md-min'])
            && (screenPx <= this.config.settings.screens['md-max'])) {
            return 'md';
        }
        if ((screenPx >= this.config.settings.screens['lg-min'])
            && (screenPx <= this.config.settings.screens['lg-max'])) {
            return 'lg';
        }
        if (screenPx >= this.config.settings.screens['xl-min']) {
            return 'xl';
        }
    };
    AppConfig.prototype.onScreenSize = function (size, fn, /* Boolean= */ onEnter) {
        onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
        if (typeof size === 'object') {
            for (var i = 0; i < size.length; i++) {
                this._screenSizeCallbacks[size[i]][onEnter ? 'enter' : 'exit'].push(fn);
            }
        }
        else {
            this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn);
        }
    };
    AppConfig.prototype.changeColor = function (color, ratio, darker) {
        var pad = function (num, totalChars) {
            var padVal = '0';
            num = num + '';
            while (num.length < totalChars) {
                num = padVal + num;
            }
            return num;
        };
        // Trim trailing/leading whitespace
        color = color.replace(/^\s*|\s*$/, '');
        // Expand three-digit hex
        color = color.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');
        // Calculate ratio
        var difference = Math.round(ratio * 256) * (darker ? -1 : 1), 
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$', 'i')), alpha = !!rgb && rgb[4] !== null ? rgb[4] : null, 
        // Convert hex to decimal
        decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i, function () {
            return parseInt(arguments[1], 16) + ',' +
                parseInt(arguments[2], 16) + ',' +
                parseInt(arguments[3], 16);
        }).split(/,/);
        // Return RGB(A)
        return !!rgb ?
            'rgb' + (alpha !== null ? 'a' : '') + '(' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[0], 10) + difference, darker ? 0 : 255) + ', ' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[1], 10) + difference, darker ? 0 : 255) + ', ' +
                Math[darker ? 'max' : 'min'](parseInt(decimal[2], 10) + difference, darker ? 0 : 255) +
                (alpha !== null ? ', ' + alpha : '') +
                ')' :
            // Return hex
            [
                '#',
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[0], 10) + difference, darker ? 0 : 255).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[1], 10) + difference, darker ? 0 : 255).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](parseInt(decimal[2], 10) + difference, darker ? 0 : 255).toString(16), 2)
            ].join('');
    };
    AppConfig.prototype.lightenColor = function (color, ratio) {
        return this.changeColor(color, ratio, false);
    };
    AppConfig.prototype.darkenColor = function (color, ratio) {
        return this.changeColor(color, ratio, true);
    };
    AppConfig.prototype.max = function (array) {
        return Math.max.apply(null, array);
    };
    AppConfig.prototype.min = function (array) {
        return Math.min.apply(null, array);
    };
    AppConfig.prototype._initResizeEvent = function () {
        var resizeTimeout;
        jQuery(window).on('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                jQuery(window).trigger('sn:resize');
            }, 100);
        });
    };
    AppConfig.prototype._initOnScreenSizeCallbacks = function () {
        var _this = this;
        var resizeTimeout, prevSize = this.getScreenSize();
        jQuery(window).resize(function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                var size = _this.getScreenSize();
                if (size !== prevSize) {
                    // run exit callbacks first
                    _this._screenSizeCallbacks[prevSize].exit.forEach(function (fn) {
                        fn(size, prevSize);
                    });
                    // run enter callbacks then
                    _this._screenSizeCallbacks[size].enter.forEach(function (fn) {
                        fn(size, prevSize);
                    });
                    console.log('screen changed. new: ' + size + ', old: ' + prevSize);
                }
                prevSize = size;
            }, 100);
        });
    };
    AppConfig.prototype.getConfig = function () {
        return this.config;
    };
    AppConfig = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], AppConfig);
    return AppConfig;
}());
//# sourceMappingURL=E:/Single Step Builder/client/app.config.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(169)))

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_http_client__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewService = (function () {
    function PreviewService(http) {
        this.http = http;
    }
    PreviewService.prototype.launchStepPreviewWindow = function (taskId, stepId, templateId, stepText) {
        var _this = this;
        var previewparams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["URLSearchParams"]();
        previewparams.set('taskId', taskId);
        previewparams.set('stepNo', stepId);
        this.http.post("/api/skill/xmlgeneration", { templateId: templateId, taskId: taskId, stepId: stepId, stepText: stepText })
            .subscribe(function (res) {
            _this.res = res.json();
            if (_this.res.status == "success") {
                _this.http.get("/api/taskPreview", { search: previewparams })
                    .subscribe(function (res) {
                    _this.data = res.json();
                    if (_this.data["Url"]) {
                        _this.previewWindow = window.open(_this.data["Url"], '_blank', 'location=yes,scrollbars=yes,status=yes');
                        return true;
                    }
                    else {
                        return _this.data["Error"];
                    }
                });
            }
            else {
                return _this.res["Error"];
            }
        });
    };
    PreviewService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_http_client__["a" /* HttpClient */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_http_client__["a" /* HttpClient */]) === 'function' && _a) || Object])
    ], PreviewService);
    return PreviewService;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/preview.service.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guards_auth_guard__ = __webpack_require__(266);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var appRoutes = [
    { path: '', loadChildren: './home/home.module#HomeModule', canActivate: [__WEBPACK_IMPORTED_MODULE_2__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=E:/Single Step Builder/client/app-routing.module.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(441),
            styles: [__webpack_require__(432)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=E:/Single Step Builder/client/app.component.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_widgster__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_widgster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_widgster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing_module__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_preview_service__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_http_client__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_taskData_service__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_config__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__login_login_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__auth_module__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_user_service__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_loader_service__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__loader_loader_component__ = __webpack_require__(427);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_14__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_18__loader_loader_component__["a" /* LoaderComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_15__auth_module__["a" /* AuthModule */],
                __WEBPACK_IMPORTED_MODULE_7__app_routing_module__["a" /* routing */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_11__services_http_client__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_13__app_config__["a" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_12__services_taskData_service__["a" /* TaskDataService */], __WEBPACK_IMPORTED_MODULE_10__services_preview_service__["a" /* PreviewService */], __WEBPACK_IMPORTED_MODULE_16__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_17__services_loader_service__["a" /* LoaderService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_18__loader_loader_component__["a" /* LoaderComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=E:/Single Step Builder/client/app.module.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthConfig"]({
        noTokenScheme: true,
        noJwtError: true,
        tokenGetter: (function () { return JSON.parse(localStorage.getItem('currentUser')) && JSON.parse(localStorage.getItem('currentUser')).token; })
    }), http, options);
}
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
                    useFactory: authHttpServiceFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
//# sourceMappingURL=E:/Single Step Builder/client/auth.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loader_service__ = __webpack_require__(178);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderComponent = (function () {
    function LoaderComponent(loaderService) {
        this.loaderService = loaderService;
        this.loader = loaderService.getLoaderVisibility();
    }
    LoaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-loader',
            template: __webpack_require__(442),
            styles: [__webpack_require__(433)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_loader_service__["a" /* LoaderService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_loader_service__["a" /* LoaderService */]) === 'function' && _a) || Object])
    ], LoaderComponent);
    return LoaderComponent;
    var _a;
}());
//# sourceMappingURL=E:/Single Step Builder/client/loader.component.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=E:/Single Step Builder/client/environment.js.map

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(47)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(47)();
// imports


// module
exports.push([module.i, ".loader-hidden {\n  visibility: hidden; }\n\n.loader-overlay {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin: -50px 0 0 -50px;\n  width: 100px;\n  height: 100px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(47)();
// imports


// module
exports.push([module.i, ".login-page {\n  background-color: lightgray; }\n\n.page-footer {\n  margin-bottom: 25px;\n  font-size: 10px;\n  color: lightgray;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%;\n  padding-bottom: 20px;\n  min-height: 700px; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: normal; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: normal;\n    text-align: center; }\n\n.lab {\n  text-align: right;\n  padding-right: 30px;\n  margin-bottom: 0px;\n  margin-top: 5px;\n  color: black; }\n\n.loginText {\n  text-align: center;\n  font-weight: 600;\n  font-size: 25px; }\n\n.sectionlogin {\n  border-bottom-right-radius: 2%;\n  border-top-right-radius: 2%;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  background: #FFFFFF;\n  border-color: #cccccc;\n  color: black; }\n\n.loginBackground {\n  background-color: #383E4B;\n  width: 100%;\n  height: 100%; }\n\n.infoSection {\n  border-bottom-left-radius: 2%;\n  border-top-left-radius: 2%;\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  background: #EFEFEF;\n  border-color: #cccccc; }\n\n.Section {\n  padding: 0; }\n\n.leftSection {\n  border-right-style: ridge; }\n  .leftSection .simsBuilderIconAndText .InfoHead {\n    color: #00505c;\n    text-align: center;\n    font-weight: 500;\n    font-size: 25px; }\n  .leftSection .simsBuilderIconAndText .simsBuilderIcon {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding-top: 50px; }\n    .leftSection .simsBuilderIconAndText .simsBuilderIcon img {\n      margin: 0px auto;\n      width: 60px;\n      height: 60px; }\n  .leftSection .widget-body .InfoBody {\n    text-align: center;\n    font-weight: 500;\n    font-size: 13px; }\n\n.rightSection .loginHeader {\n  color: #343434; }\n\n.rightSection .login-form {\n  margin-top: 4.5rem; }\n  .rightSection .login-form .formRow {\n    padding: 10px 40px; }\n    .rightSection .login-form .formRow .icon {\n      font-size: 20px;\n      padding: 5px 10px 0px 10px;\n      color: #777; }\n    .rightSection .login-form .formRow .form-control {\n      font-size: 14px;\n      border: none;\n      border-radius: 0px;\n      border-bottom: 1px solid #777; }\n  .rightSection .login-form .forgetPassRow {\n    padding-top: 0px;\n    font-size: 11px; }\n    .rightSection .login-form .forgetPassRow .passwordSignInRow {\n      padding: 0px; }\n      .rightSection .login-form .forgetPassRow .passwordSignInRow .fgtPassDiv {\n        padding-left: 0px;\n        padding-right: 2px;\n        text-align: left; }\n        .rightSection .login-form .forgetPassRow .passwordSignInRow .fgtPassDiv .fgtPass {\n          color: #00505c;\n          font-weight: 600; }\n      .rightSection .login-form .forgetPassRow .passwordSignInRow .signin-checkbox {\n        color: #888;\n        padding-right: 0px;\n        padding-left: 2px;\n        text-align: right;\n        font-weight: 600; }\n        .rightSection .login-form .forgetPassRow .passwordSignInRow .signin-checkbox input {\n          height: 16px;\n          width: 16px; }\n        .rightSection .login-form .forgetPassRow .passwordSignInRow .signin-checkbox span {\n          position: relative;\n          top: -4px; }\n\n.rightSection .loginButtonDiv {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 40px 0px 10px 0px; }\n  .rightSection .loginButtonDiv button.btn-dark {\n    margin: auto;\n    background-color: #00505c;\n    color: #FFFFFF; }\n    .rightSection .loginButtonDiv button.btn-dark:hover {\n      background-color: #383E4B; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 441:
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ 442:
/***/ (function(module, exports) {

module.exports = "<div [hidden]=\"!loader.Visible\">\r\n    <div class=\"loader-overlay\">\r\n          <img src='assets/images/loader.gif' />\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<div class=\"container loginBackground\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-6 col-md-8 col-sm-10 col-xs-12 offset-xl-3 offset-md-2 offset-sm-1 offset-xs-0\">\r\n        <div class=\"row\">\r\n        <div class=\"col-xl-6 col-md-6 col-sm-6 col-xs-6 Section widget-login infoSection leftSection\">\r\n          <div class=\"widget-login  infoSection\">\r\n            <div class=\"simsBuilderIconAndText\">\r\n              <div class=\"simsBuilderIcon\">\r\n                <img src=\"assets/images/builder_logo_blue.png\">\r\n              </div>\r\n              <header class=\"simsBuilderText\">\r\n                <p class=\"InfoHead\"><strong>SIMS</strong> Builder</p>\r\n              </header>\r\n            </div>\r\n            <div class=\"widget-body\">\r\n              <p class=\"InfoBody\">\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-6 col-md-6 col-sm-6 col-xs-6 Section rightSection\">\r\n          <div class=\" widget-login sectionlogin\">\r\n            <header class=\"loginHeader\">\r\n              <p class=\"loginText\">LOGIN</p>\r\n            </header>\r\n            <div class=\"widget-body\">\r\n              <form class=\"login-form mt-lg\" name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\"  enctype=\"application/x-www-form-urlencoded\">\r\n                <div class=\"row m-t-1 formRow\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n                    <div class=\"icon col-md-2\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i></div>\r\n                    <input type=\"text\" class=\"form-control col-md-10\" id=\"pswd\" placeholder=\"Username\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\r\n                    <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\r\n                </div>\r\n                <div class=\"row m-t-1 formRow\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n                    <div class=\"icon col-md-2\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></div>\r\n                    <input type=\"password\" class=\"form-control col-md-10\" id=\"pswd\" name=\"password\" placeholder=\"Password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n                    <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n                </div>\r\n                <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n                <div class=\"row m-t-1 formRow forgetPassRow\">\r\n                    <div class=\"col-md-2\"></div>\r\n                    <div class=\"col-md-10 passwordSignInRow\">\r\n                      <div class=\"fgtPassDiv col-xl-6 col-md-6 col-sm-6 col-xs-6\"><a class=\"mr-n-lg fgtPass\" href=\"#\">Forgot Password?</a></div>\r\n                      <div class=\"signin-checkbox col-xl-6 col-md-6 col-sm-6 col-xs-6\">\r\n                        <input type=\"checkbox\" value=\"1\">\r\n                        <span>Stay Sign In </span>\r\n                      </div>\r\n                    </div>\r\n                </div>  \r\n                <div class=\"clearfix loginButtonDiv\">\r\n                  <button class=\"btn btn-primary btn-dark\">LOGIN NOW!</button>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </main>\r\n  <footer class=\"page-footer\">\r\n    <div class=\"site-info row\">\r\n      <div class=\"col-xl-6 col-md-8 col-sm-10 col-xs-12 offset-xl-3 offset-md-2 offset-sm-1 offset-xs-0\">\r\n      Copyright © 2016 comprotechnologies.com. <a href=\"http://www.comprotechnologies.com\" title=\"Terms of Use\">Terms of Use</a> and <a href=\"http://www.comprotechnologies.com\" title=\"Terms of Use\">Privacy Policy</a>\r\n      </div>\r\n    </div>\r\n  </footer>\r\n</div>\r\n"

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(399);


/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loader_service__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClient; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HttpClient = (function () {
    function HttpClient(authHttp, router, loaderService) {
        this.authHttp = authHttp;
        this.router = router;
        this.loaderService = loaderService;
    }
    HttpClient.prototype.get = function (url, options, hideLoader) {
        var _this = this;
        this.onStart(hideLoader);
        return this.getAuthObservable(this.authHttp.get(url, options)).finally(function () {
            _this.onEnd();
        });
    };
    HttpClient.prototype.post = function (url, data, options, hideLoader) {
        var _this = this;
        this.onStart(hideLoader);
        return this.getAuthObservable(this.authHttp.post(url, data, options)).finally(function () {
            _this.onEnd();
        });
    };
    HttpClient.prototype.put = function (url, data, options, hideLoader) {
        var _this = this;
        this.onStart(hideLoader);
        return this.getAuthObservable(this.authHttp.put(url, data, options)).finally(function () {
            _this.onEnd();
        });
    };
    HttpClient.prototype.delete = function (url, options, hideLoader) {
        var _this = this;
        this.onStart(hideLoader);
        return this.getAuthObservable(this.authHttp.delete(url, options)).finally(function () {
            _this.onEnd();
        });
    };
    HttpClient.prototype.onEnd = function () {
        this.loaderService.setLoaderVisibility(false);
    };
    HttpClient.prototype.onStart = function (hideLoader) {
        if (!hideLoader) {
            this.loaderService.setLoaderVisibility(true);
        }
    };
    HttpClient.prototype.getAuthObservable = function (obs) {
        var _this = this;
        return obs.catch(function (error) {
            var errMsg;
            if (error.status === 401) {
                _this.router.navigate(['/login'], { queryParams: { returnUrl: _this.router.url } });
                return [];
            }
            else {
                return obs;
            }
        });
    };
    HttpClient = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__loader_service__["a" /* LoaderService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__loader_service__["a" /* LoaderService */]) === 'function' && _c) || Object])
    ], HttpClient);
    return HttpClient;
    var _a, _b, _c;
}());
//# sourceMappingURL=E:/Single Step Builder/client/http.client.js.map

/***/ })

},[734]);
//# sourceMappingURL=main.bundle.js.map