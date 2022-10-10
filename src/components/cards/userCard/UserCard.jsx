import React from 'react';
import './UserCard.css';

export function UserCard({ user }) {
  const {
    name, group, phone,
  } = user;

  return (
    <li className="user-card">
      <h2 className="name">{name}</h2>
      <p className="group">{group}</p>
      <p className="phone">{phone}</p>
    </li>
  );
}
