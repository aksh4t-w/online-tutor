import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAxuzyh_UNpw2S1MjOtmTZAjUPFCgxxBeg",
  authDomain: "online-tutor-app-c68ab.firebaseapp.com",
  projectId: "online-tutor-app-c68ab",
  storageBucket: "online-tutor-app-c68ab.appspot.com",
  messagingSenderId: "555158563264",
  appId: "1:555158563264:web:c8f5ea54a108e42967c025",
  measurementId: "G-2M81344J5L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const ts = firebase.firestore.FieldValue.serverTimestamp()

db.settings({timestampsInSnapshots: true})

export {db, auth, storage, ts}