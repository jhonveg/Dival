import axios from 'axios'


const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true',
      },

    
})
instance.interceptors.request.use(config => {
    config.headers['Bypass-Tunnel-Reminder'] = 'true';
    return config;
});

export default instance