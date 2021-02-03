import React, { useEffect, useState } from 'react'
import './Login.css'
import {Link, useHistory} from "react-router-dom"
import SignUp from './SignUpModal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { auth, db } from '../firebase';
import { useContextProvider } from '../contexts/ContextProvider';
import Dashboard from './Dashboard';

const Login = () => {
    const history = useHistory()

    const [{user}, dispatch] = useContextProvider()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                console.log("User logged in: ", user)
                dispatch({
                    type: 'SET_USER',
                    user
                })
            }
            else console.log("Login to continue.")
        })
    }, [])
     
    const login = (e) => {
        e.preventDefault() 
        auth.signInWithEmailAndPassword(email, password).then((cred)=>{

        }).catch(err=>console.log(err))
    }

    

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://media.oakley.com/2021/00_homepage/hero/210121-OCP/Desktop.jpg" alt="OT" />
            </Link>

            {!user?<div className="login__container">
                <h1>Login</h1>

                <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                <Button className="login__signInBtn" onClick={login}>Sign In</Button>                    

                </Form>

                <SignUp />
                
            </div>: <Dashboard/>}
        </div>
    )
}

export default Login
