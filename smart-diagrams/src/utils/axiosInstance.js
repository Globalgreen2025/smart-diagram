// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//     withCredentials: true,

// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//         config.headers["token"] = `Bearer ${token}`;
//     }
//     return config;
// });

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token && !config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;