import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  // sendEmailVerification,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firebase.init";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleUserdbInfo, setSingleUserdbInfo] = useState(null);
  const [allIssues, setAllIssues] = useState([]);

  // register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // const emailverification = () => {
  //   return sendEmailVerification(auth);
  // };

  // user photo and username post
  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google singin
  const googlesignIn = () => {
    return signInWithPopup(auth, provider);
  };

  //signout
  const logout = () => {
    return signOut(auth);
  };

  //all issues get databaseble reusable method
  const allIssuesGetDbMethod = async () => {
    fetch("http://localhost:3000/allIssues")
      .then((res) => res.json())
      .then((data) => setAllIssues(data))
      .catch((error) => console.log(error.message));
  };

  // newUser data create database post
  const registerUserpostDb = async (newUser) => {
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!res.ok) {
      throw new Error("Failed to save user to database");
    }
    return res.json();
  };

  // authstatechange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      // allIssuesGetDb
      allIssuesGetDbMethod();

      //  jodi current user er modhe email thake tahole singel data user data get korbe na hole null set korbe
      if (currentUser?.email) {
        setTimeout(() => {
          if (currentUser?.email) {
            fetch(`http://localhost:3000/user?email=${currentUser.email}`)
              .then((res) => res.json())
              .then((data) => {
                setSingleUserdbInfo(data);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error.message);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        }, 1000);
      } else {
        // console.log("No user email available, skipping database fetch.");
        setLoading(false);
      }
      //
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    register,
    login,
    updateUser,
    googlesignIn,
    userInfo,
    setUserInfo,
    loading,
    logout,
    singleUserdbInfo,
    registerUserpostDb,
    allIssues,
    allIssuesGetDbMethod,
    setAllIssues,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
