import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { PreviewService } from '../../../_services/preview.service';
import { LoaderService } from '../../../_services/loader.service';
import { BuilderModelObj } from '../../shared/builder-model.service';
import { skillManager } from '../../shared/skill-manager.service';

declare var Messenger: any;
declare const $;
declare const window;

@Component({
    selector: 'app-preview-modal',
    templateUrl: './preview-modal.component.html',
    styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {

    @ViewChild('previewModalDialog') public PreviewModalDialog: ModalDirective;

    taskInfo: Object;
    testMethods: Array<string>;
    finalTestConfig: Object;
    renderingConfig: Object;
    bindedValues: Object;
    launchScenario: string;
    previewWindow;
    builderModelSrvc;
    methodCheckboxes: Object;
    stepsArray: Array<string>;
    selectAll: Boolean;
    userIP: string;
    methodObject: Object;
    initialTestConfig: Object;

    constructor(private previewService: PreviewService, private LoaderService: LoaderService) {
        this.taskInfo = {};
        this.testMethods = [];
        this.renderingConfig = {
            'environment': []
        };
        this.bindedValues = {};
        this.finalTestConfig = { 'script': {}, 'run': {} };
        this.builderModelSrvc = BuilderModelObj;
        this.methodCheckboxes = {};
        this.stepsArray = [];
        this.selectAll = false;
    }

    ngOnInit() {
    }

    setTaskData(taskID, stepIndex, templateID, stepText, appName) {
        this.taskInfo['taskID'] = taskID;
        this.taskInfo['stepIndex'] = stepIndex;
        this.taskInfo['devTemplateID'] = templateID;
        this.taskInfo['stepText'] = stepText;
        this.taskInfo['appName'] = appName;
        this.getUserIP((ip) => {
            this.userIP = ip;
            // this.finalTestConfig['run']['user']['ip']= ip;
        });

        // If check to stop server calls on every click of preview button
        if (!this.taskInfo['testTemplateID']) {
            // Fetch test template ID
            this.previewService.getTestTemplateID(this.taskInfo['devTemplateID'])
                .subscribe((templageObject) => {
                    this.taskInfo['testTemplateID'] = templageObject.test_template_id;
                });

            // Fetch All Test Methods
            this.previewService.getTestMethods(this.taskInfo['taskID'], this.taskInfo['stepIndex'])
                .subscribe(methodsObj => {

                    this.methodObject = methodsObj['pathways'];
                    this.renderingConfig['pathways'] = [];
                    const steps = methodsObj['pathways'][0];
                    this.stepsArray = [];
                    for (const stepIndex in steps) {
                        if (steps.hasOwnProperty(stepIndex)) {
                            if (typeof steps[stepIndex] === 'object') {
                                this.stepsArray.push('Step ' + stepIndex);
                            }
                        }
                    }

                    const pathways = methodsObj['pathways'];
                    pathways.forEach((element, index) => {
                        const pathway = [];
                        for (const step in element) {
                            if (element.hasOwnProperty(step)) {
                                if (typeof steps[step] === 'object') {
                                    pathway.push(element[step]);
                                }
                            }
                        }
                        this.methodCheckboxes[index + 1] = false;
                        this.renderingConfig['pathways'].push(pathway);
                    });

                    this.updateOSList();
                });

            // Rendering step and methods
            this.previewService.getInitialTestConfig()
                .subscribe((initialTestConfig) => {
                    this.initialTestConfig = initialTestConfig;
                    this.renderingConfig['environment'] = initialTestConfig['options']['environment'];
                    this.bindedValues = {
                        'launchScenario': 'preview',
                        'environment': initialTestConfig['defaults']['environment'],
                        'browser': initialTestConfig['defaults']['browser'],
                        'os': initialTestConfig['defaults']['os'],
                        'screenresolution': '1200X900',
                        'brversion': 1,
                    };
                });
        }
        this.PreviewModalDialog.show();
    }

    runPreview() {
        if (this.bindedValues['launchScenario'] === 'preview') {
            // Launch Preview Simulation
            this._previewTask((data) => {
                if (data['Url']) {
                    this.previewWindow = this.previewService.previewSimulation(data['Url']);
                    this.LoaderService.setLoaderVisibility(false);
                }
            });
        } else {
            // Configure the payload JSON to be send to the server for Automation Testing
            this._configurePayload();

            // Launch Automation Test
            this._previewTask((data) => {
                if (data['Url']) {
                    this.LoaderService.setLoaderVisibility(false);
                    this.finalTestConfig['run']['config']['app']['url'] = data['Url'];

                    this.previewService.startAutomationTest(this.finalTestConfig)
                        .subscribe((response) => {
                            if (response.status === 'success') {
                                const updateData = { 'status': 'pending' };
                                const url = response.url || 'http://loadrunner1:9001/';
                                this.previewService.updateTestStatus(this.taskInfo['taskID'], this.taskInfo['stepIndex'], updateData)
                                    .subscribe((res) => {
                                        console.log(res);
                                    }, (error) => {
                                        this.displayErrorMessage('Error occurred in updating the task status.');
                                    });
                                window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
                            }
                        },
                        (error) => {
                            this.displayErrorMessage('An error occurred while running the automated test. Please check your test configurations.');
                        });
                }
            });
        }

        this.PreviewModalDialog.hide();
    }

    updateOSList() {
        this.renderingConfig['os'] = this.initialTestConfig['options']['os'][this.bindedValues['environment']];
        this.updateBrowserList();
    }

    updateBrowserList() {
        this.renderingConfig['browser'] = this.initialTestConfig['options']['browser'][this.bindedValues['os']];
    }

    updateMethodsCheckbox({ event }) {
        let isChecked = event.target.checked;

        for (let pathway in this.methodCheckboxes) {
            if (this.methodCheckboxes.hasOwnProperty(pathway)) {
                this.methodCheckboxes[pathway] = isChecked;
            }
        }
    }

    updateSelectAllsCheckbox({ event }) {
        if (!event.target.checked) {
            this.selectAll = false;
        }
    }

    displayErrorMessage(errorText) {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'block'
        }
        Messenger().post({
            message: errorText,
            type: 'error',
            showCloseButton: true,
            hideAfter: 5
        });
    }

    getTypeOf(value) {
        return typeof value;
    }

    private _previewTask(callback) {
        this.previewService.previewTask(this.taskInfo['taskID'], this.taskInfo['stepIndex'], this.taskInfo['devTemplateID'], this.taskInfo['stepText'])
            .subscribe(response => {
                let data = response.json();
                callback(data);
            },
            (error) => {
                this.LoaderService.setLoaderVisibility(false);
                error = error.json();
                this.displayErrorMessage('Error occurred in Step preview, please check your inputs.');
            });
    }

    private _configurePayload() {
        // Calculate Task Scenario
        this.finalTestConfig['script'] = this._configureTaskScenario(this.taskInfo);

        // Calculate params
        let stepUIState = this.builderModelSrvc.getState();
        let testParams = stepUIState['testParams'];
        this.finalTestConfig['script']['params'] = this.builderModelSrvc.evaluateParams(stepUIState, testParams, skillManager.skillTranslator);

        // Calculate methods config
        this.finalTestConfig['script']['pathways'] = this._configureMethodsConfig(this.methodCheckboxes)

        // calculate run params
        this.finalTestConfig['run']['config'] = this._configureRunParams(this.bindedValues);
        this.finalTestConfig['run']['user'] = {
            'ip': this.userIP,
            'userdata': {}
        }
    }

    private _configureTaskScenario(taskInfo) {
        return {
            test_template_id: taskInfo['testTemplateID'],
            step_number: taskInfo['stepIndex'],
            task_id: taskInfo['taskID'],
            app_name: taskInfo['appName']
        };
    }

    private _configureMethodsConfig(methodCheckboxConfig) {
        let pathwayArray = [];

        let tempObj = {}
        for (let stepNumber in methodCheckboxConfig) {
            if (methodCheckboxConfig[stepNumber]) {
                pathwayArray.push(this.methodObject[parseInt(stepNumber, 10) - 1]);
            }
        };
        return pathwayArray;
    }

    private _configureRunParams(runParamConfig) {

        return {
            'env': runParamConfig['environment'],
            'os': runParamConfig['os'],
            'resolution': runParamConfig['screenresolution'],
            'app': {
                'url': '',
                'public': 'false',
                'build': ''
            },
            'browser': {
                'node': runParamConfig['client'],
                'name': runParamConfig['browser'],
                'version': runParamConfig['brversion'],
            }
        }
    }

    getUserIP(callback) {
        const ip_dups = {};

        // compatibility for firefox and chrome
        const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        const useWebKit = !!window.webkitRTCPeerConnection;

        // minimal requirements for data connection
        const mediaConstraints = {
            optional: [{ RtpDataChannels: true }]
        };

        const servers = { iceServers: [{ urls: 'stun:stun.services.mozilla.com' }] };

        // construct a new RTCPeerConnection
        const pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
            // match just the IP address
            const ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
            const ip_addr = ip_regex.exec(candidate)[1];

            // remove duplicates
            if (ip_dups[ip_addr] === undefined) {
                callback(ip_addr);
            }

            ip_dups[ip_addr] = true;
        }

        // listen for candidate events
        pc.onicecandidate = function (ice) {
            // skip non-candidate events
            if (ice.candidate) {
                handleCandidate(ice.candidate.candidate);
            }
        };

        // create a bogus data channel
        pc.createDataChannel('');

        // create an offer sdp
        pc.createOffer(function (result) {
            // trigger the stun server request
            pc.setLocalDescription(result, function () { }, function () { });

        }, function () { });
    }
}
