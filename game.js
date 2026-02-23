// ================================================
// GAME.JS — Burger Picker Game Logic
// ================================================
// What this file does:
//   1. Waits for the player to click the burger
//   2. Plays a spin animation on the burger
//   3. Adds the burger to the inventory panel
//   4. Hides the burger from the world (it was picked up!)
// ================================================


// ------------------------------------------------
// STEP 1: Grab references to the HTML elements
//         we need to control.
// ------------------------------------------------

const burger         = document.getElementById('burger');         // the clickable burger in the world
const inventoryItems = document.getElementById('inventory-items'); // the inventory list on the right


// ------------------------------------------------
// STEP 2: Keep track of how many burgers collected.
//         Starts at 0.
// ------------------------------------------------

let burgerCount = 0;


// ------------------------------------------------
// STEP 3: Listen for a click on the burger.
//         When clicked → spin it → then pick it up.
// ------------------------------------------------

burger.addEventListener('click', function () {

  // Don't allow clicking again while it's already spinning
  if (burger.classList.contains('spinning')) return;

  // --- Start the spin ---
  // Adding the 'spinning' class triggers the CSS @keyframes animation
  burger.classList.add('spinning');

  // --- Wait for spin to finish, then pick it up ---
  // 600ms matches the animation duration defined in style.css
  setTimeout(function () {

    // Remove the spinning class so it can spin again if reused later
    burger.classList.remove('spinning');

    // Hide the burger from the game world (it's been picked up)
    burger.style.display = 'none';

    // Add it to the inventory
    addToInventory();

  }, 600); // 600 milliseconds = 0.6 seconds

});


// ------------------------------------------------
// STEP 4: addToInventory()
//         Creates a new item row and appends it
//         to the inventory panel.
// ------------------------------------------------

function addToInventory() {

  // Increase our counter
  burgerCount++;

  // Create a new <div> for this inventory item
  const item = document.createElement('div');
  item.classList.add('inventory-item');  // styled in style.css

  // Fill it with the burger image and a label
  item.innerHTML = `
    <img src="art/k8burgerstill.png" alt="burger" style="width:40px; height:auto;" />
    <span class="label">Burger #${burgerCount}</span>
  `;

  // Add the new item to the inventory panel
  inventoryItems.appendChild(item);

  // Log to console for easy debugging during development
  console.log(`Burger #${burgerCount} added to inventory!`);
}
