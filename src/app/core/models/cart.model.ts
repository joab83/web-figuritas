import { Sticker } from './sticker.model';

export interface CartCustomer {
  phone: string;
  name: string;
}

export interface CartItem {
  sticker: Sticker;
  quantity: number;
}
