import { Injectable } from '@angular/core';
declare var db: any;

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  
  storageName = "TTS";

  constructor() { }

  add(key, value) {
    return new Promise(async (resolve, reject) => {
      if (db) {
        const request =  db.transaction([this.storageName], "readwrite").objectStore(this.storageName).put(value, key)
      }

    });


  }

  get() {

  }

  delete() {

  }
}
