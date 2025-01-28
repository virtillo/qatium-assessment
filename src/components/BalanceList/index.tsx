import { useState } from 'react';
import { getUserName, calculateBalance, formatDuration, settleBalance } from '../../utils.tsx';
import { User, Request } from '../../interfaces.tsx';
import './BalanceList.scss';

interface BalanceListType {
  requests: Request[]; 
  users: User[];
} 

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export default function BalanceList({requests, users}: BalanceListType) {
  const balanceList = calculateBalance(requests);
  const [settlement, setSettlement] = useState<Settlement[]>([]);

  function handleClick() {
    let result = settleBalance(balanceList)
    setSettlement(result);
  }

  return (
    <>
      <h2>Balance</h2>
      <div className='balance-list'>
        {
          balanceList && Object.keys(balanceList).map((key) => {
            const className = balanceList[key] >= 0 ? 'pos' : 'neg';
            return (
              <h4 key={key}> 
                {getUserName(parseInt(key, 10), users)}: 
                <span className={className}> {formatDuration(balanceList[key])} </span>
              </h4>
            )
          })
        }
      </div>
      <div>
        <button type="button" onClick={handleClick}>Calculate Net Balance</button>
        {
          settlement && (
            <ul className="settlement-list">
              {
                settlement.map((item, i)=>
                  <li key={i}>{`${getUserName(parseInt(item.from, 10), users)} --> ${getUserName(parseInt(item.to, 10), users)} ${formatDuration(item.amount)}`}</li>
                )
              }
            </ul>
          )
        }
      </div>
    </>
  );
}