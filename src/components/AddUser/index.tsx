import { useState } from 'react';

import './AddUser.scss';

interface AddUserType {
  nextUserId: number;
  onUserAdded: Function;
}

export default function AddUser({nextUserId, onUserAdded}: AddUserType) {
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userAdded, setuserAdded] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  function handleAddClick() {
    onUserAdded({id: nextUserId, name: userName, surname: userSurname});
    setUserName('');
    setUserSurname('');
    setuserAdded(true);
    setTimeout(() => {
      setuserAdded(false);
    }, 2000);
  }


  return (
    <div className="add-user">
      {
        !showAddUserForm ?
        <button type="button" onClick={()=>setShowAddUserForm(true)}>Add a new user</button>
        : (
        <>
          <h2>Add User</h2>
          <div>
            <label htmlFor="user_name">User Name: </label>
            <input type="text" name="user_name" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="user_surname">User Surname: </label>
            <input type="text" name="user_surname" value={userSurname} onChange={(e)=>setUserSurname(e.target.value)}/>
          </div>
          <button type="button" onClick={handleAddClick} disabled={!userName || !userSurname}>Add</button>
          <button type="button" onClick={()=>setShowAddUserForm(false)}>Cancel</button>
          { userAdded && <h4 className="success-message">User Added Successfully</h4> }
        </> )
      }
    </div>
  );
}