import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterBootstrap = () => {
   const [success, setSuccess] = useState(false);
   const [userEmail, setUserEmail] = useState('');
   const handleSignIn = event => {
      event.preventDefault();
      setSuccess(false);
      const email = event.target.email.value;
      const password = event.target.password.value
      signInWithEmailAndPassword(auth, email, password)
         .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true)
            event.target.reset();

         })
         .catch(error => {
         console.error('error ', error);
      })
      console.log(email, password);
   }
   const handleGetEmail = (event) => {
      const email = event.target.value;
      setUserEmail(email);
      console.log(email);
   }
   const handleResetPassword = () => {
      if (!userEmail) {
         alert('please provied your email address...');
         return;
      }
      sendPasswordResetEmail(auth, userEmail)
         .then(() => {
            alert('Your password reset, Please check your email');
      })
   }
   return (
      <div className='w-50 mx-auto'>
         <h1 className='text-success'>Please Log in!!!</h1>
         <form onSubmit={handleSignIn}>
            <div className="mb-3">
               <label className="form-label">Email address</label>
               <input onBlur={handleGetEmail} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
               <label className="form-label">Password</label>
               <input type="password" name="password" className="form-control" id="exampleInputPassword1" required/>
            </div>
            <div className="mb-3 form-check">
               <input type="checkbox" className="form-check-input" id="exampleCheck1" />
               <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">LogIn</button>
         </form>
         {success && <p className='text-success'>Successfully your account is done</p>}
            <p> New to this website create : to <Link to="/register">Register</Link></p>
            <p><small>Forget Your password: <Button onClick={handleResetPassword} variant="link">Reset Password</Button></small></p>
      </div>
   );
};

export default RegisterBootstrap;