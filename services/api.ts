import { getAccessToken } from '@/libs/auth-storage';
import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
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