import "@babel/polyfill";
import { login, logout } from "./login";
import { updateData } from "./updateSettings";
import { displayMap } from "./mapbox";

//DOM ELEMENTS
const mapBox = document.querySelector("#map");
const loginForm = document.querySelector(".form--login");
const userDataForm = document.querySelector(".form-user-data");
const logutOutBtn = document.querySelector(".nav__el--logout");

//DELEGATIONS
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //VALUES
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logutOutBtn) logutOutBtn.addEventListener("click", logout);

if (userDataForm) {
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //VALUES
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    updateData(name, email);
  });
}
