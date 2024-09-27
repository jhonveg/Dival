
import axios from './axios';

// const addTokenToHeaders = () => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// };

export const registerRequest = user => {
  // addTokenToHeaders();
  return axios.post(`/register`, user);
};

export const LoginRequest = user => {
  // addTokenToHeaders();
  return axios.post(`/login`, user);
};

export const verifyTokenRequest = () => {
  // addTokenToHeaders();
  return axios.get("/verify");
};

export const ProfileRequest = () => {
  // addTokenToHeaders();
  return axios.get("/profile");
};

export const updateProfileRequest = (user) => {
  // addTokenToHeaders();
  return axios.put(`/user/email/${user.id}`, user);
};

export const updateUsernameRequest = (user) => {
  // addTokenToHeaders();
  return axios.put(`/user/username/${user.id}`, user);
};

export const getUsersRequest = (page , limit) => {
  // addTokenToHeaders();
  return axios.get(`/admin/user?page=${page}&limit=${limit}`);
};

export const logoutRequest = () => {
  // addTokenToHeaders();
  return axios.post("/logout");
};

export const getUserRequest = (id) => {
  // addTokenToHeaders();
  return axios.get(`/admin/user/${id}`);
};

export const deleteUserRequest = (id) => {
  // addTokenToHeaders();
  return axios.delete(`/admin/user/${id}`);
};

export const updateUserSchemaRequest = (id, user) => {
  // addTokenToHeaders();
  return axios.put(`/admin/user/${id}`, user);
};

export const AddUserData= (data) => {
  // addTokenToHeaders();
  return axios.post(`/user/info`, data);
};


export const updateUserPassword = (data) => {
 
  return axios.put(`/user/password`, data);
}