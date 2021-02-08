import { useEffect, useState, useMemo } from 'react'
import { useContextProvider } from '../contexts/ContextProvider'
import { auth,db } from '../firebase'
import './Dashboard.css'
import Button from 'react-bootstrap/Button';
import AddMaterial from './AddMaterial';
import AdminModal from './AdminModal';

const Dashboard = () => {
    const [{user}, dispatch] = useContextProvider()

    const [data, setData] = useState([])
    const [cnt, setCnt] = useState(0)
    const [updated, setUpdated] = useState(0)
    const [admin, setAdmin] = useState(null)

    const refresh = () => setUpdated(updated+1)
    // console.log(user)
    const logout = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
        auth.signOut().then(() => console.log('You are logged out!'))
    }
    // const newData = useMemo(() => {

    // }, [data])
    
    useEffect(() => {
        if(user){
            user.getIdTokenResult().then(idTokenResult => {
                setAdmin(idTokenResult.claims.admin)
            })
            db.collection('files').get()
                .then((snapshot) => {
                    setData(snapshot.docs.map((doc) => doc.data()))
                })
                .catch(err => console.log(err.message))
            }
        setCnt(cnt+1)
        // Try useMemo with data
    }, [updated])

    return (
        <div className="dashboard">
            <h1>Render times: {cnt}</h1>
            <h3>Welcome {user?.displayName?.split(' ')[0]}</h3>
            {admin ? (
            <div>
                <h4>You are an admin</h4>
                <AdminModal/>
                <AddMaterial />
                <Button onClick={refresh}>Load updated data</Button>
            </div>
            ):''}

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
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}

export default Dashboard
