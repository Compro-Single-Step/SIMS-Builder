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

import { HttpClient } from './_services/http.client';
import { TaskDataService } from './_services/taskData.service' 
import { AppConfig } from './app.config';
import { LoginComponent } from './login/login.component';
import { AuthModule  } from './auth.module';
import { UserService } from './_services/user.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    routing
    
  ],
providers: [ AuthService,HttpClient,AuthGuard,AppConfig,TaskDataService,UserService ],
bootstrap: [AppComponent]
})
export class AppModule {}
