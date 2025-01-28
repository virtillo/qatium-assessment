export interface User {
  id: number;
  name: string;
  surname: string;
}
  
export interface Request {
  id: number;
  requesterId: number;
  childCareWorkerId: number;
  date: string;
  time: string;
  duration: number;
  description: string;
}