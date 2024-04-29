import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5001",
  headers: {
    Authorization: "Bearer your-auth-token",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return refreshToken()
        .then((newToken) => {
          // Update the authorization header with the new token
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          // Retry the original request
          return axiosInstance(error.config);
        })
        .catch(() => {
          // Redirect to login page if token refresh fails
          window.location.href = "/login";
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

function refreshToken() {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/refresh-token")
      .then((response) => {
        const newToken = response.data.token;
        resolve(newToken);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default axiosInstance;