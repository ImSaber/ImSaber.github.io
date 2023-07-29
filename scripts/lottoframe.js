// Sample data for relics and items (you can replace this with the actual data later)
const relics = [
    {
        name: "Lith N1 Relic",
        worth: 25,
        lootTable: [
            "Common Item 1",    // 25.33%
            "Common Item 2",    // 25.33%
            "Common Item 3",    // 25.33%
            "Uncommon Item 1",  // 11%
            "Uncommon Item 2",  // 11%
            "Rare Item"         // 2%
        ]
    },
    {
        name: "Meso T1 Relic",
        worth: 30,
        lootTable: [
            "Common Item 4",    // 25.33%
            "Common Item 5",    // 25.33%
            "Common Item 6",    // 25.33%
            "Uncommon Item 3",  // 11%
            "Uncommon Item 4",  // 11%
            "Rare Item 2"       // 2%
        ]
    },
    {
        name: "Neo N7 Relic",
        worth: 35,
        lootTable: [
            "Common Item 7",    // 25.33%
            "Common Item 8",    // 25.33%
            "Common Item 9",    // 25.33%
            "Uncommon Item 5",  // 11%
            "Uncommon Item 6",  // 11%
            "Rare Item 3"       // 2%
        ]
    },
    {
        name: "Axi A4 Relic",
        worth: 40,
        lootTable: [
            "Common Item 10",   // 25.33%
            "Common Item 11",   // 25.33%
            "Common Item 12",   // 25.33%
            "Uncommon Item 7",  // 11%
            "Uncommon Item 8",  // 11%
            "Rare Item 4"       // 2%
        ]
    }
    // Add more relics with their respective loot tables...
];

const items = [
    // Add items data here...
];

const inventorySwitch = document.getElementById("inventorySwitch");
const relicInventory = document.getElementById("relicInventory");
const itemInventory = document.getElementById("itemInventory");
const platinumBalanceElement = document.getElementById("platinumBalance");

// User's Platinum balance
let platinumBalance = 0;

// Function to update the displayed Platinum balance
function updatePlatinumBalance() {
    platinumBalanceElement.textContent = `Platinum: ${platinumBalance}`;
}

// Function to add relic cards to the relic inventory
function displayRelicInventory() {
    relicInventory.innerHTML = "";
    relics.forEach((relic) => {
        const card = createCard(`${relic.name} (Qty: ${relicQuantities[relic.name] || 0})`, relic.worth);
        card.addEventListener("click", () => showRelicDetails(relic));
        relicInventory.appendChild(card);
    });
}

// Function to add item cards to the item inventory
function displayItemInventory() {
    itemInventory.innerHTML = "";
    items.forEach((item) => {
        const card = createCard(item.name, item.worth);
        if (item.isCraftable) {
            card.classList.add("craftable");
        }
        itemInventory.appendChild(card);
    });
}

// Helper function to create a card element
function createCard(name, worth) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h3>${name}</h3><p>Worth: ${worth} Platinum</p>`;
    return card;
}

const inventoryList = document.getElementById("inventoryList");
const relicQuantities = { "Axi A4 Relic": 1 }; // User starts with 1 free Axi A4 relic

// Function to update the quantity of a relic in the user's inventory
function updateRelicQuantity(relicName, change) {
    if (relicQuantities.hasOwnProperty(relicName)) {
        relicQuantities[relicName] += change;
    } else {
        relicQuantities[relicName] = change;
    }
}

// Function to display the user's inventory
function displayInventory() {
    inventoryList.innerHTML = "";
    Object.entries(relicQuantities).forEach(([relicName, quantity]) => {
        const card = createCard(`${relicName} (Qty: ${quantity})`, relics.find(relic => relic.name === relicName).worth);
        card.addEventListener("click", () => showRelicDetails(relics.find(relic => relic.name === relicName)));
        inventoryList.appendChild(card);
    });
}

// Function to show relic details in a modal
function showRelicDetails(relic) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");
    const modalClose = document.getElementById("modalClose");
    const openBtn = document.getElementById("openBtn");
    const sellBtn = document.getElementById("sellBtn");

    // Existing code remains unchanged

    // Handle open relic button click
    openBtn.onclick = () => {
        const randomIndex = Math.floor(Math.random() * relic.lootTable.length);
        const acquiredItem = relic.lootTable[randomIndex];
        alert(`You have acquired: ${acquiredItem}`);
        updateRelicQuantity(relic.name, -1); // Reduce the relic quantity by 1
        displayInventory();
        modal.style.display = "none";
    };

    // Handle sell relic button click
    sellBtn.onclick = () => {
        platinumBalance += relic.worth;
        updatePlatinumBalance();
        updateRelicQuantity(relic.name, -1); // Reduce the relic quantity by 1
        displayInventory();
        modal.style.display = "none";
    };

    // Display the modal
    modal.style.display = "block";

    // Handle close button click to close the modal
    modalClose.onclick = () => {
        modal.style.display = "none";
    };

    // Close the modal when clicked outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Switch inventory button event listener
inventorySwitch.addEventListener("click", () => {
    if (itemInventory.style.display === "none") {
        inventorySwitch.textContent = "Switch to Relic Inventory";
        relicInventory.style.display = "none";
        itemInventory.style.display = "flex";
    } else {
        inventorySwitch.textContent = "Switch to Item Inventory";
        relicInventory.style.display = "flex";
        itemInventory.style.display = "none";
    }
});

// Initialize the page by displaying the relic inventory, user's inventory, and Platinum balance
displayRelicInventory();
displayInventory();
updatePlatinumBalance();
