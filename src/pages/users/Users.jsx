import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './Users.css';
import debounce from 'lodash.debounce';
import { Cards, Table } from '../../components';

const URL = 'https://fakerapi.it/api/v1/persons?_seed=123456&_quantity=300';

const groupMapping = {
  0: 'CDN/Managers',
  1: 'CDN/Finantials',
  2: 'CDN/Human Resources',
  3: 'Unmanaged',
};

const viewMapping = {
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
  const debouncedResults = useMemo(() => debounce(handleSearch, 300), []);
  useEffect(() => () => debouncedResults.cancel());

  const handleSelect = (e) => setView(e.target.value);

  const displayView = viewMapping[view](displayUsers);

  return (
    <div className="users-container">
      <div className="header">
        <input type="text" placeholder="Search" className="user-search" onChange={debouncedResults} />
        <label htmlFor="view-selector" className="view-label">
          Select View:
          <select name="view" id="view-selector" className="view-selector" onChange={handleSelect} value={view}>
            <option value="cards">Cards</option>
            <option value="table">Table</option>
          </select>
        </label>
      </div>
      <div className="data-container">
        {(users) ? displayView : <div>loading</div>}
      </div>
    </div>
  );
}
