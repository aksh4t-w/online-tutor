import React, { useEffect, useState } from 'react'
import './Login.css'
import {Link, useHistory} from "react-router-dom"
import SignUp from './SignUpModal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { auth, db } from '../firebase';

const Login = () => {
    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                console.log("User logged in: ", user)
                setUser(user)
                db.collection('files').get().then((snapshot) => {
                    setData(snapshot.docs.map((doc) => doc.data()))
                    console.log(data)
                })
            }
            else console.log("User logged out.")
        })
    }, [])
     
    const login = (e) => {
        e.preventDefault() 
        console.log(123)
        auth.signInWithEmailAndPassword(email, password).then((cred)=>{

        }).catch(err=>console.log(err))
    }

    const logout = () => {
        setUser(null)
        auth.signOut().then(() => console.log('You are logged out!'))
        
    }

    return (
        <div className="login">
            {user ? 
                <h3>Welcome {user.displayName}</h3>
                :
                <h3>Welcome to Guide to IIT</h3>
            }

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
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                    <Button className="login__signInBtn" onClick={login}>Sign In</Button>                    

                </Form>

                <SignUp />
                
            </div>:""}

            {(user) ? <div className="preview">
                <h1>Study material</h1>
                { data?.map(item => (
                    <div>
                        <h3>{item.file_type}</h3>
                        <p>{item.description}</p>
                    </div>))
                }
            </div>
            :
            ""
            }

            {user ? 
                    <Button onClick={logout}>Log out</Button>
                    :
                    ''
                }
        </div>
    )
}

export default Login
