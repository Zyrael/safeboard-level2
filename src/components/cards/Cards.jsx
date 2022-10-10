import React from 'react';
import { UserCard } from './userCard';
import './Cards.css';

export function Cards({ users }) {
  return (
    <ul className="cards">
      {users.map((user) => <UserCard user={user} key={user.id} />)}
    </ul>
  );
}
