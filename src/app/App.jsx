import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { Main, Users } from '../pages';

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}
