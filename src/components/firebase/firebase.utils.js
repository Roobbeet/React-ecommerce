import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyDZktmUyJ6istoE43jya4lrsDNFRA8UwXU",
    authDomain: "ecommercedb-a20e3.firebaseapp.com",
    databaseURL: "https://ecommercedb-a20e3.firebaseio.com",
    projectId: "ecommercedb-a20e3",
    storageBucket: "ecommercedb-a20e3.appspot.com",
    messagingSenderId: "939015106158",
    appId: "1:939015106158:web:ac25604d7e874c6993c07f",
    measurementId: "G-R5BPJ50DLG"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) { //kalo belom ada, dibikin
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch(error) {
      console.log(error)
    }
  }
  return userRef;
}
//userAuth
//karena queryReference ga punya actual data, makanya dia cuma nampilin detail dari yg kita mau, terlepas mau datanya ada apa engga 
//snapshotObject dan referenceObject didapet dengan pake metode .get()

/*
documentRef returns a documentSnapshot object.
collectionRef returns a querySnapshot object.
*/



  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

  /*
  Menggunakan Firestore

  firestore = firebase.firestore();


Get the firestore data (specific item): --> disebut queryReference
  firestore.collection(name of collection).doc(document ID)
  -dst (bisa ditambah .collection kalo dalem doc ID ada collection lagi)-

  OR

  firestore.doc(item path) --> item path ini kalo kaya diatas jadi 'nameOfCollection/docID'
  -doc bisa diganti jadi collection kalo item yg dicari adalah collection-


  
  */