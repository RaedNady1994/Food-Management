import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 5000,
        preventDuplicates: true
    }),
    SharedModule
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
