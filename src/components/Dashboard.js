import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../contexts/ContextProvider'
import { auth,db } from '../firebase'
import './Dashboard.css'
import Button from 'react-bootstrap/Button';
import AddMaterial from './AddMaterial';

const Dashboard = () => {
    const [{user}, dispatch] = useContextProvider()

    const [data, setData] = useState([])


    // console.log(user)
    const logout = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
        auth.signOut().then(() => console.log('You are logged out!'))
    }
    
    useEffect(() => {
        db.collection('files').get()
            .then((snapshot) => {
                setData(snapshot.docs.map((doc) => doc.data()))
            })
            .catch(err => console.log(err.message))
    }, [data])

    return (
        <div>
            <h3>Welcome {user?.displayName.split(' ')[0]}</h3>
                

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
            
            <AddMaterial />
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}

export default Dashboard
