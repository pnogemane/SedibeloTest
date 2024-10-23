const encodeText = (text) => new TextEncoder().encode(text);

const encryptData = async (data, password) => {
    const encoded = encodeText(data);
    const key = await window.crypto.subtle.importKey(
        "raw",
        encodeText(password),
        "AES-GCM",
        false,
        ["encrypt", "decrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoded
    );

    return { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
};

const decryptData = async (encryptedData, password) => {
    const key = await window.crypto.subtle.importKey(
        "raw",
        encodeText(password),
        "AES-GCM",
        false,
        ["decrypt"]
    );

    const iv = new Uint8Array(encryptedData.iv);
    const data = new Uint8Array(encryptedData.data);

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
    );

    return new TextDecoder().decode(decrypted);
};

export { encryptData, decryptData };
