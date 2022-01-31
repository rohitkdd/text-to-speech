import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(environment.API_KEY),
    'accept': 'audio/mp3'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SpeechGenerationService {

  constructor(private http: HttpClient) { }

  getSpeechForText(text) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('text', text);
    httpParams = httpParams.set('voice', 'en-US_MichaelV3Voice');
    return this.http.post(`${environment.WATSON_TEXT_TO_SPEECH_API}`, { "text": text }, { headers: httpOptions.headers, params: httpParams, responseType: 'arraybuffer' });
  }

}
