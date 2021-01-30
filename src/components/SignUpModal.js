import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import { auth } from '../firebase';
import firebase from "firebase"


function SignUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const signup = (e) => {
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred)
      })
      setEmail('')
      setPassword('')
      handleClose()
  }

  const googleSignup = async() => {
    var provider = new firebase.auth.GoogleAuthProvider();

    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

    await auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        
        
        <Modal.Header closeButton>
          <Modal.Title>Sign Up now!</Modal.Title>
        </Modal.Header>


        <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <form>
                <label>E-mail</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                
                <button className="login__RegBtn" onClick={signup}>Sign Up</button>
                
            </form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={googleSignup}>
            Sign in with Google
          </Button>
        </Modal.Footer>


      </Modal>
    </>
  );
}

export default SignUp