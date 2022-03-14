import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDD_MhBpcxS3OyGO32S_fiJsn302BmnHio",
  authDomain: "dashboard-343607.firebaseapp.com",
  projectId: "dashboard-343607",
  storageBucket: "dashboard-343607.appspot.com",
  messagingSenderId: "1045404079669",
  appId: "1:1045404079669:web:c9d5bd58cd3254a4c5037c",
});

export const auth = app.auth();
export default app;

const firebaseConfig = {
  apiKey: "AIzaSyDD_MhBpcxS3OyGO32S_fiJsn302BmnHio",
  authDomain: "dashboard-343607.firebaseapp.com",
  projectId: "dashboard-343607",
  storageBucket: "dashboard-343607.appspot.com",
  messagingSenderId: "1045404079669",
  appId: "1:1045404079669:web:c9d5bd58cd3254a4c5037c",
};

const app2 = initializeApp(firebaseConfig);
export const auth2 = getAuth(app2);

const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePicture = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePicture", profilePicture);

      // alert(email);
      return (window.location.href = window.location.origin + "/");
    })
    .catch((error) => {
      alert(error.message);
    });
};
