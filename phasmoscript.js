// Define the characteristics and potential ghost data
const characteristicsData = {
    "Spirit": [
      "Prevents hunting for 180 seconds when smudged",
      "Longer blink during hunts",
      "Disappears when you take a picture during a ghost event",
      "Will not appear in the picture when you take a ghost picture",
    ],
    "Wraith": [
      "Never steps in salt piles or leaves UV footsteps",
      "Can teleport to a player outside of a hunt",
      "Teleports back to its room if it loses sight of a player",
    ],
    "Phantom": [
      "Has a much longer blink during hunts",
      "Immediately disappears when you take a picture during a ghost event",
      "Will continue to hear the ghost event audio even after it disappears",
    ],
    "Poltergeist": [
      "More likely to throw items",
      "Decreases player sanity by 2% for every item thrown",
      "During hunts, has a 100% chance to throw an object nearby every 0.5 seconds",
      "Can create a pile of items in the ghost room and explode them",
    ],
    "Banshee": [
      "Hunts based on the target's sanity: 50% sanity",
      "Targets only one player as long as they're alive and inside the house",
      "Will ignore all non-targets during a hunt",
      "Increased chance for singing ghost events",
    ],
    "Jinn": [
      "Gets faster when the breaker is on and it has line of sight with a player",
      "Slows down to normal ghost speed when it gets within 3m of a player",
      "Can zap 25% sanity when near a player and the breaker is on",
      "Unable to turn off the breaker",
    ],
    "Mare": [
      "Can hunt at 60% sanity when the lights are off, 40% sanity when the lights are on",
      "Unable to turn on a light",
      "Higher chance of performing a light breaking event",
      "Has a chance of immediately switching off a light that has been turned on",
    ],
    "Revenant": [
      "Will be very slow when the player location is unknown (1m/s)",
      "Speeds up to 3m/s when it sees a player",
      "Gradually slows back down if it doesn't see the player after reaching the player's last known location",
      "Slow steps when it does not see a player, and instantly fast speeds when it does see a player",
    ],
    "Shade": [
      "Will often show up in shadow form during ghost events",
      "Will not throw objects if you are in the same room as it",
      "Will not hunt if there is a player nearby",
      "To test for a Shade, sit in the ghost room with a crucifix and low sanity",
    ],
    "Demon": [
      "Can hunt at 70% sanity naturally with a rare chance to hunt at any sanity",
      "Smudging a Demon will prevent it from hunting for 60 seconds",
      "Crucifix will prevent a hunt for a Demon with an increased range of 5m",
      "Unable to turn off the breaker",
    ],
    "Yurei": [
      "Has the ability to zap 15% sanity if a player is nearby",
      "When it uses its ability, it will also fully close a door in its room",
      "Will be trapped in its room for a period of time when smudged",
      "To test for a Yurei, put candles and crucifixes in its room",
    ],
    "Oni": [
      "Unable to do the 'ghost mist' or 'air ball' ghost event",
      "Much more visible during a hunt, meaning it blinks a lot less than other ghosts",
      "Has a higher chance of showing its full form during ghost events",
      "Will drain double the sanity when a ghost event hits you",
    ],
    "Yokai": [
      "Has a chance to hunt at 80% when players nearby are talking",
      "During a hunt, unable to detect your voice or equipment further than 2.5m away",
      "Can get much closer to a Yokai with a music box before the box will break",
      "Ghost activity is increased when talking near a Yokai",
    ],
    "Hantu": [
      "The lower the temperature, the quicker a Hantu will be",
      "Does not gradually speed up with line of sight",
      "Has an increased chance to turn off the breaker",
      "Will always have freezing temperatures on Nightmare mode",
    ],
    "Goryo": [
      "Goryo dots can only be seen through the video camera",
      "Will not show dots if you're in the same room as it",
      "To check for a Goryo, make sure no players are in its room and look for dots through the video camera",
    ],
    "Myling": [
      "Can only be heard during a hunt at a range of 12 meters or less",
      "All other ghosts can be heard up to 20 meters away",
      "Will also respond more on the parabolic microphone",
      "To test for a Myling, hide with your flashlight or put dots on the floor",
    ],
    "Onryo": [
      "Unable to hunt within 4m of a flame",
      "If it blows out 3 flames and there are no other flames nearby, it will trigger a hunt",
      "To test for an Onryo during a hunt, loop it for as long as possible and see if it changes ghost models",
    ],
    "Twins": [
      "Able to interact with multiple objects at the same time in different rooms",
      "Has a chance to send out either a slightly faster ghost or a slightly slower ghost during a hunt",
      "Will only send out one ghost during a hunt",
      "May also hunt from a different location from the ghost room",
    ],
    "Raiju": [
      "Gets faster around electronics that are turned on",
      "Must be within 6m-10m of equipment depending on map size",
      "When hunting, electronics will malfunction at 15m",
      "May be confused with a Myling due to similar behavior near powered electronics",
    ],
    "Obake": [
      "The only ghost that can leave a 6 fingered fingerprint",
      "Fingerprints are forced evidence on Nightmare mode",
      "Has a chance to shapeshift during a hunt",
      "May also run at you from a long corridor",
    ],
    "Mimic": [
      "The only ghost to have 4 pieces of evidence on professional difficulty and below",
      "Will always have Orbs on Nightmare Mode",
      "Will change the ghost it mimics every 30 seconds to 2 minutes",
      "Cannot change its behavior mid-hunt",
    ],
    "Moroi": [
      "Curses a player when they get a response on either the spirit box or the parabolic microphone",
      "Curse causes the player's sanity to drain twice as fast",
      "To remove the curse, take sanity pills",
      "Smudging during a hunt will blind the Moroi for 12 seconds",
    ],
    "Deogen": [
      "Unable to hide from this ghost",
      "Listens to the player's speed while hiding",
      "Deos are very slow when they are near the player",
      "Has a unique spirit box response that sounds like a growl or heavy breathing",
    ],
    "Thaye": [
      "The only ghost capable of aging",
      "Starts out young and becomes older over time",
      "Does not have line of sight speed increase",
      "Will always tell a different age on the Ouija board as it ages",
    ],
  };
  
// Function to create checkboxes for characteristics
function createCharacteristicsCheckboxes() {
  const characteristicsDiv = document.getElementById("characteristics");

  for (const [ghost, characteristics] of Object.entries(characteristicsData)) {
    const ghostDiv = document.createElement("div");
    ghostDiv.classList.add("ghost-characteristics");

    const ghostHeading = document.createElement("h3");
    ghostHeading.textContent = ghost;
    ghostDiv.appendChild(ghostHeading);

    for (const characteristic of characteristics) {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = characteristic;
      checkbox.addEventListener("change", updatePotentialGhosts);
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(characteristic));
      ghostDiv.appendChild(label);
    }

    characteristicsDiv.appendChild(ghostDiv);
  }
}

// Function to update the potential ghost list based on the selected characteristics
function updatePotentialGhosts() {
  const potentialGhostsList = document.getElementById("potentialGhostsList");
  potentialGhostsList.innerHTML = "";

  const selectedCharacteristics = [];
  const checkboxes = document.querySelectorAll("#characteristics input[type='checkbox']:checked");
  checkboxes.forEach(checkbox => {
    selectedCharacteristics.push(checkbox.value);
  });

  const potentialGhosts = Object.keys(characteristicsData).filter(ghost => {
    return selectedCharacteristics.every(characteristic => {
      return characteristicsData[ghost].includes(characteristic);
    });
  });

  potentialGhosts.forEach(ghost => {
    const ghostItem = document.createElement("li");
    ghostItem.textContent = ghost;
    potentialGhostsList.appendChild(ghostItem);
  });
}

// Call the function to create checkboxes for characteristics when the page loads
createCharacteristicsCheckboxes();