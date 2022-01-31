import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbmTextToSpeechComponent } from './components/ibm-text-to-speech/ibm-text-to-speech.component';
import { HttpClientModule } from '@angular/common/http'
import { SafePipe } from './safe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    IbmTextToSpeechComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
