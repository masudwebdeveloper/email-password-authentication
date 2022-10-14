import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
   const [passwordError, setPasswordError] = useState('')
   const [success, setSuccess] = useState(false);
   const handleRegister = event => {
      event.preventDefault();
      setSuccess(false)

      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value
      
      console.log(email, password, name);
      // validate password
      if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
         setPasswordError('Please provide at least two Uppercase')
         return;
      }
      if (password.length < 6) {
         setPasswordError('Please should be at least 6 character')
         return;
      }
      if (!/(?=.*[!@#$&*])/.test(password)) {
         setPasswordError('please add one special character')
         return;
      }
      setPasswordError('')

      createUserWithEmailAndPassword(auth, email, password)
         .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
            event.target.reset();
            verifyEmail();
            updaterUserName(name);
         })
         .catch(error => {
            setPasswordError(error.message)
         })
   }

   const verifyEmail = () => {
      sendEmailVerification(auth.currentUser)
         .then(() => {
            alert('please check your email and verified your email');
         })
   }

   const updaterUserName = (name) => {
      updateProfile(auth.currentUser, {
         displayName: name
      })
         .then(() => {
            console.log('updated your name');
         })
         .catch(error => console.error('error ', error))
   }
   return (
      <div className='w-50 mx-auto'>
         <h1 className='text-primary'>Please Register!!!</h1>
         <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Label>Your Name</Form.Label>
               <Form.Control name="name" type="text" placeholder="Enter name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control name="email" type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
               <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <p className='text-danger'>{passwordError}</p>
            {success && <p className='text-success'>Your account is Successful!</p>}
            <Button variant="primary" type="submit">
               Register
            </Button>
         </Form>
         <p>You have already account : to  <Link to="/login">Log In</Link></p>
      </div>
   );
};

export default RegisterReactBootstrap;