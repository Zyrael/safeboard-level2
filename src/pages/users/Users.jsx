import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';
import './Users.css';
import debounce from 'lodash.debounce';
import { Cards, Table } from '../../components';
import { ReactComponent as LoadingSVG } from './images/loading.svg';

const URL = 'https://fakerapi.it/api/v1/persons?_seed=123456&_quantity=1000';

const groupMapping = {
  0: 'CDN/Managers',
  1: 'CDN/Finantials',
  2: 'CDN/Human Resources',
  3: 'Unmanaged',
};

const getSortedUsers = {
  default: (users) => users,
  name: (users) => sortBy(users, (user) => user.name),
};

const getUsersView = {
  cards: (displayUsers) => <Cards users={displayUsers} />,
  table: (displayUsers) => <Table users={displayUsers} />,
};

const mapUsers = ({
  id, firstname, lastname, email, phone,
}) => {
  const name = firstname.concat(` ${lastname}`);
  const group = groupMapping[Math.floor(Math.random() * 4)];
  return {
    id, name, email, group, phone,
  };
};

export function Users() {
  const [users, setUsers] = useState(null);
  const [searchField, setSearchField] = useState('');
  const [view, setView] = useState('cards');
  const [sorter, setSorter] = useState('default');
  let displayUsers = users;

  useEffect(() => {
    axios.get(URL)
      .then(({ data: { data } }) => {
        const mappedUsers = data.map(mapUsers);
        setUsers(mappedUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSearch = (e) => setSearchField(e.target.value.toLowerCase());
  if (searchField) {
    displayUsers = users.filter((user) => user.name.toLowerCase().includes(searchField));
  }
  const debouncedResults = useMemo(() => debounce(handleSearch, 500), []);
  useEffect(() => () => debouncedResults.cancel());

  const handleView = (e) => setView(e.target.value);
  const handlesorter = (e) => setSorter(e.target.value);

  const sortedUsers = getSortedUsers[sorter](displayUsers);
  const displayView = getUsersView[view](sortedUsers);

  return (
    <div className="users-container">
      <div className="header">
        <input type="text" placeholder="Search" className="user-search" onChange={debouncedResults} />
        <label htmlFor="view-selector" className="selector-label view-label">
          Select View:
          <select name="view" id="view-selector" className="selector" onChange={handleView} value={view}>
            <option value="cards">Cards</option>
            <option value="table">Table</option>
          </select>
        </label>
        <label htmlFor="sort-selector" className="selector-label">
          Sort by:
          <select name="sort" id="sort-selector" className="selector" onChange={handlesorter} value={sorter}>
            <option value="default">Select</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div className="data-container">
        {(users) ? displayView : <div className="loading-container"><LoadingSVG className="loading" /></div>}
      </div>
    </div>
  );
}
