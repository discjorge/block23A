// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2501-PUPPIES";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

state = {
  allPlayers: [],
  favPlayer: [],
};

const main = document.querySelector("main");

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`
    );
    const result = await response.json();
    // console.log(result);
    //  console.log(result.data);
    return result.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`
    );
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`,
      {
        //TODO
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerObj),
      }
    );
    const result = await response.json();
    //console.log(result);
    return result.data.players;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`,
      { method: "DELETE" }
    );
    const result = await response.json();
    //console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  main.innerHTML = "";
  if (playerList.length !== 0) {
    playerList.forEach((pet) => {
      const card = document.createElement("div");
      card.classList.add("petCard");
      card.innerHTML = `
    <h2>${pet.name}</h1>
    <h3>${pet.id}</h2>
    <img src="${pet.imageUrl}" width="100" height="100"/>
    <br/>
    `;
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "See Details";
      detailsButton.setAttribute("type", "submit");
      const removePlayerButton = document.createElement("button");
      removePlayerButton.textContent = "Remove Player";
      removePlayerButton.setAttribute("type", "submit");
      main.appendChild(card);
      main.appendChild(detailsButton);
      main.appendChild(removePlayerButton);

      detailsButton.addEventListener("click", async () => {
        const player = await fetchSinglePlayer(pet.id);
        renderSinglePlayer(player);
      });

      removePlayerButton.addEventListener("click", async () => {
        await removePlayer(pet.id);
        const updatedPlayers = await fetchAllPlayers();
        renderAllPlayers(updatedPlayers);
      });
    });
  } else {
    alert("Sorry there's no players");
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  main.innerHTML = "";
  const card = document.createElement("div");
  card.classList.add("petCard");
  card.innerHTML = `
    <h1>${player.name}</h1>
    <h2>${player.id}</h2>
    <h2>${player.breed}</h2>
    <img src="${player.imageUrl}"/>
    `;
  const backButton = document.createElement("button");
  backButton.textContent = "Back To All Players";
  backButton.setAttribute("type", "submit");
  main.appendChild(card);
  main.appendChild(backButton);
  backButton.addEventListener("click", async () => {
    const allPlayers = await fetchAllPlayers();
    renderAllPlayers(allPlayers);
  });
};
/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  // renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
