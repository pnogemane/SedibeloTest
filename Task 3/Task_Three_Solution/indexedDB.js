const dbName = "UserDatabase";
const storeName = "users";

let db;

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore(storeName, { keyPath: "id" }); // UUID as key path
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject("Error opening database: " + event.target.error);
        };
    });
};

export { openDatabase, storeName };
