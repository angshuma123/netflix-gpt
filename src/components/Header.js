import React,{useEffect} from 'react';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../utils/firebase";
import { useSelector,useDispatch } from 'react-redux';
import { removeUser,addUser } from '../utils/userSlice';
import {  onAuthStateChanged } from "firebase/auth";
import {COVER_IMG} from"../utils/constants";


const Header = () => {
  const user=useSelector(store=>store.user);
 
  const handleClick=()=>{
    signOut(auth).then(() => {
     
    }).catch((error) => {
      navigate("/error");
    });

  }
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
   const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid,email,displayName,photoURL} = user;
        dispatch(
          addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL})
            );
       navigate("/browse");
       
      } else {
        dispatch(removeUser());
        navigate("/");
       
       
      }
    });
    return ()=>unsubscribe();
  },[])
  return (
    
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src= { COVER_IMG } alt='logo'/>
      {user&&(<div>
      <button className='bg-red-700 font-bold text-white text-start px-9  w-32 h-10 rounded-lg mt-4' onClick={handleClick}>SignOut</button>
    </div>)}
    </div>
    
    
  )
}

export default Header;
