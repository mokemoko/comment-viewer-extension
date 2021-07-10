import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { sha256 } from "../util/crypto";

const loginUrl = "https://us-central1-commentscreen-app.cloudfunctions.net/enterRoom";

const config = {
  apiKey: "AIzaSyBoXUBuV5nqeSv-_ONhdViA5VKc_80cwwQ",
  authDomain: "commentscreen-app.firebaseapp.com",
  databaseURL: "https://commentscreen-app.firebaseio.com",
  projectId: "commentscreen-app",
  storageBucket: "commentscreen-app.appspot.com",
  messagingSenderId: "586969792742",
  appId: "1:586969792742:web:5c71fd588eedd2d5083b27",
  measurementId: "G-75PSVDXN70"
};

class CommentScreen {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async login(room_id, password) {
    await this.auth.signInAnonymously();
    const user = this.auth.currentUser;
    const jwt = await user.getIdToken();
    const pass_hash = await sha256(password);

    const res = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({data: {uid: user.uid, room_id, password: pass_hash}}),
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    this.roomId = room_id;
    return await res.json();
  }

  async fetchComments() {
    const snapshot = await this.db.collection(`/rooms/${this.roomId}/comments`).get();
    const comments = [];
    snapshot.forEach(doc => comments.push(doc.data()));
    return comments;
  }
}

const instance = new CommentScreen();

export default instance;
