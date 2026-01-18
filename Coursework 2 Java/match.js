let players = JSON.parse(localStorage.getItem("players")) || [];

let p1, p2;
let score1 = 0;
let score2 = 0;

let timeLeft = 60;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    const p1Select = document.getElementById("player1");
    const p2Select = document.getElementById("player2");

    players.forEach((player, index) => {
        p1Select.add(new Option(player.username, index));
        p2Select.add(new Option(player.username, index));
    });
});

function startMatch() {
    const i1 = document.getElementById("player1").value;
    const i2 = document.getElementById("player2").value;

    if (i1 === i2) {
        alert("Select two different players");
        return;
    }

    p1 = players[i1];
    p2 = players[i2];

    score1 = 0;
    score2 = 0;
    timeLeft = 300;

    document.getElementById("p1score").textContent = "0";
    document.getElementById("p2score").textContent = "0";
    document.getElementById("p1name").textContent = p1.username;
    document.getElementById("p2name").textContent = p2.username;
    document.getElementById("status").textContent = "Draw";
    document.getElementById("timer").textContent = "Time: " + timeLeft;

    document.querySelectorAll(".player-box button").forEach(b => {
        b.disabled = false;
        b.style.opacity = "1";
    });

    document.getElementById("matchArea").style.display = "block";
    startTimer();
}

function addScore(player) {
    if (player === 1) {
        score1++;
        document.getElementById("p1score").textContent = score1;
    } else {
        score2++;
        document.getElementById("p2score").textContent = score2;
    }
    updateStatus();
}

function updateStatus() {
    if (score1 > score2) document.getElementById("status").textContent = p1.username + " is Winning";
    else if (score2 > score1) document.getElementById("status").textContent = p2.username + " is Winning";
    else document.getElementById("status").textContent = "Draw";
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endMatch();
        }
    }, 1000);
}

function endMatch() {
    clearInterval(timerInterval);

    if (score1 > score2) {
        p1.wins++;
        p2.losses++;
    } else if (score2 > score1) {
        p2.wins++;
        p1.losses++;
    }

    updateRank(p1);
    updateRank(p2);

    localStorage.setItem("players", JSON.stringify(players));

    document.querySelectorAll(".player-box button").forEach(b => {
        b.disabled = true;
        b.style.opacity = "0.5";
    });

    alert("Match results saved!");
    window.location.href = "players.html";
}

function updateRank(player) {
    if (player.wins >= 20) player.rank = "Gold";
    else if (player.wins >= 10) player.rank = "Silver";
    else player.rank = "Bronze";
}
