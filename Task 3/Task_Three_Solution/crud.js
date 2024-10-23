import { openDatabase, storeName } from './indexedDB';
import { encryptData, decryptData } from './encryption';

const addUser = async (user, password) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const encryptedUser = await encryptData(JSON.stringify(user), password);
    store.add({ id: user.id, data: encryptedUser });

    return transaction.complete;
};

const getUser = async (id, password) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    const request = store.get(id);
    return new Promise((resolve, reject) => {
        request.onsuccess = async (event) => {
            if (event.target.result) {
                const encryptedUser = event.target.result.data;
                const decryptedUser = await decryptData(encryptedUser, password);
                resolve(JSON.parse(decryptedUser));
            } else {
                resolve(null);
            }
        };

        request.onerror = (event) => {
            reject("Error retrieving user: " + event.target.error);
        };
    });
};

const updateUser = async (id, newUserData, password) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const encryptedUser = await encryptData(JSON.stringify(newUserData), password);
    store.put({ id: id, data: encryptedUser });

    return transaction.complete;
};

const deleteUser = async (id) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.delete(id);

    return transaction.complete;
};

export { addUser, getUser, updateUser, deleteUser };
