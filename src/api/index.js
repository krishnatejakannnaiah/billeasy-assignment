import axios from 'axios';

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/", // Replace with your API URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {    
    return Promise.reject(error);
  }
);

export default instance;
