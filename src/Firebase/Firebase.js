import firebase from 'firebase/app'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: "yourApiKey",
  authDomain: "yourAuthDomain",
  databaseURL: "yourDatabseUrl",
  projectId: "yourProjectID",
  storageBucket: "yourStorageBucket",
  messagingSenderId: "yourMessagingSenderId",
  appId: "yourAppId",
  measurementId: "yourMeasurementId"
})

const storage = firebase.storage()


export  {
  storage, firebase as default
}
