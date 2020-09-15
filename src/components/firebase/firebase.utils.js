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
//this function is to configure the firebase database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`); //uid dari user
  //menggunakan firestore buat cari di doc
  const snapShot = await userRef.get(); //get the snapshot of the user

  if(!snapShot.exists) { //kalo belom ada, dibikin
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try { //set the userRef that we just get to the firebase
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


export const addCOllectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  //collectionKey--> nama collection yg kita mau masukin (di firestore)
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => { //objectsToAdd adalah selectCollectionsForPreview dari selector --> lihat app.js
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj); //set batch with newDocRef as the key, and obj as name
    
  });
return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collection) => {
  const transformedCollection = collection.docs.map(doc => {
    const {title, items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

   //async function that must be awaited


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  googleProvider.setCustomParameters({ prompt: 'select_account' });

  export const signInGoogle = () => auth.signInWithPopup(googleProvider);

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