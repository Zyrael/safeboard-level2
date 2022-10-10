import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './Users.css';
import debounce from 'lodash.debounce';
import { Cards } from '../../components';

const getGroup = {
  0: 'CDN/Managers',
  1: 'CDN/Finantials',
  2: 'CDN/Human Resources',
  3: 'Unmanaged',
};

export function Users() {
  const [users, setUsers] = useState(null);
  const [searchField, setSearchField] = useState('');
  let displayUsers = users;

  useEffect(() => {
    axios.get('https://fakerapi.it/api/v1/persons?_seed=123456&_quantity=300')
      .then(({ data: { data } }) => {
        const mappedUsers = data
          .map(({ firstname, lastname, phone }) => {
            const name = firstname.concat(` ${lastname}`);
            const group = getGroup[Math.floor(Math.random() * 4)];
            return { name, group, phone };
          });
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

  const cards = <Cards users={displayUsers} />;

  return (
    <div className="users-container">
      <input type="text" placeholder="Search" className="user-search" onChange={debouncedResults} />
      {(users) ? cards : <div>loading</div>}
    </div>
  );
}
