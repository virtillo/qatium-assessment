import './RequestsList.scss';
import { getUserName, formatDuration } from '../../utils.tsx';
import { User, Request } from '../../interfaces.tsx';

interface RequestsTableType {
  list: Request[];
  users: User[];
} 

export default function RequestsTable({list, users}: RequestsTableType) {

  return (
    <>
      <h2>List of child care requests</h2>
      <div className='requests-table'>
        <div className='requests-table__row'>
          <div className='requests-table__datetime'>Date & Time</div>
          <div className='requests-table__requester'>Requester</div>
          <div className='requests-table__carer'>Child Care Worker</div>
          <div className='requests-table__description'>Description</div>
          <div className='requests-table__duration'>Duration</div>
        </div>
      {
        list.map((item) => (
          <div className='requests-table__row' key={item.id}>
            <div className='requests-table__datetime'>{item.date} {item.time}</div>
            <div className='requests-table__requester'>{ getUserName(item.requesterId, users) }</div>
            <div className='requests-table__carer'>{ getUserName(item.childCareWorkerId, users) }</div>
            <div className='requests-table__description'>{item.description}</div>
            <div className='requests-table__duration'>{ formatDuration(item.duration) }</div>
          </div>
        ))
      }
      </div>
    </>
  );
}