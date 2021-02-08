import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5001/online-tutor-app-c68ab/us-central1/'
})

export default instance

// http://localhost:5001/clone-ebfe1/us-central1/api