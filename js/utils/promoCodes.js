/* Imports */
import Modal from "./modal.js";
import { money } from "./money.js";


/* Creates the local storage of used codes */
localStorage.getItem("usedCodes") || localStorage.setItem("usedCodes", JSON.stringify([]));

const availableCodes = { "RTCRAISY": 300, "RICHKID": 54000, "8HJUp1C7": 0.17, "tueLUKyM": 1.2, "MILLIONAIRE": 1000000 }; // Available codes
const redeemBTN = document.getElementById("redeem");


/* Redeem code event */
redeemBTN.addEventListener("click", () => {
    const value = document.getElementById("codeInput").value;
    const codes = Object.keys(availableCodes);
    const used = JSON.parse(localStorage.getItem("usedCodes"));

    document.getElementById("codeInput").value = "";

    if (value.replace(/ /g, "") == "" || !codes.includes(value)) return new Modal('<i class="zmdi zmdi-close-circle"></i><span>Please enter a valid code</span>');
    if (used.includes(value)) return new Modal(`<i class="zmdi zmdi-close-circle"></i><span>You already used the code "${value}"</span>`);

    // Code got used
    new Modal(`<i class="zmdi zmdi-check-circle"></i><span>You successfully used the code "${value}"</span>`);
    used.push(value);

    localStorage.setItem("usedCodes", JSON.stringify(used)); // Saves the code
    money.add(availableCodes[value]); // Adds the money
});
export default null;
