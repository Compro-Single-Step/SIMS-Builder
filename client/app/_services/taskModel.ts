import { Step } from './stepModel';

export class Task {
 		id:string;
        app:string;
        testStatus: boolean;
        commitStatus:boolean;
        stepData: Array<Step>;
        previewUrl:string;
        testUrl:string
 }