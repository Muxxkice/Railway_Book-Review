import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-for-missions-and-railways.herokuapp.com",
  // timeout: 2000,
  // headers: { "Access-Control-Allow-Origin": "*" },
});

export const signInUser = async (data) => {
  console.log(data);
  try {
    const res = await instance.post(`/signin`, data);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    console.log(e.ErrorMessageJP);
  }
};

type SiginupUser = {
  name: string;
  email: string;
  password: string;
};
export const signUpUser = async (data: SiginupUser) => {
  console.log(data);
  try {
    const res = await instance.post(`/users`, data);
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.log(e);
    console.log(e.ErrorMessageJP);
  }
};
