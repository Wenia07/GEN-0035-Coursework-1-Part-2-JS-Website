document.addEventListener("DOMContentLoaded", () => {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const players = JSON.parse(localStorage.getItem("players")) || [];

    const team1Select = document.getElementById("team1");
    const team2Select = document.getElementById("team2");
    const player1Select = document.getElementById("player1");
    const player2Select = document.getElementById("player2");

    if(team1Select && team2Select) {
        teams.forEach(t => {
            const opt1 = document.createElement("option");
            opt1.value = t.name; opt1.textContent = t.name;
            const opt2 = document.createElement("option");
            opt2.value = t.name; opt2.textContent = t.name;
            team1Select.appendChild(opt1);
            team2Select.appendChild(opt2);
        });
    }

    if(player1Select && player2Select) {
        players.forEach(p => {
            const opt1 = document.createElement("option");
            opt1.value = p.username; opt1.textContent = p.username;
            const opt2 = document.createElement("option");
            opt2.value = p.username; opt2.textContent = p.username;
            player1Select.appendChild(opt1);
            player2Select.appendChild(opt2);
        });
    }

    const today = new Date().toISOString().split('T')[0];
    const endOfYear = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];
    const teamDateInput = document.getElementById("teamDate");
    const playerDateInput = document.getElementById("playerDate");

    if(teamDateInput){
        teamDateInput.setAttribute("min", today);
        teamDateInput.setAttribute("max", endOfYear);
    }
    if(playerDateInput){
        playerDateInput.setAttribute("min", today);
        playerDateInput.setAttribute("max", endOfYear);
    }

    const scheduleTeamBtn = document.getElementById("scheduleTeamBtn");
    if(scheduleTeamBtn) {
        scheduleTeamBtn.addEventListener("click", () => {
            const t1 = team1Select.value;
            const t2 = team2Select.value;
            const date = teamDateInput.value;
            const time = document.getElementById("teamTime").value;
            if (!t1 || !t2 || !date || !time) return alert("Please fill all fields for team match");
            if (t1 === t2) return alert("Teams must be different");

            let scheduled = JSON.parse(localStorage.getItem("scheduledMatches")) || [];
            scheduled.push({type:"team", team1:t1, team2:t2, date, time});
            localStorage.setItem("scheduledMatches", JSON.stringify(scheduled));
            updateMatchList("teamMatchList", "team");
            alert("Team match scheduled!");
        });
    }

    const schedulePlayerBtn = document.getElementById("schedulePlayerBtn");
    if(schedulePlayerBtn) {
        schedulePlayerBtn.addEventListener("click", () => {
            const p1 = player1Select.value;
            const p2 = player2Select.value;
            const date = playerDateInput.value;
            const time = document.getElementById("playerTime").value;
            if (!p1 || !p2 || !date || !time) return alert("Please fill all fields for player match");
            if (p1 === p2) return alert("Players must be different");

            let scheduled = JSON.parse(localStorage.getItem("scheduledMatches")) || [];
            scheduled.push({type:"player", player1:p1, player2:p2, date, time});
            localStorage.setItem("scheduledMatches", JSON.stringify(scheduled));
            updateMatchList("playerMatchList", "player");
            alert("Player match scheduled!");
        });
    }

    function updateMatchList(containerId, type) {
        const container = document.getElementById(containerId);
        if(!container) return;
        const scheduled = JSON.parse(localStorage.getItem("scheduledMatches")) || [];
        container.innerHTML = "";
        scheduled.filter(m=>m.type===type).forEach(m => {
            if(type==="team"){
                container.innerHTML += `<p>${m.date} ${m.time} - ${m.team1} vs ${m.team2}</p>`;
            } else {
                container.innerHTML += `<p>${m.date} ${m.time} - ${m.player1} vs ${m.player2}</p>`;
            }
        });
    }

    updateMatchList("teamMatchList", "team");
    updateMatchList("playerMatchList", "player");

    const teamBox = document.getElementById("teamMatchesBox");
    const playerBox = document.getElementById("playerMatchesBox");
    if(teamBox && playerBox){
        const scheduled = JSON.parse(localStorage.getItem("scheduledMatches")) || [];
        scheduled.forEach(m => {
            const p = document.createElement("p");
            if(m.type === "team") {
                p.textContent = `${m.date} ${m.time} - ${m.team1} vs ${m.team2}`;
                teamBox.appendChild(p);
            } else {
                p.textContent = `${m.date} ${m.time} - ${m.player1} vs ${m.player2}`;
                playerBox.appendChild(p);
            }
        });
    }
});
