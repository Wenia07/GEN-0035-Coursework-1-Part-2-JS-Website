document.addEventListener("DOMContentLoaded", () => {

    const countrySelect = document.getElementById("country");

    if (countrySelect) {
        const asianCountries = [
            "China", "India", "Japan", "South Korea", "Thailand",
            "Indonesia", "Malaysia", "Singapore", "Vietnam", "Philippines"
        ];

        const otherCountries = [
            "Australia", "Brazil", "Canada", "France", "Germany", "Italy",
            "Mexico", "Russia", "United Kingdom", "United States"
        ];

        otherCountries.sort();
        const allCountries = [...asianCountries, ...otherCountries];

        allCountries.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    const form = document.getElementById("playerForm");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const firstName = document.getElementById("fname").value.trim();
            const lastName = document.getElementById("lname").value.trim();
            const username = document.getElementById("usname").value.trim();
            const country = document.getElementById("country").value;
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirm = document.getElementById("confirm_password").value;

            if (!firstName || !lastName || !username || !email || !password) {
                alert("Please fill in all fields");
                return;
            }

            if (password !== confirm) {
                alert("Passwords do not match");
                return;
            }

            const passwordRegex = /^[A-Za-z0-9]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("Password must be at least 8 characters and contain only letters and numbers");
                return;
            }

            let players = JSON.parse(localStorage.getItem("players")) || [];

            if (players.some(p => p.username === username)) {
                alert("Username already exists");
                return;
            }

            players.push({
                username,
                country,
                email,
                wins: 0,
                losses: 0,
                rank: "Bronze",
                avatar: "https://i.pinimg.com/474x/9f/5d/78/9f5d78dae6b6a660fcd27534ed414201.jpg"
            });

            localStorage.setItem("players", JSON.stringify(players));
            window.location.href = "players.html";
        });
    }

    const profiles = document.getElementById("profiles");

    if (profiles) {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        profiles.innerHTML = "";

        players.forEach(p => {
            const card = document.createElement("div");
            card.className = "player-card";

            card.innerHTML = `
                <img src="${p.avatar}">
                <h2>${p.username}</h2>
                <span class="country">🌍 ${p.country}</span>
                <div class="stats">
                    <p><strong>Wins:</strong> ${p.wins}</p>
                    <p><strong>Losses:</strong> ${p.losses}</p>
                    <p><strong>Rank:</strong> ${p.rank}</p>
                </div>
            `;

            profiles.appendChild(card);
        });
    }

    const clearBtn = document.getElementById("clearDataBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all player data? This cannot be undone.")) {
                localStorage.removeItem("players");
                alert("All player data cleared!");
                location.reload();
            }
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const teamsContainer = document.getElementById("teamsContainer");
    teamsContainer.innerHTML = "";

    if (teams.length === 0) {
        teamsContainer.innerHTML = "<p style='text-align:center'>No teams registered yet.</p>";
        return;
    }

    teams.forEach(team => {
        const card = document.createElement("div");
        card.className = "team-card";

        let playerListHTML = "<ul class='player-list'>";
        team.players.forEach(playerName => {
            playerListHTML += `<li>${playerName}</li>`;
        });
        playerListHTML += "</ul>";

        card.innerHTML = `
            <h2>${team.name}</h2>
            ${playerListHTML}
        `;

        teamsContainer.appendChild(card);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const teamsContainer = document.getElementById("teamsContainer");
    const teams = JSON.parse(localStorage.getItem("teams")) || [];

    teamsContainer.innerHTML = "";

    if (teams.length === 0) {
        teamsContainer.innerHTML = "<p style='text-align:center'>No teams registered yet.</p>";
        return;
    }

    teams.forEach(team => {
        const card = document.createElement("div");
        card.className = "team-card";

        let playerListHTML = "<ul class='player-list'>";
        team.players.forEach(playerName => {
            playerListHTML += `<li>${playerName}</li>`;
        });
        playerListHTML += "</ul>";

        card.innerHTML = `
            <h2>${team.name}</h2>
            ${playerListHTML}
        `;

        teamsContainer.appendChild(card);
    });
});
