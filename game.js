// ================================================
// GAME.JS — Burger Picker Game Logic
// ================================================
// What this file does:
//   1. Waits for the player to click the burger
//   2. Burger pops to the center of the screen and scales up
//   3. Then fades out, gets added to the inventory
// ================================================


// ------------------------------------------------
// STEP 1: Grab references to the HTML elements
// ------------------------------------------------

const burger         = document.getElementById('burger');
const inventoryItems = document.getElementById('inventory-items');


// ------------------------------------------------
// STEP 2: Track how many burgers collected
// ------------------------------------------------

let burgerCount = 0;
let isAnimating = false; // prevents double-clicking during animation


// ------------------------------------------------
// STEP 3: Listen for a click on the burger
// ------------------------------------------------

burger.addEventListener('click', function () {

  // Ignore clicks while animation is already running
  if (isAnimating) return;
  isAnimating = true;

  // --- PHASE 1: Pop to center and scale up ---
  burger.style.transition = 'top 0.4s ease, left 0.4s ease, transform 0.4s ease';
  burger.style.top        = '50%';
  burger.style.left       = '50%';
  burger.style.transform  = 'translate(-50%, -50%) scale(3.5)';

  // --- PHASE 2: After it pops open, fade it out ---
  setTimeout(function () {

    burger.style.transition = 'opacity 0.35s ease';
    burger.style.opacity    = '0';

    // --- PHASE 3: After fade, hide it and add to inventory ---
    setTimeout(function () {

      burger.style.display = 'none';

      // Reset styles so it starts fresh if it ever reappears
      burger.style.transition = '';
      burger.style.opacity    = '1';
      isAnimating = false;

      addToInventory();

    }, 350);

  }, 500);

});


// ------------------------------------------------
// STEP 4: addToInventory()
//         Adds the burger image to the inventory panel
// ------------------------------------------------

function addToInventory() {
  burgerCount++;

  const item = document.createElement('div');
  item.classList.add('inventory-item');

  item.innerHTML = `
    <img src="art/k8burgerstill.png" alt="burger" />
  `;

  inventoryItems.appendChild(item);

  console.log(`Burger #${burgerCount} added to inventory!`);
}
