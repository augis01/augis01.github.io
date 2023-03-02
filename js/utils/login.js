/* Imports */
import Modal from "./modal.js";


/* Creates the local storage of user session */
const logged = JSON.parse(localStorage.getItem("logged")) || localStorage.setItem("logged", false);


/* Check if the user is logged in and change the page content depending on it */
let displayClass = "logged";
if (logged) displayClass = "not_logged";

const allElements = document.getElementsByClassName(displayClass);
for (const element of  allElements) element.style.display = "none";


/* Login function */
function login() {
    // Shows the modal saying this website isn't meant to be real
    new Modal('<i class="zmdi zmdi-alert-circle"></i><span style="text-align: center">Attention, you must know that this site is not real, and you can\'t put money or withdraw skins with it.<br>\n        It was just created for a friend who wanted a fake gambling site for his friends.<br>This website is not affiliated with steam, and will never ask for your password/username.</span>',
    () => {
        localStorage.setItem("logged", true)
        window.location.href = "./login.html"; // Redirects to the "fake" login page
    });
}

/* Logout function */
function logout() {
    localStorage.setItem("logged", false)
    window.location.reload();
}

/* Exports */
export { login, logout, logged };