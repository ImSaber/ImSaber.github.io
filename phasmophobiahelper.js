document.addEventListener("DOMContentLoaded", function () {
    const evidenceCheckboxes = document.querySelectorAll(".evidence-section input[name='evidence']");
    const notPossibleCheckboxes = document.querySelectorAll(".not-possible-section input[name='notPossible']");
  
    const ghosts = [
        { name: "Spirit", characteristics: ["EMF Level 5", "Spirit Box", "Ghost Writing"], evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"] },
        { name: "Wraith", characteristics: [], evidence: ["Freezing Temperatures", "Spirit Box", "D.O.T.S. Projector"] },
        { name: "Phantom", characteristics: [], evidence: ["EMF Level 5", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Poltergeist", characteristics: [], evidence: ["Fingerprints", "Spirit Box", "D.O.T.S. Projector"] },
        { name: "Banshee", characteristics: [], evidence: ["Fingerprints", "D.O.T.S. Projector", "Freezing Temperatures"] },
        { name: "Jinn", characteristics: [], evidence: ["EMF Level 5", "Ghost Orb", "Freezing Temperatures"] },
        { name: "Mare", characteristics: [], evidence: ["Spirit Box", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Revenant", characteristics: [], evidence: ["Fingerprints", "Ghost Writing", "D.O.T.S. Projector"] },
        { name: "Shade", characteristics: [], evidence: ["EMF Level 5", "Ghost Writing", "Freezing Temperatures"] },
        { name: "Demon", characteristics: [], evidence: ["Ghost Writing", "Spirit Box", "Freezing Temperatures"] },
        { name: "Yurei", characteristics: [], evidence: ["Ghost Orb", "Freezing Temperatures", "D.O.T.S. Projector"] },
        { name: "Oni", characteristics: [], evidence: ["EMF Level 5", "Ghost Writing", "D.O.T.S. Projector"] },
        { name: "Hantu", characteristics: [], evidence: ["Fingerprints", "Ghost Orb", "Freezing Temperatures"] },
        { name: "Yokai", characteristics: [], evidence: ["Spirit Box", "Ghost Orb", "D.O.T.S. Projector"] },
        { name: "Goryo", characteristics: [], evidence: ["EMF Level 5", "Fingerprints", "Ghost Orb"] },
        { name: "Myling", characteristics: [], evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"] }
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
  