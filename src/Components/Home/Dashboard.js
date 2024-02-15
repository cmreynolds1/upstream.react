import React from 'react';
import './Dashboard.css'
import { Heading } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { show } from './ShowFunc';

function Dashboard () {
  const navigate = useNavigate();

  return (
    <div id="mainpage">
      <div className="container">
      <Heading level={4} id="Upstreamtitle"> Upstream </Heading>
      </div>
      <table id="games-list">
        <tbody>
          <tr className="gameheader">
            <th>#</th>
            <th>Game Cover</th>
            <th>Title</th>
            <th>Achievement%</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>

          <tr className="game-row">
            <td className="game-number">1</td>
            <td><img className="gamepic" img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Hades_cover_art.jpg/220px-Hades_cover_art.jpg"
              alt="Hades"></img></td>
            <td>Hades</td>
            <td>6%</td>
            <td>N/A</td>
            <td>Currently Playing</td>
          </tr>

          <tr className="game-row" data-status="on-hold">
            <td className="game-number">2</td>
            <td><img className="gamepic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/1200px-Celeste_box_art_full.png"
              alt="Celeste"></img></td>
            <td>Celeste</td>
            <td>100%</td>
            <td>10/10</td>
            <td>On Hold</td>
          </tr>

          <tr className="game-row" data-status="dropped">
            <td className="game-number">3</td>
            <td><img className="gamepic" src="https://upload.wikimedia.org/wikipedia/en/6/6d/Bethesda_Starfield.jpg"
              alt="Starfield"></img>
            </td>
            <td>Starfield</td>
            <td>32%</td>
            <td>N/A</td>
            <td>Quit Playing</td>
          </tr>

          <tr className="game-row" data-status="planning">
            <td className="game-number">4</td>
            <td><img className="gamepic" src="https://upload.wikimedia.org/wikipedia/en/8/85/Tunic_cover_art.jpg" alt="Tunic"></img>
            </td>
            <td>Tunic</td>
            <td>7%</td>
            <td>N/A</td>
            <td>Planning to Play</td>
          </tr>

          <tr className="game-row" data-status="completed">
            <td className="game-number">5</td>
            <td><img className="gamepic" src="https://upload.wikimedia.org/wikipedia/en/d/de/Lies_of_p_cover_art.jpg"
              alt="Lies of P"></img>
            </td>
            <td>Lies of P</td>
            <td>100%</td>
            <td>10/10</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
      <table id="footer">
        <th><a href="#" onClick={() => show('all')}>All Games Played</a></th>
        <th><a href="#" onClick={() => show('completed')}>Completed Games</a></th>
        <th><a href="#" onClick={() => show('planning')}>Games Up Next</a></th>
        <th><a href="#" onClick={() => show('currently-playing')}>Currently Playing</a></th>
        <th><a href="#" onClick={() => show('on-hold')}>Games On Hold</a></th>
        <th><a href="#" onClick={() => show('dropped')}>Games/Dropped Quit</a></th>
      </table>
    </div>
  )
}
export default Dashboard;