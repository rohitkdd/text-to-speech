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
        const request =  await db.transaction([this.storageName], "readwrite").objectStore(this.storageName).put(value, key);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            console.log('added successfully');
            resolve('successful');
          } else {
            console.log('something went wrong');
            resolve('failed');
          }
        }
      }

    });
  }

  get(key) {
    return new Promise(async (resolve, reject) => {
      if (db) {
        const request = await db.transaction([this.storageName], "readonly").objectStore(this.storageName).get(key);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            console.log('retrieved successfully');
            resolve(event.target.result);
          } else {
            console.log('something went wrong');
            resolve(false);
          }
        }
      }
    });
  }

  delete(key) {
    return new Promise(async (resolve, reject) => {
      if (db) {
        const request = await db.transaction([this.storageName], "readwrite").objectStore(this.storageName).delete(key);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            console.log('deleted successfully');
            resolve('successful');
          } else {
            console.log('something went wrong');
            resolve('failed');
          }
        }
      }
    });
  }
}
