import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsfaYgSFUWRJhgr3CYZknX3p99vrKrbHw",
    authDomain: "fakestoreusers.firebaseapp.com",
    projectId: "fakestoreusers",
    storageBucket: "fakestoreusers.firebasestorage.app",
    messagingSenderId: "695980271971",
    appId: "1:695980271971:web:9b0272185610f51d734b56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Comprobación de datos en FireStore
async function signInFireStore(email,pass){
    const user = await getDoc(doc(db, 'users', email));
    const userData = await user.data();
    
    return userData.email === email && userData.pass === pass;
    
}

//Creación de nuevo usuario en FireStore
async function signUpFireStore(name, lastname, email, pass){
    
    const testDoc = await getDoc(doc(db, 'users', email));

    if(!testDoc._document){
        const userData = {name: name, lastname: lastname, email: email, pass: pass};
        await setDoc(doc(db, 'users', email), userData);
        alert('USUARIO CREADO CON ÉXITO');
        return true;
    }else{
        alert('EL USUARIO YA EXISTE');
        return false;
    }
}

async function deleteUser(){
    const userId = await sessionStorage.user;
    deleteDoc(await doc(db, 'users', userId));
}

export { signInFireStore, signUpFireStore, deleteUser };