import "./AddMaterial.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { auth, db, storage, ts } from "../firebase";
import Form from "react-bootstrap/Form";

const AddMaterial = ({ uid, push_data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const add_data = async (e) => {
    e.preventDefault();

    const file_name = file ? file.name : null;

    if (file_name) {
      const metadata = {
        contentType: file.type,
      };

      // Upgrading the firebase plan will change the file URLs
      const uploadTask = storage
        .ref("users/" + uid)
        .child(file_name)
        .put(file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => alert("Upload failed. Please try again."),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            file.url = url;
            setFile(file);
            const material = {
              uid,
              title: name,
              description,
              timeStamp: ts,
              url: file.url,
              file_name,
            };
            db.collection("files")
              .add(material)
              .then((docRef) => {
                alert("Document successfully uploaded");
                console.log("Document successfully uploaded");
                // handleClose()
                setName("");
                setDescription("");
                setFile(null);
                setProgress(null);
                push_data([material, { doc_id: docRef.id }]);
              })
              .catch((err) => console.log(err.message));
          });
        }
      );
    } else {
      const material = {
        uid,
        title: name,
        description,
        timeStamp: ts,
        file_name,
      };
      db.collection("files")
        .add(material)
        .then((docRef) => {
          console.log("File successfully added");
          // handleClose()
          setName("");
          setDescription("");
          setFile(null);
          setShow(false);
          push_data([material, { doc_id: docRef.id }]);
        })
        .catch((err) => console.log(err.message));
    }

    // .then(snapshot => {
    //   const url = snapshot.ref.getDownloadURL()
    //   return url
    // }
    // ).then(url => {
    //   alert("File uploaded successfully!")
    //   console.log(url)})

    // console.log(file)
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Material
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add study material</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formGrouptType">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupFile">
              <Form.Label>Upload file (Optional)</Form.Label>
              <Form.Control
                type="file"
                placeholder="Choose file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button
              type="submit"
              className="add_button"
              onSubmit={add_data}
              onClick={add_data}
            >
              Add
            </Button>
          </Form>
          {progress ? <h3>Uploading: {progress}%</h3> : ""}
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
  );
};

export default AddMaterial;
