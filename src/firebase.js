
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXBH5vOelh_PRliLRGczuLlZkZP2Cazec",
  authDomain: "netflix-1bdf9.firebaseapp.com",
  projectId: "netflix-1bdf9",
  storageBucket: "netflix-1bdf9.firebasestorage.app",
  messagingSenderId: "787308536424",
  appId: "1:787308536424:web:ea6ea234b6d1c9865711dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app)
const db =getFirestore(app)

const signup=async (name,email,password)=>{
    try{
     const res= await createUserWithEmailAndPassword(auth,email,password)
     const user= res.user;
     await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
         })
    }
    catch(error){
        console.log(error);
        alert(error)
        
    }
}

const login=async (email,password)=>{
    try {
        signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        alert(error)
        
    }
}

const logout=()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}