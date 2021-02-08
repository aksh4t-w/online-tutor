import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { auth, db } from '../firebase'
import Form from 'react-bootstrap/Form'
import axios from '../axios'

const AdminModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [email, setEmail] = useState('')
    const addAdmin = async() => {
        const url = 'api/addAdminRole'
        
        const response = await axios(
            {
                method:'POST',
                url:`${url}`,
                data: {email}
            })
        console.log(response.data)
        // fetch(url, {method:'POST'})
        //     .then(res => res.json())
        //     .then(json => console.log(json))
        //     .catch(function (error) {
        //         console.log('Request failed', error);
        //     });


        // const addAdminRole = functions.httpsCallable('addAdminRole')
        // const addAdminRole = fetch('http://localhost:5001/online-tutor-app-c68ab/us-central1/addAdminRole')
        // addAdminRole({email}).then(result => console.log(result))
    }
    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Add Admin
      </Button>

      <Modal show={show} onHide={handleClose} >
                
        <Modal.Header closeButton>
          <Modal.Title>Make Admin</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group controlId="formGrouptType">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="make_admin" variant="primary" onClick={addAdmin}>
                        Add
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>


      </Modal>
    </>
    )
}

export default AdminModal
