import axios from 'axios'

const api=axios.create({
    baseURL:'http://13.51.234.189/api',
    withCredentials:true
})



export default api;
