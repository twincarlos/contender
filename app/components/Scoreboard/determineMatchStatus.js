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

export default function updateMatchScoreAndStatus({ score, playerNumber, gameNumber, scores, gamesNeededToWin }) {
  let matchScore1 = 0;
  let matchScore2 = 0;
  let matchWinner = null;
  let matchValidity = "In Progress";

  scores = {
    ...scores,
    [gameNumber]: {
      ...scores[gameNumber],
      [`score${playerNumber}`]: score
    }
  };

  for (let i = 1; i <= Object.values(scores).length; i++) {
    let { score1, score2 } = scores[i];
    const { isValid, winner } = gameScoreIsValid(score1, score2);
    
    if (isValid) {
      // Update match score
      if (winner === 1) matchScore1++;
      else matchScore2++;

      // Update match status
      if ((matchValidity === "In Progress") && (matchScore1 === gamesNeededToWin || matchScore2 === gamesNeededToWin)) {
        matchValidity = "Finished";
        matchWinner = winner;
      } else if (matchValidity === "Finished") {
        matchValidity = "Invalid";
        matchWinner = null;
      };
    }
    else if ((matchValidity === "In Progress") || ((matchValidity === "Finished") && (score1 !== 0 || score2 !== 0))) {
      matchValidity = "Invalid";
      matchWinner = null;
    };
  };

  return {
    matchScore: {
      score1: matchScore1,
      score2: matchScore2
    },
    validity: matchValidity,
    winner: matchWinner,
    scores
  };
};