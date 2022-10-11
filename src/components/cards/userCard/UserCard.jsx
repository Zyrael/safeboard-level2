import React from 'react';
import './UserCard.css';
import { ReactComponent as UserSVG } from './images/user.svg';

export function UserCard({ user }) {
  const {
    name, group, phone,
  } = user;

  return (
    <li className="user-card">
      <h2 className="name">{name}</h2>
      <UserSVG className="user-picture" />
      <p className="group">{group}</p>
      <p className="phone">{phone}</p>
    </li>
  );
}
