export function arrayToObject(array, key) {
    return array.reduce((acc, obj) => {
        acc[obj[key]] = obj;
        return acc;
    }, {});
};

export function calculateStandings(ms) {
    const playerStats = {};

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

    function sortPlayers(players, winRatioFunc) {
        players.sort((a, b) => {
            const ratioA = winRatioFunc(a);
            const ratioB = winRatioFunc(b);
            return ratioB - ratioA;
        });
        return players;
    }

    let players = Object.values(playerStats);
    players = sortPlayers(players, player => player.matchesWon / (player.matchesWon + player.matchesLost || 1));

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

    let finalStandings = [];

    tieGroups.forEach(group => {
        group = sortPlayers(group, player => player.pointsWon / (player.pointsWon + player.pointsLost || 1));
        finalStandings = finalStandings.concat(group);
    });

    return finalStandings;
};

export function determineDrawSequence(n) {
    if (n === 2) {
        return [
            [1, 2]
        ];
    };

    if (n === 4) {
        return [
            [1, 3],
            [4, 2]
        ];
    };

    if (n === 6) {
        return [
            [1, null],
            [5, 4],
            [3, 6],
            [null, 2]
        ];
    };

    if (n === 8) {
        return [
            [1, 7],
            [6, 4],
            [3, 5],
            [8, 2]
        ];
    };

    if (n === 10) {
        return [
            [1, null],
            [9, 8],
            [5, null],
            [null, 4],
            [3, null],
            [null, 6],
            [7, 10],
            [null, 2]
        ];
    };

    if (n === 12) {
        return [
            [1, null],
            [9, 8],
            [5, 12],
            [null, 4],
            [3, null],
            [11, 6],
            [7, 10],
            [null, 2]
        ];
    };

    if (n === 14) {
        return [
            [1, null],
            [9, 8],
            [5, 12],
            [13, 4],
            [3, 14],
            [11, 6],
            [7, 10],
            [null, 2]
        ];
    };

    if (n === 16) {
        return [
            [1, 15],
            [10, 8],
            [5, 11],
            [14, 4],
            [3, 13],
            [12, 6],
            [7, 9],
            [16, 2]
        ];
    };

    if (n === 18) {
        return [
            [1, null],
            [17, 16],
            [9, null],
            [null, 8],
            [5, null],
            [null, 12],
            [13, null],
            [null, 4],
            [3, null],
            [null, 14],
            [11, null],
            [null, 6],
            [7, null],
            [null, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 20) {
        return [
            [1, null],
            [17, 16],
            [9, null],
            [null, 8],
            [5, null],
            [null, 12],
            [13, 20],
            [null, 4],
            [3, null],
            [19, 14],
            [11, null],
            [null, 6],
            [7, null],
            [null, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 22) {
        return [
            [1, null],
            [17, 16],
            [9, null],
            [null, 8],
            [5, null],
            [21, 12],
            [13, 20],
            [null, 4],
            [3, null],
            [19, 14],
            [11, 22],
            [null, 6],
            [7, null],
            [null, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 24) {
        return [
            [1, null],
            [17, 16],
            [9, 24],
            [null, 8],
            [5, null],
            [21, 12],
            [13, 20],
            [null, 4],
            [3, null],
            [19, 14],
            [11, 22],
            [null, 6],
            [7, null],
            [23, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 26) {
        return [
            [1, null],
            [17, 16],
            [9, 24],
            [25, 8],
            [5, null],
            [21, 12],
            [13, 20],
            [null, 4],
            [3, null],
            [19, 14],
            [11, 22],
            [null, 6],
            [7, 26],
            [23, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 28) {
        return [
            [1, null],
            [17, 16],
            [9, 24],
            [25, 8],
            [5, 28],
            [21, 12],
            [13, 20],
            [null, 4],
            [3, null],
            [19, 14],
            [11, 22],
            [27, 6],
            [7, 26],
            [23, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 30) {
        return [
            [1, null],
            [17, 16],
            [9, 24],
            [25, 8],
            [5, 28],
            [21, 12],
            [13, 20],
            [29, 4],
            [3, 30],
            [19, 14],
            [11, 22],
            [27, 6],
            [7, 26],
            [23, 10],
            [15, 18],
            [null, 2]
        ];
    };

    if (n === 32) {
        return [
            [1, 31],
            [18, 16],
            [9, 23],
            [26, 8],
            [5, 27],
            [22, 12],
            [13, 19],
            [30, 4],
            [3, 29],
            [20, 14],
            [11, 21],
            [28, 6],
            [7, 25],
            [24, 10],
            [15, 17],
            [32, 2]
        ];
    };
};

export function determineDrawRound(n) {
    if (n <= 2) return 2;
    if (n <= 4) return 4;
    if (n <= 8) return 8;
    if (n <= 16) return 16;
    if (n <= 32) return 32;
};