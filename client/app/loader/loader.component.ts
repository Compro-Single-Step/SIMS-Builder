import { Component } from '@angular/core';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {
  
  showLoader;

  constructor (private loaderService: LoaderService) {
    this.showLoader = loaderService.getLoaderVisibility();
  }
}
