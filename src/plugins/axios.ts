import { signOut } from '@/services/auth';
import axios from 'axios';

export let customeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_LINK,
  withCredentials: false
});

customeAxios.interceptors.request.use(
  (config) => {
    let accessCookie = '';
    let cookiesArray = document.cookie.split('; ');

    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i];
      const [name, value] = cookie.split('=');
      if (name === 'accessToken') {
        accessCookie = value;
        break;
      }
    }

    if (accessCookie) {
      config.headers.Authorization = `Bearer ${accessCookie}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customeAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);
