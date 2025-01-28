import { Request, User } from './interfaces';

export function getUserName(userId: number, users: User[]) {
  let fullName = '';
  users.map((u: User)=>{
    if (u.id === userId) fullName = u.name + ' ' + u.surname;
  })
   return fullName;
}

export function formatDuration(duration: number) {
  const absoluteDuration = duration >= 0 ? duration : duration * -1;
  const hours = Math.floor(absoluteDuration / 60);          
  const minutes = absoluteDuration % 60;
  let durationFormatted = duration >= 0 ? '' : '-';

  if (hours > 0) durationFormatted += `${hours}h `;
  if (minutes > 0) durationFormatted += `${minutes}m `;
  
  return durationFormatted;
}

export function calculateDuration(hours: string, mins:string) {
  return 60 * parseInt(hours, 10) + parseInt(mins, 10);
}

export function isValidDate(dateString: string) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if ( isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
  }

  if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return false;
  }

  if (month === 2) { // Check for leap year
      const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
      if (day > 29 || (day === 29 && !isLeap)) {
          return false;
      }
  }

  return true;
}

function formattedMonth(month: number) {
  switch (month) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return 'Jan';
  }
}

export function compareDates(a: Request,b: Request) {
    const parts1 = a.date.split("/");
    const day1 = parseInt(parts1[0], 10);
    const month1 = parseInt(parts1[1], 10);
    const year1 = parseInt(parts1[2], 10);

    const parts2 = b.date.split("/");
    const day2 = parseInt(parts2[0], 10);
    const month2 = parseInt(parts2[1], 10);
    const year2 = parseInt(parts2[2], 10);
    
    const dateTime1 = Date.parse(`${day1} ${formattedMonth(month1)} ${year1} ${a.time}:00 GMT`);
    const dateTime2 = Date.parse(`${day2} ${formattedMonth(month2)}  ${year2} ${b.time}:00 GMT`);

    return dateTime1 < dateTime2 ? -1 : 1;
  }

export function calculateBalance(requests: Request[]) {
  let netBalances : {[key: string]: number;} = {};

  requests.forEach((request: Request) => {
    // Deduct from sender (negative balance)
    netBalances[request.requesterId] = (netBalances[request.requesterId] || 0) - request.duration;
    
    // Add to receiver (positive balance)
    netBalances[request.childCareWorkerId] = (netBalances[request.childCareWorkerId] || 0) + request.duration;
  
  });
  
  return netBalances;
}

export function settleBalance(netBalances: {[key: string]: number;}) {
  const creditors: { party: string; amount: number; }[] = [];
  const debtors: { party: string; amount: number; }[] = [];

  Object.keys(netBalances).forEach(party => {
    const balance = netBalances[party];
    if (balance > 0) creditors.push({ party, amount: balance });
    else if (balance < 0) debtors.push({ party, amount: Math.abs(balance) });
  });

  // Step 3: Resolve debts by matching creditors and debtors
  let settlements = [];
  
  while (creditors.length > 0 && debtors.length > 0) {
    let creditor = creditors[0];
    let debtor = debtors[0];

    // Determine the minimum amount to settle
    const paymentAmount = Math.min(creditor.amount, debtor.amount);

    // Record the settlement (debtor pays creditor)
    settlements.push({
      from: debtor.party,
      to: creditor.party,
      amount: paymentAmount
    });

    // Update the amounts after the transaction
    creditor.amount -= paymentAmount;
    debtor.amount -= paymentAmount;

    // Remove creditor or debtor if their balance is fully settled
    if (creditor.amount === 0) creditors.shift();
    if (debtor.amount === 0) debtors.shift();
  }

  return settlements;
}
