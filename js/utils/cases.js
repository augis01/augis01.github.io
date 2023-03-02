/* Imports */
import { money } from "./money.js";


/* Creates the local storage of weapons */
const weapons = JSON.parse(localStorage.getItem("weapons"));


/* Html elements + Audio */
const caseScroll = new Audio("./audio/crate_scroll.wav");
const html = {
    price: document.getElementById("price"),
    caseContent: document.getElementById("caseContent"),
    casesContainer: document.getElementById("casesContainer"),
    spinner: document.getElementById("spinner"),
    mainPage: document.getElementById("mainPage"),
    casePage: document.getElementById("openCase"),
}


/* Get items proper name */
function properName(item) {
    let name = item.replace("knives/", "");
    return name.replace("_", " ");
}


/* Equivalent "wait()" in lua */
function delay(time) {
    return new Promise((callback) => {
        setTimeout(() => {
            callback();
        }, time);
    });
}


/* Get all the created cases */
function getCases() {
    return new Promise(async (res, rej) => {
        try {
            // Fetch cases
            const cases = await fetch("./json/cases.json");
            return res((await cases.json()).cases);
        } catch (e) {
            return rej(e);
        }
    });
}


/* Opens a case */
function openCase(e, _case) {
    return new Promise((res, rej) => {
        // Insufficient fund
        if (parseFloat(money.balance) + parseFloat(_case.price) < parseFloat(_case.price)) return;

        let time = 1;
        const { spinner } = html;
        const weapon = `${e.weapon}-${e.skin}`;

        // Spin items
        function spin(i) {
            const caseItems = spinner.querySelectorAll(".caseItem");
            const cloned = caseItems[0].cloneNode(true);

            caseScroll.currentTime = 0.1;
            setTimeout(async () => {
                caseItems[0].style.marginLeft = `-${caseItems[0].offsetWidth}px`; // Slides the items on the left
                spinner.append(cloned); // Appends the spinned item at the end of the html

                // Removes the item that has been spinned
                await delay(50 * time);
                spinner.removeChild(caseItems[0]);

                if (caseItems[1].dataset.weapon == weapon && time > 11) { res() } // The item has been unboxed
                else{
                    if (i > 40){ time *= 1.1 } // Increases time

                    caseScroll.play() // Plays the tick sound
                    return spin(i + 1) // Spin.
                }
            }, time);
        }   
        spin(0);     
    });
}


/* Opens cases page */
function openCasePage(_case = { close: true }) {
    const { price, caseContent, spinner, mainPage, casePage } = html;

    // Closes the cases page
    if (_case.close){
        caseScroll.pause(); // Pauses the audio
        for (const element of [price, caseContent, spinner]){ element.innerHTML = ""; }
        mainPage.style.display = "flex";
        casePage.style.display = "none";
        return;
    }

    // Displays case weapons
    function display(parent, border = "") {
        for (const item of _case.content) {
            const _name = properName(item.weapon);
            const _skin = properName(item.skin);

            // Gets skin
            const skin = weapons[_name].skins.filter(skin => skin.name == _skin);

            const weaponDiv = document.createElement("div");
            weaponDiv.classList.add("caseItem", `${border}${skin[0].rarity.toLowerCase()}`);
            weaponDiv.dataset.weapon = `${item.weapon}-${item.skin}`;
            weaponDiv.innerHTML = `<img decoding="async" loading="lazy" src="./img/skins/${item.weapon.replace(/ /g, "_")}/${item.skin.replace(/ /g, "_")}.png">`;

            parent.appendChild(weaponDiv)
        }
    }

    // Shows the page
    mainPage.style.display = "none";
    casePage.style.display = "flex";

    price.innerHTML = `${_case.price}€`;
    document.getElementById("openCaseButton").dataset.caseName = _case.name;

    // Disables/Enables the buttons
    if (parseFloat(money.balance) < parseFloat(_case.price)){ document.getElementById("openCaseButton").disabled = true; }
    else{ document.getElementById("openCaseButton").disabled = false; }

    // Shows the weapons in the spinners and case contents
    for (let i = 0; i < 2; i++) { display(spinner, "border_bottom-"); }
    display(caseContent, "border-");
}


/* Display all the available cases */
function displayCases() {
    return new Promise(async res => {
        const { casesContainer } = html;
        const allCases = await getCases();

        // For loop all the cases
        for (const _case of allCases){
            const name = _case.name.replace(/ /g, "_").toLowerCase();
            casesContainer.innerHTML += `<div class="case"><h2>${_case.name}</h2><img decoding="async" loading="lazy" src="./img/cases/${name}.png"><button data-caseurl="${name}" class="openCasePage">Open ${_case.price}€</button></div>`;
        }

        // Open case button
        const allOpenCaseBTNs = document.querySelectorAll(".openCasePage");
        for (const button of allOpenCaseBTNs){
            button.addEventListener("click", () => {
                const proper = properName(button.dataset.caseurl);
                openCasePage(allCases.filter(_case => _case.name.toLowerCase() == proper)[0]);
            })
        }
        return res(allCases);
    });
}


/* Exports */
caseScroll.volume = 0.05;
export { displayCases, openCasePage, openCase, properName };