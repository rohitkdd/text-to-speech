window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.error('Browser does not support IndexedDB');
}

let db;
let request = window.indexedDB.open('myttsdb', 1);

request.onerror = (event) => {

}

request.onsuccess = (event) => {
    db = request.result 
}

request.onupgradeneeded = (event) => {
    let db = event.target.result;
    let objectStore = db.createObjectStore("TTS");
}
