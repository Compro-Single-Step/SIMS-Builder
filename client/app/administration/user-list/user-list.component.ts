import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
Data ;
userData;
errorMessage;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
   // this.data =  userData;
   this.initializeUserData();
   console.log(this.userData);
    let searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }
  initializeUserData(): void{
    this.route.data
                     .subscribe(
                       Data => this.Data = Data,
                       error =>  this.errorMessage = <any>error);
					   this.userData = this.Data["userData"];
  }
  
}