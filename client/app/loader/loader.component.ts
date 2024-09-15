import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../_services/loader.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnDestroy {
  
  loader;
  subscription: Subscription;

  constructor (private loaderService: LoaderService) {
    this.subscription = loaderService.visibilityChange.subscribe((value) => { 
      this.loader = value; 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
