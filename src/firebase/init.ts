// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'
// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB79MNdGVqjjHYZFezM1uqQZMgMdyndYNI',
  authDomain: 'pokemon-card-2112f.firebaseapp.com',
  projectId: 'pokemon-card-2112f',
  storageBucket: 'pokemon-card-2112f.appspot.com',
  messagingSenderId: '540658522847',
  appId: '1:540658522847:web:c21c54d6147aa09f0e676a',
  measurementId: 'G-B2EY75FWKY',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }
