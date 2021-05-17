import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { auth, db } from '../firebase'
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
        
      }).catch(err=>alert(err.message))

    // f().then(o=>{return()}).then(operation)

      setEmail('')
      setPassword('')
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
            {/* Woohoo, you're reading this text in a modal! */}
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
            </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button className="login__RegBtn" onClick={signup}>Register</Button>                    
        </Modal.Footer>


      </Modal>
    </>
  );
}

export default SignUp