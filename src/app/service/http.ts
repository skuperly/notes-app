import axios, { AxiosError } from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,
  headers: { Authorization: localStorage.getItem("token") },
});

export const setToken = (token: string) => {
  localStorage.setItem("token", `Token ${token}`);
  http.defaults.headers.Authorization = `Token ${token}`;
};
export const deleteToken = () => {
  localStorage.removeItem("token");
  delete http.defaults.headers.Authorization;
};

export const fetchLogin = (username: string, password: string) => {
  deleteToken();
  return http.post(`auth/login`, { username, password });
};

export const fetchRegister = (
  username: string,
  email: string,
  password: string
) => {
  deleteToken();
  return http.post(`auth/register`, { username, email, password });
};

export const fetchLogout = () => {
  return http.post(`auth/logout`);
};

export const fetchUser = () => {
  return http.get(`auth/user`);
};
export const fetchNotes = () => {
  return http.get(`notes/`);
};
export const fetchAddNote = (title: string, body: string) => {
  return http.post(`notes/`, { title, body });
};

export const fetchUpdteNote = (id: number, title: string, body: string) => {
  return http.put(`notes/${id}/`, { title, body });
};
export const fetchDeleteNote = (noteId: number) => {
  return http.delete(`notes/${noteId}/`);
};

export const getHttpErrorMsg = (error: AxiosError) => {
  if (error.response && error.response.status !== 404) {
    return `${Object.values(error.response.data)[0]}`;
  }
  return error.message;
};
