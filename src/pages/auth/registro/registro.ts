import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { getUsersArray, saveUsersArray } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form-registro") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const valueEmail = inputEmail.value;
    const valuePassword = inputPassword.value;

    const users = getUsersArray();

    const existe = users.find((u: IUser) => u.email === valueEmail);

    if (existe) {
        alert("El correo ya está registrado");
        return;
    }

    let rolAsignado: Rol = "client";

    if (valueEmail.includes("admin")) {
        rolAsignado = "admin";
    }

    const newUser: IUser = {
        email: valueEmail,
        password: valuePassword,
        role: rolAsignado,
        loggedIn: false
    };

    users.push(newUser);
    saveUsersArray(users);

    alert("Registro exitoso");
    navigate("/src/pages/auth/login/login.html");
});