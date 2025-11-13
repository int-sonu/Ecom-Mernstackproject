import axios from 'axios'

const api=axios.create({
    baseURL:'http://51.20.72.156/api',
    withCredentials:true
})



export default api;
