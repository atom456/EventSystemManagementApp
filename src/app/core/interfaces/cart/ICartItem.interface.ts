import { ICartSession } from './ICartSession.interface';

export interface ICartItem {
  title: string;
  sessions: {
    [sessionId: string]: ICartSession;
  };
}
