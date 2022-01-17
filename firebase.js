import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA75-vVM6QKU3MknvUUZGtVhiiWgiyVMVE',
  authDomain: 'instagram-clone-bc4e6.firebaseapp.com',
  projectId: 'instagram-clone-bc4e6',
  storageBucket: 'instagram-clone-bc4e6.appspot.com',
  messagingSenderId: '654498518620',
  appId: '1:654498518620:web:6d9c878e48fa06cda1f899',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
