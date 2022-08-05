import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './pages/shared/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './core/interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	AngularMaterialModule,
	HttpClientModule
  ],
  providers:[
	{
		provide:HTTP_INTERCEPTORS,
		useClass:LoaderInterceptorService,
		multi:true
	}
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
