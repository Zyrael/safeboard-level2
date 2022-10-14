import React from 'react';
import { TableRow } from './tableRow';
import './Table.css';

export function Table({ users }) {
  return (
    <table>
      <tr>
        <th width="25%">Name</th>
        <th width="25%">Email</th>
        <th width="25%">Group</th>
        <th width="25%">Phone</th>
      </tr>
      {users.map((user) => <TableRow user={user} key={user.id} />)}
    </table>
  );
}
