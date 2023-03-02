/* Imports */
import { money } from "./money.js";
import Modal from "./modal.js";
import { openCase, openCasePage } from "./cases.js";


/* Creates the local storage of inventory */
localStorage.getItem("inventory") || localStorage.setItem("inventory", JSON.stringify([]));


/* Get html elements */
const html = {
    mainPage: document.getElementById("mainPage"),
    profilePage: document.getElementById("inventory"),
    casePage: document.getElementById("openCase"),
    price: document.getElementById("price"),
    caseContent: document.getElementById("caseContent"),
    spinner: document.getElementById("spinner"),
    skinsContainer: document.getElementById("skins"),
};


/* Inventory object */
const inventory = {
    // Adds item in inventory
    addItem(item) {
        const items = JSON.parse(localStorage.getItem("inventory"));

        if (item.price == null) item.price == "3,00€";
        items.push(item)
        localStorage.setItem("inventory", JSON.stringify(items));
    },

    // Sells item
    async sellItem(item, n) {
        const items = JSON.parse(localStorage.getItem("inventory"));

        if (item.price == null) item.price == "3,00€";
        items.splice(n, 1)
        localStorage.setItem("inventory", JSON.stringify(items))

        money.add(parseFloat(item.price.replace("€", "").replace(",", ".")));
    },

    // Gets items in inventory
    getItems: () => JSON.parse(localStorage.getItem("inventory")),
};


/* Opens profile page */
function openProfilePage(close = false) {
    const { price, caseContent, spinner, mainPage, profilePage, casePage, skinsContainer } = html;

    // Closes the profile page
    if (close) {
        for (const element of [price, caseContent, spinner]){ element.innerHTML = ""; }
        mainPage.style.display = "flex";
        casePage.style.display = "none";
        profilePage.style.display = "none";
        return;
    }

    skinsContainer.innerHTML = "";
    openCasePage();

    mainPage.style.display = "none";
    casePage.style.display = "none";
    profilePage.style.display = "flex";


    // Gets inventory items
    const items = inventory.getItems();
    const knives = ["bayonet", "gut", "karambit", "navaja"];

    for (const item of items){
        let folder = "";
        const formatted = item.skin.replace(/ /g, "_");

        if (knives.includes(item.weapon)){ folder = "knives/"; }

        const container = document.createElement("div");
        container.innerHTML = `<div class="details"><span>${item.weapon.toUpperCase()} | ${item.skin}</span><span>${item.price}</span></div><img decoding="async" loading="lazy" src="./img/skins/${folder}${item.weapon.replace(/ /g, "_")}/${formatted}.png">`
        container.classList.add(`border-${item.rarity.toLowerCase()}`);

        const sellBTN = document.createElement("button");
        sellBTN.innerText = "Sell skin";
        sellBTN.classList.add("sellItem");
        sellBTN.dataset.index = items.indexOf(item);

        container.querySelector(".details").appendChild(sellBTN);
        skinsContainer.appendChild(container)
    }


        // Sells item when button clicked
        const allSellBTNs = document.querySelectorAll(".sellItem");
        for (const button of allSellBTNs){
            button.addEventListener("click", () => {
                const weapon = items[button.dataset.index];
                inventory.sellItem(weapon, button.dataset.index);

                openProfilePage(false); openProfilePage(); // Closes and opens the profile again to show all the remaining items

                // Shows a modal about the item sold
                let folder = "";
                let formatted = weapon.skin.replace(/ /g, "_");        
                if (knives.includes(weapon.weapon)){ folder = "knives/"; }

                new Modal(` You sold ${weapon.weapon} | ${weapon.skin}<div class="skinImage ${weapon.rarity.toLowerCase()}"> <img decoding="async" loading="lazy" src="./img/skins/${folder}${weapon.weapon.replace(/ /g, "_")}/${formatted}.png"></div>Earned money: ${weapon.price}`)
            });
        }
}

/* Exports */
export { inventory, openProfilePage };