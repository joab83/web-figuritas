import { computed, Injectable, signal } from '@angular/core';
import { CartCustomer, CartItem } from '../models/cart.model';
import { Sticker } from '../models/sticker.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly customer = signal<CartCustomer | null>(null);
  readonly items = signal<CartItem[]>([]);
  readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((total, item) => total + item.sticker.precio * item.quantity, 0));

  availableStock(sticker: Sticker): number {
    const reservedQuantity = this.items().find((item) => item.sticker.sku === sticker.sku)?.quantity ?? 0;
    return Math.max(sticker.disponible - reservedQuantity, 0);
  }

  setCustomer(customer: CartCustomer): void {
    this.customer.set(customer);
  }

  add(sticker: Sticker): void {
    this.items.update((items) => {
      const current = items.find((item) => item.sticker.sku === sticker.sku);
      if (!current) {
        return [...items, { sticker, quantity: 1 }];
      }

      if (current.quantity >= sticker.disponible) {
        return items;
      }

      return items.map((item) => item === current ? { ...item, quantity: item.quantity + 1 } : item);
    });
  }

  decrease(sticker: Sticker): void {
    this.items.update((items) => items
      .map((item) => item.sticker.sku === sticker.sku ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0));
  }

  remove(sticker: Sticker): void {
    this.items.update((items) => items.filter((item) => item.sticker.sku !== sticker.sku));
  }

  clear(): void {
    this.customer.set(null);
    this.items.set([]);
  }
}
