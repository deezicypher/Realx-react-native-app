import { getAccessToken } from '@/libs/auth-storage';
import axios from 'axios';
const instance = axios.create({
    baseURL: "http://192.168.1.182:3000",
    withCredentials: true, 
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

export default instance