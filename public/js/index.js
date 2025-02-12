import "@babel/polyfill";
import { login, logout } from "./login";
import { displayMap } from "./mapbox";

//DOM ELEMENTS
const mapBox = document.querySelector("#map");
const loginForm = document.querySelector(".form");
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
