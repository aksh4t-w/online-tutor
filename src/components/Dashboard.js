import { useEffect, useState, useMemo } from "react";
import { useContextProvider } from "../contexts/ContextProvider";
import { auth, db, storage } from "../firebase";
import "./Dashboard.css";
import Button from "react-bootstrap/Button";
import AddMaterial from "./AddMaterial";
import AdminModal from "./AdminModal";
import Card from "react-bootstrap/Card";

const Dashboard = () => {
  const [{ user }, dispatch] = useContextProvider();

  const [data, setData] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [admin, setAdmin] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [fetchData, setFetchData] = useState(true);

  const refresh = () => setUpdated(updated + 1);
  // console.log(user)
  const logout = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });
    auth.signOut().then(() => console.log("You are logged out!"));
  };

  const deleteDoc = async (e, item) => {
    e.preventDefault();

    if (item[0].file_name) {
      const deleteTask = storage
        .ref("users/" + user.uid)
        .child(item[0].file_name);

      deleteTask
        .delete()
        .then(() => {
          console.log("File deleted Successfully");
        })
        .catch((err) => console.log(err));
    }

    db.collection("files")
      .doc(item[1].doc_id)
      .delete()
      .then(() => {
        setData(
          data.filter((doc) => {
            return doc[1].doc_id !== item[1].doc_id;
          })
        );
        console.log("Document successfully deleted!", data);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  // console.log(data);
  const retrieveMore = async () => {
    try {
      // Set State: Refreshing
      // this.setState({
      //   refreshing: true,
      // });
      console.log("Retrieving additional Data");
      // Cloud Firestore: Query (Additional Query)
      db.collection("files")
        .orderBy("timeStamp", "desc")
        .startAfter(lastVisible)
        .limit(3)
        .onSnapshot((snapshot) => {
          const newData = snapshot.docs.map((doc) => {
            setLastVisible(doc);
            return [doc.data(), { doc_id: doc.ref.id }];
          });
          setData([...data, ...newData]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Try useMemo with data
  // const newData = useMemo(() => {
  // }, [data])
  // console.log(lastVisible);

  const push_data = (material) => {
    data.unshift(material);
    setData(data);
  };

  useEffect(() => {
    user.getIdTokenResult().then((idTokenResult) => {
      setAdmin(idTokenResult.claims.admin);
    });

    console.log("bruh");

    if (fetchData) {
      db.collection("files")
        .orderBy("timeStamp", "desc")
        .limit(3)
        .get()
        .then((snapshot) => {
          if (fetchData) {
            console.log(data, "sussin");
            setData(
              snapshot.docs.map((doc) => {
                return [doc.data(), { doc_id: doc.ref.id }];
              })
            );
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setFetchData(false);
          }
        })
        .catch((err) => console.log(err.message));
    }

    setCnt(cnt + 1);
    // unsubscribe();
  }, [updated, data]);

  console.log(data);
  return (
    <div className="dashboard">
      <h1>Render times: {cnt}</h1>
      <h3>Welcome {user?.displayName?.split(" ")[0]}</h3>
      {admin ? (
        <div className="adminPanel">
          <h4>You are an admin</h4>
          <div className="adminButtons">
            <AdminModal />
            <AddMaterial
              uid={user.uid}
              push_data={(material) => push_data(material)}
            />
            <Button onClick={refresh}>Load updated data</Button>
          </div>
        </div>
      ) : (
        ""
      )}

      {user ? (
        <div className="preview">
          <h1>Study material</h1>
          {data?.map((item) => (
            <Card
              style={{ width: "90%", margin: "20px auto" }}
              className="container"
            >
              <Card.Body>
                <Card.Title>{item[0].title || item[0].file_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item[0].description}
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card.
                </Card.Text>
                {item[0].file_name ? (
                  <Card.Link href={item[0].url}>{item[0].file_name}</Card.Link>
                ) : null}
                <Card.Link href="#">Another Link</Card.Link>
                <br />
                {admin ? (
                  <Button variant="primary" onClick={(e) => deleteDoc(e, item)}>
                    Delete Material
                  </Button>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        ""
      )}
      <Button onClick={retrieveMore}>Load More</Button>

      <Button onClick={logout}>Log out</Button>
    </div>
  );
};

export default Dashboard;
