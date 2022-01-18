import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HelperService } from './helper';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
