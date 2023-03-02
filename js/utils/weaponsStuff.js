const html = { ROC: document.getElementById("ROC") };

/* Equivalent "wait()" in lua */
function delay(time) {
    return new Promise((callback) => {
        setTimeout(() => {
            callback();
        }, time);
    });
}


/* Show weapons in the sidebar */
function pushInAside(weapon, name, rarity) {
    const { ROC: ul } = html; // UL element

    const li = document.createElement("li");
    const img = document.createElement("img");
    const tempIMG = new Image();

    tempIMG.onload = () => { img.src = tempIMG.src; }; // Loads the weapon img

    // Checks if it's a knife or not
    if (["bayonet", "gut", "karambit", "navaja"].includes(weapon)) { tempIMG.src = `./img/skins/knives/${weapon.replace(/ /g, "_")}/${name.replace(/ /g, "_")}.png`; }
    else { tempIMG.src += `./img/skins/${weapon.replace(/ /g, "_")}/${name.replace(/ /g, "_")}.png`; }

    // Shows in the aside
    li.classList.add(rarity.toLowerCase());
    li.appendChild(img);
    ul.prepend(li);

    // Removes it to avoid lags
    const test = setInterval(() => {
        if (li.offsetTop > window.innerHeight) {
            ul.removeChild(li);
            clearInterval(test);
        }
    }, 500);
}


/* Gets all weapons from the json */
function getWeapons() {
    return new Promise(async (res, rej) => {
        try {
            // Fetch request
            const weapons = await fetch("./json/weapons.json");
            return res(await weapons.json());
        } catch (e) {
            return rej(e);
        }
    });
}


/* Picks a random weapon depending on its rarity */
function pickRarity() {
    const rarities = [
        { type: "Consumer", chances: 40 },
        { type: "Industrial", chances: 40 },
        { type: "Mil-spec", chances: 10 },
        { type: "Restricted", chances: 5 },
        { type: "Classified", chances: 4 },
        { type: "Covert", chances: 1 },
    ];

    return new Promise((res) => {
        // Ngl, helped myself with some code on stackoverflow.
        const chance = 100 - rarities.map(rarity => rarity.chances).reduce((e, n) => e + n); // Calculates the chance to have each rarity
        const rarity = rarities.map((rarity, n) => Array(0 == rarity.chances ? chance : rarity.chances).fill(n)).reduce((e, n) => e.concat(n), []); // Selects the rarity depending on chances
        const random = Math.floor(100 * Math.random());

        return res(rarities[rarity[random]]); // Selects a random weapon
    });
}


/* Selects some random weapons and put it in the aside */
function asideWeapons(weaponsList, timeout) {
    setTimeout(async () => {
        const amount = Math.floor(2 * Math.random() + 1); // Random amount of weapons opened each time the function is called

        for (let t = 0; t < amount; t++) {
            const rarity = await pickRarity(); // Picks a random rarity
            const weapons = Object.keys(weaponsList).filter((t) => weaponsList[t].skins.some((e) => e.rarity == rarity.type)); // Selects weapons from the list that have the same rarity as the one chosen
            const weapon = weapons[Math.floor(Math.random() * weapons.length)]; // Selects a random one
            const skin = weaponsList[weapon].skins[Math.floor(Math.random() * weaponsList[weapon].skins.length)]; // Selects a random skin
    
            await delay(100);
            pushInAside(weapon, skin.name, skin.rarity); // Displays it
        }
    }, timeout);
}

export { getWeapons, asideWeapons, pushInAside };