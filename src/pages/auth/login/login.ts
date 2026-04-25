import type { IUser } from "../../../types/IUser";
import { getUsersArray, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const users = getUsersArray();
  
  const userEncontrado = users.find(
    (u: IUser) => u.email === valueEmail && u.password === valuePassword
  );

  if (!userEncontrado) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  userEncontrado.loggedIn = true;
  saveUser(userEncontrado);

  if (userEncontrado.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});