import React, { useContext } from 'react';
import { Group } from './group';
import { GroupsContext } from '../../providers';
import './Groups.css';

export function Groups({ users }) {
  const groupsArray = useContext(GroupsContext);

  const sortedByGroups = groupsArray
    .map((group) => (
      <Group displayGroup={group} displayUsers={users.filter((user) => user.group === group)} />
    ));

  return (
    <div className="groups-container">
      {sortedByGroups}
    </div>
  );
}
