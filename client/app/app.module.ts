import 'jquery';
import 'widgster';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { PreviewService } from './_services/preview.service' 

import { HttpClient } from './_services/http.client';
import { TaskDataService } from './_services/taskData.service' 
import { AppConfig } from './app.config';
import { LoginComponent } from './login/login.component';
import { AuthModule  } from './auth.module';
import { UserService } from './_services/user.service';
import { LoaderService } from './_services/loader.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    routing
    
  ],

  providers: [ AuthService,HttpClient,AuthGuard,AppConfig,TaskDataService,PreviewService,UserService,LoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
