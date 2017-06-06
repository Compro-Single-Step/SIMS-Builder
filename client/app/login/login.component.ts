import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { LoaderService } from '../_services/loader.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {
    model: any = {};
    returnUrl: string;
    error = '';

    constructor(
        private router: Router,
         private route: ActivatedRoute,
        private authenticationService: AuthService,
         private LoaderService: LoaderService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    login() {
       
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {

                    this.router.navigate([this.returnUrl]);
                } else {
                    this.error = 'Username or password is incorrect';
                   
                }
            });
    }
    ngAfterViewInit(){
        console.log('After View Init');
         this.LoaderService.setLoaderVisibility(false);

    }
   
}
