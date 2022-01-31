import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  
  constructor(private speechGenerationService: SpeechGenerationService, private formBuilder: FormBuilder) {
    this.textToSpeechForm = this.formBuilder.group({
      inputText: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
  }

  ngOnInit() {
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
    this.textToSpeechSubscription = this.speechGenerationService.getSpeechForText(this.textToConvert).subscribe((data) => {
      if (data && data.byteLength) {
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
          function (buffer) {
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
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    if (this.textToSpeechSubscription) {
      this.textToSpeechSubscription.unsubscribe();
    }
  }
}
