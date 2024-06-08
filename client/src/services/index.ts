import axios from "axios";

export default {
  BASE_URL: import.meta.env.VITE_REACT_BASE_URL,
  INIT_API() {
    axios.defaults.baseURL = this.BASE_URL
  },

  GET_MEMBERS() {
    return axios.get("/members");
  },
  GET_MEMBER(id: number) {
    return axios.get(`/members/${id}`);
  },
  ADD_MEMBER(user: User) {
    return axios.post("/members", user);
  },
  UPDATE_MEMBER(user: User) {
    return axios.put("/members", user);

  },
  DELETE_MEMBER(id: number) {
    return axios.delete(`/members/${id}`);
  }
}