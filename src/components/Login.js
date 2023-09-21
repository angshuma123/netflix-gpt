import React,{useState,useRef} from 'react';
import Header from './Header';
import { checkValidateData } from '../utils/Validate';
import Browse from './Browse';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatch=useDispatch();
  
const [isSignInForm,setIsSignInForm]=useState(true);
const[msg,setMsg]=useState(null);
const email=useRef(null);
const password=useRef(null);
const name=useRef(null);
//const name=useRef(null);
const handleButtonClick=()=>{
 const message= checkValidateData(email.current.value,password.current.value);
 setMsg(message);
 if(message) return;
 if (!isSignInForm) {
  // signup logic
  createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name.current.value,
        photoURL:
          "https://avatars.githubusercontent.com/u/115413934?s=400&u=2c3d5c4263a181a34c7e898e014ba819ae8e71d2&v=4",
      })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser; 
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
         
        })
        .catch((error) => {
          setMsg(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setMsg(errorCode + "-" + errorMessage);
    });
}
else{
//signin logic
signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setMsg(errorCode + "-" +  errorMessage);
  });
 }
}
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
    
  return (
    <>
    <Header/>
    <div className='absolute'>
     <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg"alt='Cover'/>
    </div>
    <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In":"Sign Up"}</h1>
      {!isSignInForm&&(<input ref={name}  type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>)}
      <input ref={email} type='text' placeholder='Email address' className='p-4 my-4 w-full bg-gray-700'/>
      <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
      <p className='text-red-500 text-lg font-bold py-4'>{msg}</p>
      <button className='p-4 my-6 bg-red-700 w-full rounded-lg'  onClick={handleButtonClick}>{isSignInForm ? "Sign In":"Sign Up"}</button>
    <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up Now":"Already Registered User ? Sign In "}</p>
    </form>
    </>
  )
}

export default Login;
