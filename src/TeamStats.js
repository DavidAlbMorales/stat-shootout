import React, { useState, useEffect } from 'react';

const TeamStatsData = ({ teamStats }) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (teamStats && teamStats.length === 2) {
      calculateWinner(teamStats);
    }
  }, [teamStats]);

  const calculateWinner = (teamStats) => {
    console.log(teamStats);
    let team1Points = 0;
    let team2Points = 0;

    // Compare team stats
    if (teamStats[0].PTS_RANK < teamStats[1].PTS_RANK) {
      team1Points++;
    } else if (teamStats[0].PTS_RANK > teamStats[1].PTS_RANK) {
      team2Points++;
    }

    if (teamStats[0].REB_RANK < teamStats[1].REB_RANK) {
      team1Points++;
    } else if (teamStats[0].REB_RANK > teamStats[1].REB_RANK) {
      team2Points++;
    }

    if (teamStats[0].AST_RANK < teamStats[1].AST_RANK) {
      team1Points++;
    } else if (teamStats[0].AST_RANK > teamStats[1].AST_RANK) {
      team2Points++;
    }

    if (teamStats[0].OPP_PTS_RANK < teamStats[1].OPP_PTS_RANK) {
      team1Points++;
    } else if (teamStats[0].OPP_PTS_RANK > teamStats[1].OPP_PTS_RANK) {
      team2Points++;
    }

    // Determine the winner
    let winner = null;
    if (team1Points > team2Points) {
      winner = teamStats[0].TEAM_NAME;
    } else if (team1Points < team2Points) {
      winner = teamStats[1].TEAM_NAME;
    } else {
      winner = "Tie";
    }

    setWinner(winner);
  };

  return (
    <div>
      {winner ? (
        <h2>The winner is: {winner}</h2>
      ) : (
        <h2>Calculating winner...</h2>
      )}
    </div>
  );
};

export default TeamStatsData;
