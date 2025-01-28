import { useState } from 'react';

import RequestsTable from './components/RequestsTable';
import BalanceList from './components/BalanceList';
import AddUser from './components/AddUser';
import AddRequest from './components/AddRequest';
import { compareDates } from './utils';

import { User, Request } from './interfaces';

import './App.css';


// TODO: testing, README, comment & clean

// ASYNC FUNCTION SIMULATING API CALL
// async function getUsers() {
//   const url = `https://localhost:8080/parents`;
//   const data = await fetch(url)
//   const initialUsers = await data.json();
//   setUsers(initialUsers);
// }


function App() {
  
  const initialUsers = [
    { id: 1, name: 'Ada', surname: 'Lovelace'},
    { id: 2, name: 'Alan', surname: 'Turing'},
    { id: 3, name: 'Ángela', surname: 'Ruiz Robles'},
    { id: 4, name: 'Hedy', surname: 'Lamarr'},
  ];

  const initialRequests = [
    { id: 1, requesterId: 1, childCareWorkerId: 2, date: '17/08/2020', time: '17:00', duration: 90, description: 'Ada had a work dinner' },
    { id: 2, requesterId: 2, childCareWorkerId: 3, date: '16/08/2020', time: '20:00', duration: 150, description: 'Alan goes to the movies' },
    { id: 3, requesterId: 4, childCareWorkerId: 3, date: '16/08/2020', time: '15:00', duration: 90, description: '' },
    { id: 4, requesterId: 3, childCareWorkerId: 4, date: '15/08/2020', time: '18:30', duration: 120, description: '' },
  ];


  const [users, setUsers] = useState(initialUsers);
  const [nextUserId, setNextUserId] = useState(5);
  const [nextRequestId, setNextURequestId] = useState(5);
  const [requests, setRequests] = useState(initialRequests);

  function onUserAdded(newUser: User) {

    setUsers([
      ...users,
      newUser,
    ]);

    setNextUserId(nextUserId+1);
  }

  function onRequestAdded(newRequest: Request) {
    
    setRequests([
      ...requests,
      newRequest,
    ]);

    setNextURequestId(nextRequestId+1);
  }

  return (
    <>

      <h1>Qatium - Child Care App</h1>
      
      <RequestsTable list={requests.sort(compareDates)} users={users} />

      <AddRequest users={users} nextRequestId={nextRequestId} onRequestAdded={onRequestAdded} />

      <AddUser nextUserId={nextUserId} onUserAdded={onUserAdded}/>

      <BalanceList requests={requests} users={initialUsers} />

    </>
  )
}

export default App
