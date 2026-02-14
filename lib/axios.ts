import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.data.message === "Token has expired" ||
        error.response.data.error === "jwt expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          "http://localhost:8080/api/user/refresh-access-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.success === true) {
          localStorage.setItem("token", response.data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
