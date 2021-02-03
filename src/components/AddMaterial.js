import './AddMaterial.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { auth, db } from '../firebase'
import Form from 'react-bootstrap/Form'


const AddMaterial = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const add_data = (e) => {
      e.preventDefault()
        db.collection('files').add({
            file_type: name,
            description
        }).then(()=>{
            console.log("Successfully added")
        }).catch((err)=>console.log(err.message))

      setName('')
      setDescription('')
      handleClose()
    }

    return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Material
      </Button>

      <Modal show={show} onHide={handleClose} >
                
        <Modal.Header closeButton>
          <Modal.Title>Add study material</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group controlId="formGrouptType">
                    <Form.Label>Material Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
                
                <Button className="add_button" onClick={add_data}>Add</Button>                  
            </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Sign in with Google
          </Button> */}
        </Modal.Footer>

      </Modal>
    </>
    )
}

export default AddMaterial
