const footballTeam ={
    team: "Archentina",
    year: 1970, 
    headCoach: "Hoang", 
    players: [
        { name: "Nguyen Van A 1 ", position: "forward", isCaptain: true },
        { name: "Nguyen Van A 2 ", position: "forward", isCaptain: false },
        { name: "Nguyen Van A 3 ", position: "forward", isCaptain: false },
        { name: "Nguyen Van A 4", position: "forward", isCaptain: false },
        { name: "Nguyen Van A 5", position: "forward", isCaptain: false },
        { name: "Nguyen Van A 6", position: "forward", isCaptain: false },
        { name: "Tran Thi B 1", position: "midfielder", isCaptain: false  },
        { name: "Tran Thi B 2", position: "midfielder", isCaptain: false  },
        { name: "Tran Thi B 3", position: "midfielder", isCaptain: false  },
        { name: "Tran Thi B 4", position: "midfielder", isCaptain: false  },
        { name: "Le Van C 1", position: "defender", isCaptain: false },
        { name: "Le Van C 2", position: "defender", isCaptain: false },
        { name: "Le Van C 3", position: "defender", isCaptain: false },
        { name: "Le Van C 4", position: "defender", isCaptain: false },
        { name: "Le Van C 5", position: "defender", isCaptain: false },
        { name: "Le Van C 6", position: "defender", isCaptain: false },
        { name: "Pham Thi D 1", position: "goalkeeper", isCaptain: false },
        { name: "Pham Thi D 2 ", position: "goalkeeper", isCaptain: false },
        { name: "Pham Thi D 3", position: "goalkeeper", isCaptain: false }
    ],
};

const team = document.getElementById("team");
const year = document.getElementById("year");
const headCoach = document.getElementById("head-coach");

team.textContent = footballTeam.team;
year.textContent = footballTeam.year;
headCoach.textContent = footballTeam.headCoach;

const selectedPlayers = document.getElementById("players");
const cardsContainer = document.getElementById("player-cards");

function filterPlayers(position) {
    const result = position === "all" ? footballTeam.players : footballTeam.players.filter(player => player.position === position);

    return result.map(player => `<div class="player-card"><h2>${player.isCaptain ? "(Captain) " : ""}${player.name}</h2><p>Position: ${player.position}</p></div>`).join("");
}

selectedPlayers.addEventListener("change", () => {
    cardsContainer.innerHTML = filterPlayers(selectedPlayers.value);
});

console.log(filterPlayers("forward"));
console.log(filterPlayers("midfielder"));
console.log(filterPlayers("defender"));
console.log(filterPlayers("goalkeeper"));
console.log(filterPlayers("all"));