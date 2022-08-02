import axios from "axios";

const instance = axios.create({
  baseURL: "https://techtrain-railway-api.herokuapp.com",
  // timeout: 2000,
  // headers: { "Access-Control-Allow-Origin": "*" },
});

export const signupUser = (data) => {
  console.log(data);
  return instance
    .get(`/threads?offset=${offset}`)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(e.ErrorMessageJP);
    });
};
