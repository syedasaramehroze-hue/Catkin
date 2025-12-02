import { db, storage } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";


// --- SEND MESSAGE ---
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text) return;

  await addDoc(collection(db, "messages"), {
    text,
    createdAt: serverTimestamp()
  });

  input.value = "";
}

window.sendMessage = sendMessage;


// --- DISPLAY MESSAGES ---
const messagesContainer = document.getElementById("messages");

const q = query(collection(db, "messages"), orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  messagesContainer.innerHTML = "";
  snapshot.forEach((doc) => {
    const msg = document.createElement("div");
    msg.className = "message";
    msg.textContent = doc.data().text;
    messagesContainer.appendChild(msg);
  });
});


// --- FILE UPLOAD ---
async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("uploadStatus");

  if (!fileInput.files.length) {
    status.textContent = "No file selected.";
    return;
  }

  const file = fileInput.files[0];
  const fileRef = ref(storage, "uploads/" + file.name);

  status.textContent = "Uploading…";

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  // Post the file link into the chat
  await addDoc(collection(db, "messages"), {
    text: `📎 File uploaded: ${url}`,
    createdAt: serverTimestamp()
  });

  status.textContent = "Uploaded successfully!";
}

window.uploadFile = uploadFile;
