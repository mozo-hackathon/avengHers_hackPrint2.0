import axios from "axios";
import { email } from "./validators";
const token = localStorage.getItem("userinfo");

const backend = axios.create({
  baseURL: `http://localhost:4000/api`,
});

//auth

export const register = (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log(data);
  console.log("requests.js");
  return backend.post("/auth/signup", data, config);
};

export const login = (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return backend.post("/auth/login", data, config);
};

export const form = (data, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return backend.post("/form", data, config);
};
export const getAllForms = (id, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return backend.post("/form/get", id, config);
};

export const getFormById = (id, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return backend.get(`/form/${id}`, config);
};

export const estimateClaim = (id) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return backend.post("/estimate", id, config);
};

export const getClaim = (id, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return backend.get("/getestimateid", id, config);
};

export const getUserByToken = (token) => {
  return backend.get("/auth/profile/", {
    headers: { Authorization: `${token}` },
  });
};
