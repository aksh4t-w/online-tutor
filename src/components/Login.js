import React, { useEffect, useState } from 'react'
import './Login.css'
import {Link, useHistory} from "react-router-dom"
import SignUp from './SignUpModal'
import Button from 'react-bootstrap/Button';
import { auth, db } from '../firebase';

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                console.log("User logged in: ", user)
                db.collection('files').get().then((snapshot) => {
                    console.log(snapshot.docs) 
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
        auth.signOut().then(() => console.log('You are logged out!'))
        
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://media.oakley.com/2021/00_homepage/hero/210121-OCP/Desktop.jpg" alt="OT" />
            </Link>

            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <label>E-mail</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br/>
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                    
                    <button className="login__signInBtn" onClick={login}>Sign In</button>                    
                </form>
            </div>
            <SignUp />
            <Button onClick={logout}>Log out</Button>

        </div>
    )
}

export default Login
