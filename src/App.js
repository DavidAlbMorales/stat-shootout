import React, { useState } from 'react';
import './App.css';
import nbaTeams from './nbaTeams.js'; // Import the NBA teams data
import TeamStatsData from './TeamStats.js'; // Import the TeamStatsData component

function App() {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamStats, setTeamStats] = useState(null); // State to hold team statistics

  const handleDrop = (event) => {
    event.preventDefault();
    const teamName = event.dataTransfer.getData('teamName');
    setSelectedTeams([...selectedTeams, teamName]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sendSelectedTeams = () => {
    console.log('Sending selected teams:', selectedTeams);
  
    fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedTeams })
    })
    .then(response => {
      if (response.ok) {
        console.log('Selected teams sent successfully!');
        return response.json(); // Parse response body as JSON
      } else {
        throw new Error('Failed to send selected teams');
      }
    })
    .then(data => {
      console.log('Received data from backend:', data);
      setTeamStats(data.team_stats); // Set teamStats state with the received data
    })
    .catch(error => {
      console.error('Error sending selected teams:', error);
      // Handle error
    });
  };

  return (
    <div>
      <h1>NBA Team Statistics</h1>
      <div className="team-container" onDrop={handleDrop} onDragOver={handleDragOver}>
        {/* Render NBA team logos with drag and drop support */}
        {nbaTeams.map((team) => (
          <img
            key={team.name}
            src={team.image}
            alt={team.name}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('teamName', team.abbreviation)}
          />
        ))}
      </div>
      {/* Display selected teams */}
      <div>
        <h2>Selected Teams:</h2>
        <ul>
          {selectedTeams.map((team, index) => (
            <li key={index}>{team}</li>
          ))}
        </ul>
        {/* Button to send selected teams to the server */}
        <button onClick={sendSelectedTeams}>Send Selected Teams</button>
      </div>
      {/* Render TeamStatsData component with teamStats data */}
      {teamStats && <TeamStatsData teamStats={teamStats} />}
    </div>
  );
}

export default App;
