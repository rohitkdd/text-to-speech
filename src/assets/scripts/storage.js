window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = windo.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.error('Browser does not support IndexedDB');
}

let db;
let request = window.indexedDB.open('myttsdb', 1);

request.onerror = function(event) {

}

request.onsuccess = function(event) {
    db = request.result 

    console.log("success" +db);
}

request.onupgradeneeded = function(event) {

    let db;
    let objectStore = db.createObjectStore("TTS");
    
}
