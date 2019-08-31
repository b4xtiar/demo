import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD2dKame7cRho5jFjdHKcR_xieoK5jZBvY",
  authDomain: "kakrozh-262a4.firebaseapp.com",
  databaseURL: "https://kakrozh-262a4.firebaseio.com",
  projectId: "kakrozh-262a4",
  storageBucket: "kakrozh-262a4.appspot.com",
  messagingSenderId: "185036500344",
  appId: "1:185036500344:web:f030f1d6cc092ce9"
};
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)
   firebaseApp.firestore().enablePersistence({synchronizeTabs:true})
  export default firebaseApp