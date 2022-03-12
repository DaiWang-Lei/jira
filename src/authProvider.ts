import { UserProps } from "pages/Project/searchPanel";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: UserProps }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return window.fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(await resp.json())
    }
  });
};

export const register = (data: { username: string; password: string; repassowrd: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      debugger;
      return Promise.reject(await resp.json())
    }
  })
};


export const logout = async () => window.localStorage.removeItem(localStorageKey)