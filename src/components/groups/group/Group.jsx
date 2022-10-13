import React from 'react';
import './Group.css';

export function Group({ displayGroup, displayUsers }) {
  return (
    <div className="group-container">
      <h2 className="group-name">{displayGroup}</h2>
      <ul className="users-list">
        {displayUsers.map(({ id, name, email }) => (
          <li key={id} className="user">
            <p className="name">{name}</p>
            <p className="email">{email}</p>
          </li>
        ))}
      </ul>
    </div>

  );
}
