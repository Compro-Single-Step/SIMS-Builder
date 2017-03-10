import 'jquery';
import 'widgster';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './app.config';
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AppConfig, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
