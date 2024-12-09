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
    email = email.toLowerCase();
    const user = await getDoc(doc(db, 'users', email));
    const userData = await user.data();

    if(userData){
        if(userData.email === email && userData.pass === pass){
            return [true, 'Accediendo...'];
        }else{
            return [false, 'Contraseña incorrecta'];
        }
    }else{
        return [false, 'El usuario no existe'];
    }
    
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

//Eliminar un usuario
async function deleteUser(){
    const userId = await sessionStorage.user;
    deleteDoc(await doc(db, 'users', userId));
}

//Recuperar datos del usuario
async function getUserData() {
    const userId = await sessionStorage.user;
    const userData = await getDoc(doc(db, 'users', userId));
    return await userData.data();
}

async function getUserName(userId){
    const userCall = await getDoc(doc(db, 'users', userId));
    const userData = await userCall.data();
    console.log(userData);
    return await userData;
}

export { signInFireStore, signUpFireStore, deleteUser, getUserData, getUserName };