import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCT1owUCePc44h1qOrARqIoFaUW_Bw2iwQ',
  authDomain: 'fullstack-react-f82e7.firebaseapp.com',
  projectId: 'fullstack-react-f82e7',
  storageBucket: 'fullstack-react-f82e7.appspot.com',
  messagingSenderId: '687451925539',
  appId: '1:687451925539:web:9d352aee59d4471b1c1596',
  measurementId: 'G-P1MK5YJ19G'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
