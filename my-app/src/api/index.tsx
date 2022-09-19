import axios from "axios";

axios.defaults.baseURL = "https://api-for-missions-and-railways.herokuapp.com";
export const setDefaultHeader = (data: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
};
