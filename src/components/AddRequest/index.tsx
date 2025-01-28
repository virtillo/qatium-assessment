import { useState } from 'react';
import { calculateDuration, isValidDate } from '../../utils.tsx';
import { User } from '../../interfaces.tsx';

import './AddRequest.scss';

interface AddRequestType {
  users: User[];
  nextRequestId: number;
  onRequestAdded: Function;
}

interface formStateType {
  requesterId: number | string;
  childCareWorkerId: number | string;
  date: string;
  timeHours: string;
  timeMins: string;
  durationHours: string;
  durationMins: string;
  description: string;
}

export default function AddRequest({users, nextRequestId, onRequestAdded}: AddRequestType) {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [requestAdded, setRequestAdded] = useState(false);

  const [formState, setFormState] = useState<formStateType>({
    requesterId: users && users[0] && users[0].id,
    childCareWorkerId: users && users[0] && users[0].id, 
    date: '',
    timeHours: '00',
    timeMins: '00',
    durationHours: '0',
    durationMins: '0',
    description: '',
  })

  function validateForm() {
    if (parseInt(formState.requesterId as string) === parseInt(formState.childCareWorkerId as string)) {
      setShowErrorMessage(true);
      setErrorMessage('Requester can not be the same than child care worker.');
      return false;
    }
    
    if (!isValidDate(formState.date)) {
      setShowErrorMessage(true);
      setErrorMessage('Please type a valid date in the requested format (DD/MM/YYYY).');
      return false;
    }

    if (formState.durationHours === '0' && formState.durationMins === '0') {
      setShowErrorMessage(true);
      setErrorMessage('Please make sure you add a duration');
      return false;
    }  
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateForm();

    if (validateForm()) {
      let newRequest = {
        id: nextRequestId,
        requesterId: parseInt(formState.requesterId as string),
        childCareWorkerId: parseInt(formState.childCareWorkerId as string), 
        date: formState.date,
        time: `${formState.timeHours}:${formState.timeMins}`,
        duration: calculateDuration(formState.durationHours, formState.durationMins),
        description: formState.description,
      }

      setShowErrorMessage(false);
      setRequestAdded(true);
      
      onRequestAdded(newRequest);
      setTimeout(() => {
        setRequestAdded(false);
      }, 2000);

      setFormState({
        requesterId: users[0].id,
        childCareWorkerId: users[0].id, 
        date: '',
        timeHours: '00',
        timeMins: '00',
        durationHours: '0',
        durationMins: '0',
        description: '',
      })
    }
  }

  function onChangeFormInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();

    const { name, value }: (EventTarget & HTMLInputElement) | (EventTarget & HTMLSelectElement) = e.target;
    
    setFormState((formState) => ({
      ...formState,
      [name]: value
    }));
  }

  return (
    <div className="add-request">
      {
        !showRequestForm ?
        <button type="button" onClick={()=>setShowRequestForm(true)}>Add a new child-care request</button>
        : (
          <>
            <h4>Add new request</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="requesterId">Requester: </label>
                <select name="requesterId" value={formState.requesterId} onChange={onChangeFormInput}>
                  {
                    users.map((user: User)=>(
                      <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="childCareWorkerId">Child care worker: </label>
                <select name="childCareWorkerId" value={formState.childCareWorkerId} onChange={onChangeFormInput}>
                  {
                    users.map((user: User)=>(
                      <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="date">Date: </label>
                <input type="text" name="date" value={formState.date} placeholder="DD/MM/YYYY" onChange={onChangeFormInput}></input>
              </div>
              <div>
                <label htmlFor="time">Time: </label>
                <select name="timeHours" value={formState.timeHours} onChange={onChangeFormInput}>
                  {
                    [...Array(24)].map((e, i) => (
                      <option key={i} value={i > 9 ? i : `0${i}`}>{i > 9 ? i : `0${i}`}</option>
                    ))
                  }
                </select>
                <select name="timeMins" value={formState.timeMins} onChange={onChangeFormInput}>
                  {
                    [...Array(60)].map((e, i) => (
                      <option key={i} value={i > 9 ? i : `0${i}`}>{i > 9 ? i : `0${i}`}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="durationHours">Duration (hours): </label>
                <select name="durationHours" value={formState.durationHours} onChange={onChangeFormInput}>
                  {
                    [...Array(12)].map((e, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="durationMins">Duration (mins): </label>
                <select name="durationMins" value={formState.durationMins} onChange={onChangeFormInput}>
                  {
                    [...Array(60)].map((e, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="description">Description </label>
                <input type="text" name="description" value={formState.description} onChange={onChangeFormInput}></input>
              </div>
              <div>
                { showErrorMessage && <p className="error-message">{errorMessage}</p> }
              </div>
                <button type="submit">Add</button>
                <button type="button" onClick={()=>setShowRequestForm(false)}>Cancel</button>
          </form>
          { requestAdded && <h4 className='success-message'>Request Added Successfully</h4> }
          </>
        )
      }
    </div>
  );
}