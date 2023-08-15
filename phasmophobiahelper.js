document.addEventListener("DOMContentLoaded", function () {
    const evidenceCheckboxes = document.querySelectorAll(".evidence-section input[name='evidence']");
    const notPossibleCheckboxes = document.querySelectorAll(".not-possible-section input[name='notPossible']");
  
    const ghosts = [
        { name: "Spirit", characteristics: ["EMF Level 5", "Spirit Box", "Ghost Writing"], evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"] },
        { name: "Wraith", characteristics: ["Cannot step on salt |","Can teleports to the player outside a hunt |", "Teleports back to its room if it loses sight of the player"], evidence: ["Freezing Temperatures", "Spirit Box", "D.O.T.S. Projector"] },
        { name: "Phantom", characteristics: ["Longer blinks during hunts", "Dissapears if a photo is taken of them", "Will continue to hear ghost after it dissapears"], evidence: ["EMF Level 5", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Poltergeist", characteristics: ["More likely to throw items", "Decreases player sanity by 2% for every item thrown", "During hunts, it has a 100% chance of throwing an item every .5 seconds"], evidence: ["Fingerprints", "Spirit Box", "D.O.T.S. Projector"] },
        { name: "Banshee", characteristics: ["Hunt depends on players sanity (Starting at 50%)", "Targets only one player as long as they are alive and inside the house", "Will ignore non-target players during a hunt", "Increased chance of having a singing event"], evidence: ["Fingerprints", "D.O.T.S. Projector", "Freezing Temperatures"] },
        { name: "Jinn", characteristics: ["Faster when the break is on and player is in sight", "Slows down to normal ghost speeds when 3m of the player", "Can zap 25% sanity when near the player and the breaker is on", "Unable to turn off breaker"], evidence: ["EMF Level 5", "Ghost Orb", "Freezing Temperatures"] },
        { name: "Mare", characteristics: ["Can hunt at 60% sanity when lightd are off, 40% when lights are on", "Unable to turn on a light", "Higher chance to perform a light breaking event", "Has a chance to immidietely switching off a light that has been switched on"], evidence: ["Spirit Box", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Revenant", characteristics: ["Very slow when the players location is unknown", "Speeds up to 3m/s when it sees a player", "Slows down if it does not see the player once arriving at the players final known location"], evidence: ["Fingerprints", "Ghost Writing", "D.O.T.S. Projector"] },
        { name: "Shade", characteristics: ["Will often show up in shadow form during ghost events", "Will not throw objects if the player is in the same room", "Will not hunt if the player is nearby"], evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temperatures"] },
        { name: "Demon", characteristics: ["Can hunt at 70% naturally but rarely hunts above that", "Smudging a demon will prevent it from hunting for 60 seconds", "Increased crucifix range", "Unable to turn off breaker"], evidence: ["Ghost Writing", "Spirit Box", "Freezing Temperatures"] },
        { name: "Yurei", characteristics: ["Has the ability to zap 15% of sanity from the player(s)", "When it uses an ability, it will fully close the door in its room", "Will be trapped in its room for a period of time when smudged"], evidence: ["Ghost Orb", "Freezing Temperatures", "D.O.T.S. Projector"] },
        { name: "Oni", characteristics: ["Cannot perform 'ghost mist' or 'air ball' effect", "Much more visible during a hunt (blinks alot less)", "Has a higher chance of showing its full form during ghost events", "Will drain double the sanity when a ghost event hits you"], evidence: ["EMF Level 5", "Ghost Writing", "D.O.T.S. Projector"] },
        { name: "Hantu", characteristics: ["Very quick in colder temps", "Does not speed up in line of sight", "Increase chance of turning off the breaker", "Forced Evidece: Freezing Temps in Nightmare Mode"], evidence: ["Fingerprints", "Ghost Orb", "Freezing Temperatures"] },
        { name: "Yokai", characteristics: ["Has a chance to hunt at 80% when players are nearby and talking", "During a hunt, unable to detect your boice or equipment from more than 2.5 meters away", "Can get much closer to a yokai with a music box before the box will break", "Ghost activity is increased when talking near a Yokai"], evidence: ["Spirit Box", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Goryo", characteristics: ["Goryo Dots can only be seen through the video camera", "Will not show dots if you're in the same room"], evidence: ["EMF Level 5", "Fingerprints", "Ghost Orb"] },
        { name: "Myling", characteristics: [], evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"] },
        { name: "The Twins", characteristics: [], evidence: ["EMF Level 5", "Freezing Temperatures", "Spirit Box"] },
        { name: "The Mimic", characteristics: [], evidence: ["Fingerprints", "Freezing Temperatures", "Spirit Box", "Ghost Orb"] },
        { name: "Raiju", characteristics: [], evidence: ["EMF Level 5", "D.O.T.S. Projector", "Ghost Orb"] },
        { name: "Deogen", characteristics: [], evidence: ["D.O.T.S. Projector", "Ghost Writing", "Spirit Box"] },
        { name: "Moroi", characteristics: [], evidence: ["Freezing Temperatures", "Ghost Writing", "Spirit Box"] },
        { name: "Obake", characteristics: [], evidence: ["EMF Level 5", "Fingerprints", "Ghost Orb"] },
        { name: "Onryo", characteristics: [], evidence: ["Freezing Temperatures", "Ghost Orb", "Spirit Box"] },
        { name: "Thaye", characteristics: [], evidence: ["D.O.T.S. Projector", "Ghost Orb", "Ghost Writing"] }
    ];
  
    function updateGhostList() {
      const selectedEvidence = Array.from(evidenceCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
  
      const notPossibleEvidence = Array.from(notPossibleCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
  
      const filteredGhosts = ghosts.filter((ghost) =>
        selectedEvidence.every((evidence) => ghost.evidence.includes(evidence)) &&
        !notPossibleEvidence.some((evidence) => ghost.evidence.includes(evidence))
      );
  
      const ghostList = document.getElementById("ghost-list");
      ghostList.innerHTML = "";
  
      filteredGhosts.forEach((ghost) => {
        const ghostCard = document.createElement("div");
        ghostCard.classList.add("ghost-card");
  
        const ghostName = document.createElement("h3");
        ghostName.textContent = ghost.name;
  
        const characteristics = document.createElement("p");
        characteristics.textContent = "Characteristics: " + ghost.characteristics.join(", ");
  
        const evidenceList = document.createElement("div");
        evidenceList.classList.add("evidence-list");
  
        ghost.evidence.forEach((evidence) => {
          const evidenceItem = document.createElement("div");
          evidenceItem.classList.add("evidence-bubble");
          evidenceItem.textContent = evidence;
          evidenceList.appendChild(evidenceItem);
        });
  
        ghostCard.appendChild(ghostName);
        ghostCard.appendChild(characteristics);
        ghostCard.appendChild(evidenceList);
  
        ghostList.appendChild(ghostCard);
      });
    }
  
    evidenceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateGhostList);
    });
  
    notPossibleCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateGhostList);
    });
  
    updateGhostList();
  });
  