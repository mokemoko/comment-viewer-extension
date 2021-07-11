import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {sha256} from "../util/crypto";

const endpointUrl = "https://us-central1-commentscreen-app.cloudfunctions.net";

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
    this.roomId = "";
  }

  async post(path, body) {
    const jwt = await this.auth.currentUser.getIdToken();
    const res = await fetch(`${endpointUrl}/${path}`, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  }

  async getRoomInfo(room_name) {
    const body = {
      data: {
        hashtag: room_name
      }
    };
    return await this.post('getRoomInfo', JSON.stringify(body));
  }

  async login(room_name, password) {
    await this.auth.signInAnonymously();
    const info = await this.getRoomInfo(room_name);
    const room_id = info.result.room_id;

    const body = {
      data: {
        uid: this.auth.currentUser.uid,
        room_id,
      }
    };
    if (password !== "") {
      body.data.password = await sha256(password);
    }
    const res = await this.post('enterRoom', JSON.stringify(body));

    this.roomId = room_id;

    return res;
  }

  async fetchComments() {
    const snapshot = await this.db.collection(`/rooms/${this.roomId}/comments`).get();
    const comments = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      comments.push({
        ...data,
        id: doc.id,
      })
    });
    return comments.sort((a, b) => a.created_at - b.created_at);
  }
}

const instance = new CommentScreen();

export default instance;
