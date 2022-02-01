import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { SpeechGenerationService } from 'src/app/services/speech-generation.service';

@Component({
  selector: 'app-ibm-text-to-speech',
  templateUrl: './ibm-text-to-speech.component.html',
  styleUrls: ['./ibm-text-to-speech.component.scss']
})
export class IbmTextToSpeechComponent implements OnInit {

  textToSpeechForm: FormGroup;
  isFormSubmitted = false;
  textToSpeechSubscription: Subscription;
  textToConvert: string;
  convertedKeys: [];

  constructor(private speechGenerationService: SpeechGenerationService, private formBuilder: FormBuilder,
    private dataExchangeService: DataExchangeService) {
    this.textToSpeechForm = this.formBuilder.group({
      inputText: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
  }

  ngOnInit() {
    this.getAllKeysFromCache();
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.textToSpeechForm.valid) {
      this.textToSpeech();
    }
    return;
  }

  textToSpeech() {
    this.textToConvert = this.textToSpeechForm.get('inputText').value;
    let textInCache = localStorage.getItem(this.textToConvert.toLowerCase());

    if (textInCache) {
      this.getDataFromCache(this.textToConvert.toLowerCase());
    } else {
      this.textToSpeechSubscription = this.speechGenerationService.getSpeechForText(this.textToConvert.toLowerCase()).subscribe((data) => {
        if (data && data.byteLength) {
          localStorage.setItem(this.textToConvert.toLowerCase(), this.textToConvert);
          this.dataExchangeService.add(this.textToConvert.toLowerCase(), data).then((result) => {
            if (result) {
              this.getAllKeysFromCache();
            }
          });
          this.playOutput(data);
        }
      });
    }
  }
  getDataFromCache(searchText: string) {
    this.dataExchangeService.get(searchText.toLowerCase()).then((data) => {
      if (data) {
        this.playOutput(data);
      }
    });
  }

  playOutput(arrayBuffer) {
    let audioContext = new AudioContext();
    let outputSource;
    try {
      if (arrayBuffer.byteLength > 0) {
        audioContext.decodeAudioData(arrayBuffer,
          (buffer) => {
            audioContext.resume();
            outputSource = audioContext.createBufferSource();
            outputSource.connect(audioContext.destination);
            outputSource.buffer = buffer;
            outputSource.start(0);
          },
          function () {
            console.log(arguments);
          });
      }
    } catch (e) {
      console.error(e);
    }
  }

  resetForm() {
    this.textToSpeechForm.reset();
    this.isFormSubmitted = false;
  }

  getAllKeysFromCache() {
    this.dataExchangeService.getAllKeys().then((data: [])=> {
      if (data && data.length)
      this.convertedKeys = data;
    });
  }

  ngOnDestroy(): void {
    if (this.textToSpeechSubscription) {
      this.textToSpeechSubscription.unsubscribe();
    }
  }
}
