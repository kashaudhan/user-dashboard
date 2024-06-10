import axios from "axios";

export default {
  BASE_URL: import.meta.env.VITE_REACT_BASE_URL,
  INIT_API() {
    axios.defaults.baseURL = this.BASE_URL
  },

  GET_MEMBERS(page: number, limit: number = 10) {
    return axios.get(`/members?page=${page}&limit=${limit}`);
  },
  GET_MEMBER(id: number) {
    return axios.get(`/members/${id}`);
  },
  ADD_MEMBER(user: User) {
    return axios.post("/members", user);
  },
  UPDATE_MEMBER(user: User) {
    return axios.put(`/members/${user.id}`, user);

  },
  DELETE_MEMBER(id: number) {
    return axios.delete(`/members/${id}`);
  }
}