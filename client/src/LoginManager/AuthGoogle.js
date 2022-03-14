// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import "firebase/compat/auth";
// import { Redirect } from "react-router-dom";

// const firebaseConfig = {
//   apiKey: "AIzaSyDD_MhBpcxS3OyGO32S_fiJsn302BmnHio",
//   authDomain: "dashboard-343607.firebaseapp.com",
//   projectId: "dashboard-343607",
//   storageBucket: "dashboard-343607.appspot.com",
//   messagingSenderId: "1045404079669",
//   appId: "1:1045404079669:web:c9d5bd58cd3254a4c5037c",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const SignInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       <Redirect to="/" />;
//       alert("logged in");
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePicture = result.user.photoURL;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePicture", profilePicture);
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };
