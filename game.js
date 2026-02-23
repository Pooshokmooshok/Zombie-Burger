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
const acqTxt         = document.getElementById('acq-txt');
const moreTxt        = document.getElementById('more-txt');
const resetBtn       = document.getElementById('reset-btn');


// ------------------------------------------------
// STEP 2: Track how many burgers collected
// ------------------------------------------------

let burgerCount = 0;
let isAnimating = false; // prevents double-clicking during animation

// Store timeout IDs so reset can cancel them mid-cycle
let activeTimeouts = [];


// ------------------------------------------------
// STEP 3: Listen for a click on the burger
// ------------------------------------------------

burger.addEventListener('click', function () {

  // Ignore clicks while animation is already running
  if (isAnimating) return;
  isAnimating = true;

  // --- PHASE 1: Pop to center and scale up ---
  burger.style.transition = 'top 0.9s ease, left 0.9s ease, transform 0.9s ease';
  burger.style.top        = '50%';
  burger.style.left       = '50%';
  burger.style.transform  = 'translate(-50%, -50%) scale(3.5)';

  // --- PHASE 2: After it pops open, fade it out ---
  activeTimeouts.push(setTimeout(function () {

    burger.style.transition = 'opacity 0.6s ease';
    burger.style.opacity    = '0';

    // --- PHASE 3: After fade, hide it and add to inventory ---
    activeTimeouts.push(setTimeout(function () {

      burger.style.display = 'none';

      burger.style.transition = '';
      burger.style.opacity    = '1';
      isAnimating = false;

      // Show the acquired text
      acqTxt.classList.remove('show');
      void acqTxt.offsetWidth;
      acqTxt.classList.add('show');

      // After acqtxt finishes (4s), fade in the more text
      activeTimeouts.push(setTimeout(function () {
        moreTxt.classList.add('show');
        moreTxt.style.opacity = '1';

        // After 2.5 seconds, fade it back out
        activeTimeouts.push(setTimeout(function () {
          moreTxt.style.opacity = '0';
        }, 2500));

      }, 4000));

      addToInventory();

    }, 600));

  }, 1100));

});


// ------------------------------------------------
// STEP 4: addToInventory()
//         Adds the burger image to the inventory panel
// ------------------------------------------------

// ------------------------------------------------
// STEP 5: Reset — puts the burger back, clears inventory
// ------------------------------------------------

resetBtn.addEventListener('click', function () {

  // Cancel any running animation timeouts
  activeTimeouts.forEach(function (id) { clearTimeout(id); });
  activeTimeouts = [];

  // Clear inventory items
  inventoryItems.innerHTML = '';
  burgerCount = 0;

  // Reset text overlays
  acqTxt.classList.remove('show');
  moreTxt.classList.remove('show');
  moreTxt.style.opacity = '0';

  // Restore burger to its original position and show it
  burger.style.transition = '';
  burger.style.top        = '';
  burger.style.left       = '';
  burger.style.transform  = '';
  burger.style.opacity    = '1';
  burger.style.display    = 'block';
  isAnimating             = false;

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
