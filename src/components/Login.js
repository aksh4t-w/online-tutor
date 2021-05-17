import React, { lazy, useEffect, useState } from "react";
import { Suspense } from "react";
import { BounceLoader } from "react-spinners";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import SignUp from "./SignUpModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { auth } from "../firebase";
import { useContextProvider } from "../contexts/ContextProvider";
// import Dashboard from './Dashboard';
import { googleSignup } from "./googleSignup";

const Dashboard = lazy(() => import("./Dashboard"));

const Login = () => {
  const history = useHistory();

  const [{ user }, dispatch] = useContextProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in: ", user);
        dispatch({
          type: "SET_USER",
          user,
        });
      } else console.log("Login to continue.");
    });
  }, []);

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        // cred.user
      })
      .catch((err) => setError(err));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://www.uwindsor.ca/international-student-centre/sites/uwindsor.ca.international-student-centre/files/styles/page_hero/public/blackboard.jpg?itok=dAtm8ORY"
          alt="OT"
        />
      </Link>

      {!user ? (
        <div className="login__container">
          <h1>Login</h1>

          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            {error ? <p>{error.message}</p> : ""}
            <Button className="login__signInBtn" onClick={login}>
              Sign In
            </Button>
          </Form>
          <Button variant="primary" onClick={googleSignup}>
            Sign in with Google
          </Button>
          <SignUp />
        </div>
      ) : (
        <Suspense color="white" size={48} fallback={<BounceLoader loader />}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  );
};

export default Login;
