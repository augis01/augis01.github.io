/* Creates the local storage of balance */
localStorage.getItem("balance") || localStorage.setItem("balance", "0.00");


/* Creates the money object */
const money = {
    balance: null,

    // Loads the money
    load() {
        return new Promise(res => {
            this.balance = parseFloat(localStorage.getItem("balance"));
            return res(localStorage.getItem("balance"));
        });
    },

    // Updates balance
    update() {
        document.getElementById("money").innerHTML = `${this.balance.toFixed(2)}`;
        localStorage.setItem("balance", this.balance);
    },

    // Adds a specific ammount of money
    add(ammount) {
        this.balance += parseFloat(ammount);
        this.update();
    },

    // Removes a specific ammout of money
    remove(ammount) {
        this.balance -= parseFloat(ammount);
        this.update();
    }
};

/* Exports */
export { money };