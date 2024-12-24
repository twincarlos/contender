function gameScoreIsValid(score1, score2) {
  if (score1 === score2)
    return {
      isValid: false,
      winner: null,
    };
  if (score1 < 0 || score2 < 0)
    return {
      isValid: false,
      winner: null,
    };
  if ((score1 < 10 && score2 === 11) || (score2 < 10 && score1 === 11))
    return {
      isValid: true,
      winner: score1 > score2 ? 1 : 2,
    };
  if ((score1 === 10 && score2 === 12) || (score2 === 10 && score1 === 12))
    return {
      isValid: true,
      winner: score1 > score2 ? 1 : 2,
    };
  if (
    (score1 > 10 && score2 === score1 + 2) ||
    (score2 > 10 && score1 === score1 + 2)
  )
    return {
      isValid: true,
      winner: score1 > score2 ? 1 : 2,
    };
  return {
    isValid: false,
    winner: null,
  };
};

export default function updateMatchScoreAndStatus({ score, playerNumber, gameNumber, match, setMatch }) {
  let matchScore1 = 0;
  let matchScore2 = 0;
  let status = "In Progress";
  let matchWinner = null;

  for (let i = 1; i <= Object.values(match.scores).length; i++) {
    let { score1, score2 } = match.scores[i];

    if (gameNumber === i) {
      if (playerNumber === 1) score1 = score;
      else score2 = score;
    }

    const { isValid, winner } = gameScoreIsValid(score1, score2);

    if (isValid) {
      // Update match score
      if (winner === 1) matchScore1++;
      else matchScore2++;

      // Update match status
      if ((status === 'In Progress') && (matchScore1 === match.gamesNeededToWin || matchScore2 === match.gamesNeededToWin)) {
        status = 'Finished';
        matchWinner = matchScore1 > matchScore2 ? 1 : 2;
      } else if (status === 'Finished') {
        status = 'Invalid';
        matchWinner = null;
      };
    }
    else if ((status === 'In Progress') || ((status === 'Finished') && !(score1 === 0 && score2 === 0))) {
      status = 'Invalid';
      matchWinner = null;
    };
  };

  setMatch({
    ...match,
    matchScore: {
      score1: matchScore1,
      score2: matchScore2,
    },
    scores: {
      ...match.scores,
      [gameNumber]: {
        ...match.scores[gameNumber],
        [`score${playerNumber}`]: score,
      },
    },
    status: status === 'Invalid' ? 'In Progress' : 'Pending',
    winner: matchWinner
  });
};