import React, { useState, useEffect } from 'react';

const TeamStatsData = () => {
  const [teamStats, setTeamStats] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/team_stats.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched team stats data:', data);
        setTeamStats(data.team_stats);
        calculateWinner(data.team_stats);
      } catch (error) {
        console.error('Error fetching team stats:', error);
      }
    };

    fetchData();
  }, []);
  

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

  //   const sortedTeam1Roster = teamStats[0]?.team_roster_stats1[0]?.sort((a, b) => b.PIE - a.PIE) ?? [];
  //   const sortedTeam2Roster = teamStats[1]?.team_roster_stats2[0]?.sort((a, b) => b.PIE - a.PIE) ?? [];
    
  //   for (let i = 0; i < 9; i++) {
  //     const player1 = sortedTeam1Roster[i];
  //     const player2 = sortedTeam2Roster[i];

  //     if (player1.PTS > player2.PTS) {
  //       team1Points++;
  //     } else if (player1.PTS < player2.PTS) {
  //       team2Points++;
  //     }

  //     if (player1.REB > player2.REB) {
  //       team1Points++;
  //     } else if (player1.REB < player2.REB) {
  //       team2Points++;
  //     }

  //     if (player1.AST > player2.AST) {
  //       team1Points++;
  //     } else if (player1.AST < player2.AST) {
  //       team2Points++;
  //     }
  // }

    // Determine the winner
    let winner = null;
    if (team1Points > team2Points) {
      winner = teamStats[0].TEAM_NAME;
    } else if (team1Points < team2Points) {
      winner = teamStats[1].TEAM_NAME;
    }
    else
    {
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
