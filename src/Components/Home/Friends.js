import React from 'react';
import './Dashboard.css'
import { Heading } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { show } from './ShowFunc';

function Friends() {
  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            <img src={friend.profilePicture} alt={friend.username} />
            <span>{friend.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
export default Friends;
