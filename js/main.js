/* Imports */
import { displayCases, openCasePage, openCase, properName } from "./utils/cases.js";
import { login, logout, logged } from "./utils/login.js";
import { getWeapons, asideWeapons, pushInAside } from "./utils/weaponsStuff.js";
import { money } from "./utils/money.js";
import { inventory, openProfilePage } from "./utils/inventory.js";
import Modal from "./utils/modal.js";
import "./utils/promoCodes.js";


/* Fixes URI Component */
function fixedEncodeURIComponent(url) {
    return encodeURIComponent(url).replace(/[!'()*]/g, function (fixed) {
        return "%" + fixed.charCodeAt(0).toString(16)
    });
}


/* Generates Random Case Item [For the konami code] */
function generateCaseItem(rarities) {
    const chance = 100 - rarities.content.map(rarity => rarity.chances).reduce((e, n) => e + n); // Calculates the chance to have each rarity
    const rarity = rarities.content.map((rarity, n) => Array(0 == rarity.chances ? chance : rarity.chances).fill(n)).reduce((e, n) => e.concat(n), []); // Selects the rarity depending on chances
    const random = Math.floor(100 * Math.random());

    return rarities.content[rarity[random]]; // Selects a random weapon
}


/* Main Function */
(async () => {

    // Creates the local storage of weapons
    localStorage.getItem("weapons") || localStorage.setItem("weapons", JSON.stringify(await getWeapons()));

    // Loads money
    const balance = await money.load();
    document.getElementById("money").innerHTML = `${Math.round(10 * balance) / 10}`;

    const weapons = await getWeapons();
    const cases = await displayCases();
    const openAudio = new Audio("./audio/crate_open.wav");

    openAudio.volume = .1;
    setInterval(() => asideWeapons(weapons, Math.floor(1200 * Math.random() + 900)), Math.floor(800 * Math.random() + 500));


    // Called when opening a case
    document.getElementById("openCaseButton").addEventListener("click", async () => {
        // Hides the close button and disables the open case button
        document.getElementById("openCaseButton").disabled = true;
        document.getElementById("closeCase").style.display = "none";

        // Selects the opened weapon
        const caseWeapons = cases.filter(_case => _case.name == document.getElementById("openCaseButton").dataset.caseName)[0];
        const openedWeapon = generateCaseItem(caseWeapons);
        let weapon = properName(openedWeapon.weapon);

        const skin = weapons[weapon].skins.filter(skin => skin.name == properName(openedWeapon.skin));
        let cleanName = weapon;
        let folder = "";

        if (["bayonet", "gut", "karambit", "navaja"].includes(weapon)) { // Changes details in case a knife has been unlocked
            folder = "knives/";
            cleanName = `★ ${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`;
            skin[0].name = skin[0].name.charAt(0).toUpperCase() + i[0].name.slice(1);
        }

        // Gets steam prices for more "realism"
        try {
            const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=${fixedEncodeURIComponent(`${weapon} | ${skin[0].name} (Factory New)`)}`)}`;
            const request = await fetch(url);

            let data = await request.json();
            data = JSON.parse(data.contents);

            if (data.median_price != null) skin[0].price = data.median_price;
        } catch (e) { skin[0].price = NaN; }

        // Adds the item
        inventory.addItem({
            weapon: cleanName,
            skin: skin[0].name,
            rarity: skin[0].rarity,
            price: skin[0].price.replace(/ /g, "")
        });

        // Opens the case and adds the added weapon in the inventory
        await openCase(openedWeapon, caseWeapons);

        // Remove balance (Case price)
        money.remove(caseWeapons.price);
        openAudio.play();

        // Shows the close button and enables the open case button
        document.getElementById("openCaseButton").disabled = false;
        document.getElementById("closeCase").style.display = "block";

        // Shows the item won in the aside & in a modal
        pushInAside(cleanName, openedWeapon.skin, skin[0].rarity);
        new Modal(`${cleanName} | ${skin[0].name}<div class="skinImage border_bottom-${skin[0].rarity.toLowerCase()}"><img decoding="async" loading="lazy" src="./img/skins/${folder}${cleanName.replace(/ /g, "_")}/${openedWeapon.skin.replace(/ /g, "_")}.png"></div>Price: ${skin[0].price}`);
    });

    // If not logged
    if (!logged){
        // Disables all listeners
        const buttons = document.getElementById("mainPage").querySelectorAll("button");
        for (const button of buttons) {
            const cloned = button.cloneNode(true);
            cloned.disabled = true,
            button.parentNode.replaceChild(cloned, button);
        }
    }

    // Page events
    document.getElementById("closeCase").addEventListener("click", () => { openCasePage(); }); // Close case page
    document.getElementById("openProfile").addEventListener("click", () => { openProfilePage(); }); // Opens profile page
    document.getElementById("closeProfile").addEventListener("click", () => { openProfilePage(true); }); // Closes profile page
    document.getElementById("login").addEventListener("click", () => { login(); }); // Allows the user to login
    document.getElementById("logout").addEventListener("click", () => { logout(); }); // Allows the user to logout
})();