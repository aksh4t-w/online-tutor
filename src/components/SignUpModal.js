import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { auth, db } from '../firebase'
import firebase from "firebase"
import Form from 'react-bootstrap/Form'
// import DatePicker from "react-bootstrap-date-picker"

function SignUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('')
  // const [DOB, setDOB] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = (e) => {
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email, password).then(cred => {

          // setting additional info to users collection (set overwrites, add pushes)
          // return db.collection('users').doc(user.cred.uid).set({data:data})
          // console.log(cred.user)
          cred.user.updateProfile({
            displayName: name,
          }).then(console.log('done')).catch(err=>console.log(err))
        
      }).catch(err=>console.log(err.message))

    // f().then(o=>{return()}).then(operation)

      setEmail('')
      setPassword('')
      handleClose()
  }

  const googleSignup = async() => {
    var provider = new firebase.auth.GoogleAuthProvider();

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
      handleClose()

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Register Now!
      </Button>

      <Modal show={show} onHide={handleClose}>
        
        
        <Modal.Header closeButton>
          <Modal.Title>Sign Up now!</Modal.Title>
        </Modal.Header>


        <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <Form>
                <Form.Group controlId="formGrouptText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} required/>
                </Form.Group>
                {/* <Form.Group controlId="formGrouptText">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control type="text" placeholder="Enter DOB" value={DOB} onChange={e => setDOB(e.target.value)} required/>
                </Form.Group> */}
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} value={password} required/>
                </Form.Group>
                    <Button className="login__RegBtn" onClick={signup}>Register</Button>                    

            </Form>
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