import React, { useState, useContext } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
    name: '', 
    email: '',
    photo: '',
    newUser: false,
    password: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
        handleResponse(res, true)

    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res,false)
    })
  }

  const handleResponse  = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect) {
      history.replace(from) 
    }
  }

  const fbSignIn = () => {
    handleFbSignIn()
    handleSignOut()
    .then(res => {
      handleResponse (res, true)
    })
    
  }
    
    const handleBlur = (e) => {
      
      let isFieldValid =  true;
      if(e.target.name === 'email') {
           isFieldValid  = /\S+@\S+\.\S+/.test(e.target.value)
      }
      if(e.target.name === 'password') {
        const isPasswordValid  =  e.target.value.length  > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = (isPasswordValid && passwordHasNumber);

      }
      if(isFieldValid) {
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
      }

    }
    const handleSubmit = (e) => {
      // console.log(user.email , user.password)
      if(user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse (res, true)
        })
      }

      if(!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              handleResponse (res, true)
            })
      }
      e.preventDefault();
    }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ?<button onClick={signOut}>Sign out</button>  :
        <button onClick={googleSignIn}>Sign in</button>}
        <br/>
        <button onClick ={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
               <h3>Welcome, {user.name}</h3>
               <p>Your email: {user.email}</p>
               <img src={user.photo} alt=""/>
        </div> 
      }
      <form onSubmit={handleSubmit}>
        <h1> Our own Authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id=""/>
        <label htmlFor="">New user for sign up</label>
        <br/>
        {newUser &&  <input name="name" onBlur={handleBlur}  placeholder="Your name"type="text"/>}
        <br/>
        <input type="text" name="email" onBlur ={handleBlur} placeholder="Your Email Address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value="Sign in"/>
        </form>  
        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User {newUser ? "created": "logged"} successfully</p>
        }
    </div>
  );
}

export default Login;
