import { createStore, combineReducers, compose } from "redux"
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers
import notifyReducer from "./reducers/notifyReducer"
import settingsReducer from "./reducers/settingsReducer"

const firebaseConfig = {
    apiKey: "AIzaSyBsdzpJwWBU4iIoCbTyRdN4lLhE_kfyLM4",
    authDomain: "reactclientpanel-26216.firebaseapp.com",
    databaseURL: "https://reactclientpanel-26216.firebaseio.com",
    projectId: "reactclientpanel-26216",
    storageBucket: "reactclientpanel-26216.appspot.com",
    messagingSenderId: "93291201573"
};

// react-=redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }


  // Init firebase instance
  firebase.initializeApp(firebaseConfig);

  // Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);

  //Add reactReduxFirebase emhancer when making store creator
  const createStoreWithFirebase = compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
  )(createStore);

  const rootReducer = combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      notify: notifyReducer,
      settings: settingsReducer
  });

// Check for settings in localStorage
if(localStorage.getItem("settings")==null){
    // Default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }

    // Set to Local Storage
    localStorage.setItem("settings",JSON.stringify(defaultSettings));
}

  // Create Initial state
  const initialState = {settings: JSON.parse(localStorage.getItem("settings"))};


  // Create Store
  const store = createStoreWithFirebase(
      rootReducer,
      initialState,
      compose(
      reactReduxFirebase(firebase),
      window._REDUX_DEVTOOLS_EXTENSION_ ? window._REDUX_DEVTOOLS_EXTENSION_() : f => f
  ));

  export  default store;
  




