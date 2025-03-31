import { ICartItem } from './ICartItem.interface';

export interface ICartState {
  [eventId: string]: ICartItem;
}
