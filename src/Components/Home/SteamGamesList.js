import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Heading } from '@aws-amplify/ui-react';

const ITEMS_PER_PAGE = 10;

function SteamGamesList() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [achievements, setAchievements] = useState({});
  const [userSteamId, setUserSteamId] = useState(null);
  const apiKey = '94A07FD5B1267700D27D6D2B3CF9583C';

  //FIRST useEffect

  useEffect(() => {
    const fetchGames = async (steamId) => {
      try {
        const response = await fetch(`/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1`);
        const data = await response.json();
        setGames(data.response.games);
        setTotalPages(Math.ceil(data.response.games.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const fetchSteamId = async () => {
      try {
        const attributes = await fetchUserAttributes();
        console.log('User attributes:', attributes);
        const steamId = attributes['custom:SteamID']; // Access the SteamID directly
        if (steamId) {
          setUserSteamId(steamId);
          fetchGames(steamId);
        }
      } catch (error) {
        console.error('Error fetching SteamID: ', error);
      }
    };
    fetchSteamId();
  }, []);

  const fetchAchievements = async (steamId, appId) => {
    try {
      console.log(`Fetching achievements for appid=${appId} and steamid=${steamId}`);
      const response = await fetch(`/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`);
      const data = await response.json();
      if (response.ok && data.playerstats && data.playerstats.success) {
        setAchievements(prevAchievements => ({
          ...prevAchievements,
          [appId]: data.playerstats.achievements
        }));
      } else if (data.playerstats && data.playerstats.error) {
        setAchievements(prevAchievements => ({
          ...prevAchievements,
          [appId]: []
        }));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const filteredGames = statusFilter === 'all' || statusFilter === '' //Probs add statuses to filter
    ? games
    : games.filter((game) => game.status === statusFilter);

  //SECOND useEffect

  useEffect(() => {
    setTotalPages(Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  }, [filteredGames]);

  //THIRD useEffect

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value === 'all' ? '' : e.target.value);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const selectedGames = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div id="mainpage">
      <div className='container'>
        <Heading level={4} id="Upstreamtitle">Games Overview
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className='small-dropdown'
            style={{ position: 'absolute', marginLeft: 20, marginTop: 3, fontSize: 13 }}>

            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="planning">Up Next</option>
            <option value="currently-playing">Currently Playing</option>
            <option value="on-hold">On Hold</option>
            <option value="dropped">Dropped Quit</option>
          </select></Heading>
      </div>
      <table id="games-list">
        <tbody>
          <tr className='gameheader'>
            <th>#</th>
            <th>Game Logo</th>
            <th>Title</th>
            <th>Achievement%</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
          {selectedGames.map((game, index) => (
            <tr className='game-row' key={game.appid} data-status={game.status}>
              <td className='game-number'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>
                <img className='gamepic' src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} />
              </td>
              <td>{game.name}</td>
              <td>
                {achievements[game.appid] === undefined
                  ? <button onClick={() => fetchAchievements(userSteamId, game.appid)} className='small-button'>Show %</button>
                  : achievements[game.appid].length === 0
                    ? 'N/A'
                    : `${(achievements[game.appid].filter(a => a.achieved).length / achievements[game.appid].length * 100).toFixed(0)}%` //Change toFixed to whatever decimal place you guys want
                }
              </td>
              <td>{game.rating || 'N/A'}</td>
              <td>{game.statusText || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>Next</button>
        )}
      </div>
    </div>
  );
}

export default SteamGamesList;