import React from 'react';
import { TableRow } from './tableRow';
import './Table.css';

export function Table({ users }) {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Group</th>
        <th>Phone</th>
      </tr>
      {users.map((user) => <TableRow user={user} key={user.id} />)}
    </table>
  );
}
