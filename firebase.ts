// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMzgzZW8G--RmnEtNC_7ymPWiG3ntoCfE',
  authDomain: 'netflix-clone-yt-c5f19.firebaseapp.com',
  projectId: 'netflix-clone-yt-c5f19',
  storageBucket: 'netflix-clone-yt-c5f19.appspot.com',
  messagingSenderId: '959824537205',
  appId: '1:959824537205:web:702dbc1c3e1bf734c9ba3c',
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
