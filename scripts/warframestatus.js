// Sample Warframe data
const vaultedWarframes = [
    { name: 'Ember Prime', imageUrl: 'https://example.com/images/ember_prime.png' },
    { name: 'Frost Prime', imageUrl: 'https://example.com/images/frost_prime.png' },
    // Additional vaulted Warframes
  ];
  
  const unvaultedWarframes = [
    { name: 'Loki Prime', imageUrl: 'https://example.com/images/loki_prime.png' },
    { name: 'Nova Prime', imageUrl: 'https://example.com/images/nova_prime.png' },
    // Additional unvaulted Warframes
  ];
  
  const nextUnvaulting = {
    name: 'Next Unvaulting',
    warframes: [
      { name: 'Rhino Prime', imageUrl: 'https://example.com/images/rhino_prime.png' },
      { name: 'Nyx Prime', imageUrl: 'https://example.com/images/nyx_prime.png' },
      // Additional Warframes for the next unvaulting
    ],
  };
  
  // Function to display Warframes
  function displayWarframes(warframes, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
  
    warframes.forEach(warframe => {
      const warframeDiv = document.createElement('div');
      warframeDiv.classList.add('warframe');
  
      const image = document.createElement('img');
      image.src = warframe.imageUrl;
      warframeDiv.appendChild(image);
  
      const name = document.createElement('span');
      name.classList.add('name');
      name.textContent = warframe.name;
      warframeDiv.appendChild(name);
  
      container.appendChild(warframeDiv);
    });
  }
  
  // Display vaulted and unvaulted Warframes
  displayWarframes(vaultedWarframes, 'vaultedWarframeList');
  displayWarframes(unvaultedWarframes, 'unvaultedWarframeList');
  
  // Display next unvaulting
  displayWarframes(nextUnvaulting.warframes, 'nextUnvaultingList');
  