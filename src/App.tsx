import { useState } from 'react'
import { UserList } from './component/User/User';
import { useFetchData } from './hook/fetch';
import './App.css'
import { userData } from './data/data';

const App: React.FC = () => {
  const { users, error } = useFetchData();

  return (
    <div>
      <UserList
        users={users}
        error={error}
        />
    </div>
  );
};

export default App;
