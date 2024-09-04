export function arrayToObject(array, key) {
    return array.reduce((acc, obj) => {
        acc[obj[key]] = obj;
        return acc;
    }, {});
};

export function calculateStandings(ms) {
    const playerStats = {};

    // Initialize player statistics
    ms.forEach(m => {
        m.mps.forEach(mp => {
            if (!playerStats[mp.eventPlayerId]) {
                playerStats[mp.eventPlayerId] = {
                    eventPlayerId: mp.eventPlayerId,
                    matchesWon: 0,
                    matchesLost: 0,
                    gamesWon: 0,
                    gamesLost: 0,
                    pointsWon: 0,
                    pointsLost: 0
                };
            }
        });

        // Update match wins/losses
        const player1 = m.mps[0];
        const player2 = m.mps[1];

        if (player1.isWinner) {
            playerStats[player1.eventPlayerId].matchesWon++;
            playerStats[player2.eventPlayerId].matchesLost++;
        } else {
            playerStats[player1.eventPlayerId].matchesLost++;
            playerStats[player2.eventPlayerId].matchesWon++;
        }

        // Update game and point statistics
        for (let i = 1; i <= 5; i++) {
            const gameKey = `score${i}`;
            if (player1[gameKey] && player2[gameKey]) {
                const player1Score = player1[gameKey];
                const player2Score = player2[gameKey];

                if (player1Score > player2Score) {
                    playerStats[player1.eventPlayerId].gamesWon++;
                    playerStats[player2.eventPlayerId].gamesLost++;
                } else if (player1Score < player2Score) {
                    playerStats[player1.eventPlayerId].gamesLost++;
                    playerStats[player2.eventPlayerId].gamesWon++;
                }

                playerStats[player1.eventPlayerId].pointsWon += player1Score;
                playerStats[player1.eventPlayerId].pointsLost += player2Score;
                playerStats[player2.eventPlayerId].pointsWon += player2Score;
                playerStats[player2.eventPlayerId].pointsLost += player1Score;
            }
        }
    });

    // Function to sort tie groups based on different ratios
    function sortPlayers(players, winRatioFunc) {
        players.sort((a, b) => {
            const ratioA = winRatioFunc(a);
            const ratioB = winRatioFunc(b);
            return ratioB - ratioA;
        });
        return players;
    }

    // Pass 1: Match win/loss ratio
    let players = Object.values(playerStats);
    players = sortPlayers(players, player => player.matchesWon / (player.matchesWon + player.matchesLost || 1));

    // Pass 2: Game win/loss ratio within tie groups
    let tieGroups = [];
    let currentGroup = [];
    let lastRatio = null;

    players.forEach(player => {
        const currentRatio = player.matchesWon / (player.matchesWon + player.matchesLost || 1);
        if (currentRatio !== lastRatio && currentGroup.length > 0) {
            tieGroups.push(currentGroup);
            currentGroup = [];
        }
        currentGroup.push(player);
        lastRatio = currentRatio;
    });

    if (currentGroup.length > 0) tieGroups.push(currentGroup);

    tieGroups = tieGroups.map(group => sortPlayers(group, player => player.gamesWon / (player.gamesWon + player.gamesLost || 1)));

    // Pass 3: Points win/loss ratio within tie groups
    let finalStandings = [];

    tieGroups.forEach(group => {
        group = sortPlayers(group, player => player.pointsWon / (player.pointsWon + player.pointsLost || 1));
        finalStandings = finalStandings.concat(group);
    });

    // Return the final standings sorted by id and name
    return finalStandings;
};