export default class Modal {
    /* Modal creation */
    constructor(html, callback = null) {
        // Html elements
        const modalContainer = document.createElement("div");
        const modal = document.createElement("div");
        const content = document.createElement("div");
        content.innerHTML = html;

        // Classes
        modalContainer.classList.add("modalContainer");
        modal.classList.add("modal");

        // Creates the close button
        const closeBTN = document.createElement("button");
        closeBTN.innerText = "Continue";
        closeBTN.addEventListener("click", () => {
            this.close();
            if (callback != null) callback();
        });

        // Appends
        modal.appendChild(content);
        modalContainer.appendChild(modal);
        modal.appendChild(closeBTN);
        document.body.appendChild(modalContainer);
        
        this.modal = modalContainer;
    }

    /* Closes the modal */
    close() {
        document.body.removeChild(this.modal);
    }
}
