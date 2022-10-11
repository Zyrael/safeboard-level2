import React from 'react';

export function TableRow({ user }) {
  const {
    name, email, group, phone,
  } = user;

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{group}</td>
      <td>{phone}</td>
    </tr>
  );
}
