import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { orderBy } from 'lodash';
import './Users.css';
import debounce from 'lodash.debounce';
import { Cards, Table, Groups } from '../../components';
import { GroupsContext } from '../../providers';
import { ReactComponent as LoadingSVG } from './images/loading.svg';

const URL = 'https://fakerapi.it/api/v1/persons?_quantity=1000';

const getSortedUsers = {
  default: (users) => users,
  name: (users, order) => orderBy(users, ['name'], [order]),
  email: (users, order) => orderBy(users, ['email'], [order]),
};

const getUsersView = {
  cards: (displayUsers) => <Cards users={displayUsers} />,
  table: (displayUsers) => <Table users={displayUsers} />,
  groups: (displayUsers) => <Groups users={displayUsers} />,
};

const groupsArray = ['CDN/Managers', 'CDN/Finantials', 'CDN/Human Resources', 'Software Developer', 'Product Manager', 'Unmanaged'];

const mapUsers = ({
  id, firstname, lastname, email, phone,
}) => {
  const name = firstname.concat(` ${lastname}`);
  const group = groupsArray[Math.floor(Math.random() * 6)];
  return {
    id, name, email, group, phone,
  };
};

export function Users() {
  const [users, setUsers] = useState(null);
  const [searchField, setSearchField] = useState('');
  const [view, setView] = useState('cards');
  const [sorter, setSorter] = useState('default');
  const [order, setOrder] = useState('asc');
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
    displayUsers = users.filter((user) => (
      user.name.toLowerCase().includes(searchField)
   || user.email.toLowerCase().includes(searchField)
   || user.phone.toLowerCase().includes(searchField)));
  }
  const debouncedResults = useMemo(() => debounce(handleSearch, 500), []);
  useEffect(() => () => debouncedResults.cancel());

  const handleView = (e) => setView(e.target.value);
  const handlesorter = (e) => setSorter(e.target.value);
  const handleOrder = () => setOrder((order === 'asc') ? 'desc' : 'asc');

  const sortedUsers = getSortedUsers[sorter](displayUsers, order);
  const displayView = getUsersView[view](sortedUsers);

  const arrowButtonClasses = (order === 'asc') ? 'order-button' : 'order-button down';

  return (
    <div className="users-container">
      <div className="header">
        <input type="text" placeholder="Search" className="user-search" onChange={debouncedResults} />
        <fieldset className="view-choose" onChange={handleView}>
          <legend>Select View:</legend>
          <div className="view-radios-container">
            <label htmlFor="cards" className="view-label">
              <input type="radio" name="view" id="cards" value="cards" checked={view === 'cards'} />
              <span>Cards</span>
            </label>
            <label htmlFor="table" className="view-label">
              <input type="radio" name="view" id="table" value="table" checked={view === 'table'} />
              <span>Table</span>
            </label>
            <label htmlFor="groups" className="view-label">
              <input type="radio" name="view" id="groups" value="groups" checked={view === 'groups'} />
              <span>Groups</span>
            </label>
          </div>
        </fieldset>
        <label htmlFor="sort" className="selector-label">
          Sort by:
          <select name="sort" id="sort-selector" className="selector" onChange={handlesorter} value={sorter}>
            <option value="default">None</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </label>
        <button type="button" className={arrowButtonClasses} onClick={handleOrder}><span className="arrow">&uarr;</span></button>
      </div>
      <GroupsContext.Provider value={groupsArray}>
        <div className="data-container">
          {(users) ? displayView : <div className="loading-container"><LoadingSVG className="loading" /></div>}
        </div>
      </GroupsContext.Provider>
    </div>
  );
}
