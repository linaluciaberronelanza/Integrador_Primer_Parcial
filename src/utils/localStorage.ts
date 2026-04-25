import type { IUser } from "../types/IUser";

export const saveUsersArray = (users: IUser[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
export const getUsersArray = (): IUser[] => {
  const usersStr = localStorage.getItem("users");
  return usersStr ? JSON.parse(usersStr) : [];
};

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};

export const getUSer = () => {
  return localStorage.getItem("userData");
};

export const removeUser = () => {
  localStorage.removeItem("userData");
};

