import React, { useState } from 'react';
import './App.css';
import nbaTeams from './nbaTeams.js'; // Import the NBA teams data

function App() {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const teamName = event.dataTransfer.getData('teamName');
    setSelectedTeams([...selectedTeams, teamName]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sendSelectedTeams = () => {
    // Log the data before sending
    console.log('Sending selected teams:', selectedTeams);
  
    // Make an HTTP POST request to the backend server
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
        // Optionally, you can handle success actions here
      } else {
        throw new Error('Failed to send selected teams');
      }
    })
    .catch(error => {
      console.error('Error sending selected teams:', error);
      // Optionally, you can handle error actions here
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
      {/* Other components can be added here */}
    </div>
  );
}

export default App;
