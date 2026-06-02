import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartItem } from '../../../../core/models/cart.model';
import { CreateOrderRequest } from '../../../../core/models/order.model';
import { Sticker } from '../../../../core/models/sticker.model';
import { CartService } from '../../../../core/services/cart.service';
import { OrdersApiService } from '../../../../core/services/orders-api.service';
import { RuntimeConfigService } from '../../../../core/services/runtime-config.service';
import { formatStickerSku, getGroupName } from '../../../../core/utils/sticker-formatters';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  readonly cart = inject(CartService);
  private readonly ordersApi = inject(OrdersApiService);
  private readonly router = inject(Router);
  private readonly runtimeConfig = inject(RuntimeConfigService);
  readonly isSubmitting = signal(false);
  readonly submitError = signal('');
  readonly createdOrderId = signal<number | null>(null);
  readonly confirmedItems = signal<CartItem[]>([]);
  readonly confirmedTotalItems = signal(0);
  readonly confirmedSubtotal = signal(0);
  customerName = this.cart.customer()?.name ?? '';
  notes = '';

  imageUrl(sticker: Sticker): string {
    const imageSku = sticker.sku.replace(/^([A-Za-z]+)(\d+)$/, '$1_$2');
    return `/images/stickers/${imageSku}_${sticker.id_album}.jpg`;
  }

  submitOrder(): void {
    const customer = this.cart.customer();
    if (!customer || !this.cart.items().length || this.isSubmitting()) {
      return;
    }

    const whatsappWindow = window.open('', '_blank');
    const order: CreateOrderRequest = {
      nombre: this.customerName.trim(),
      numero_telefono: customer.phone,
      comentario: this.notes.trim(),
      stickers: this.cart.items().map(({ sticker, quantity }) => ({
        id_album: sticker.id_album,
        sku: sticker.sku,
        cantidad: quantity
      }))
    };

    this.isSubmitting.set(true);
    this.submitError.set('');

    this.ordersApi.create(order).subscribe({
      next: ({ id_pedido }) => {
        this.confirmedItems.set(this.cart.items());
        this.confirmedTotalItems.set(this.cart.totalItems());
        this.confirmedSubtotal.set(this.cart.subtotal());
        this.createdOrderId.set(id_pedido);
        this.isSubmitting.set(false);
        const whatsappUrl = this.buildWhatsappUrl(id_pedido);
        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappUrl;
        } else {
          window.location.href = whatsappUrl;
        }
      },
      error: () => {
        whatsappWindow?.close();
        this.isSubmitting.set(false);
        this.submitError.set('No pudimos registrar el pedido. Intentá nuevamente.');
      }
    });
  }

  startNewOrder(): void {
    this.cart.clear();
    this.router.navigateByUrl('/');
  }

  clearConfirmedOrder(): void {
    if (this.createdOrderId()) {
      this.cart.clear();
    }
  }

  private buildWhatsappUrl(orderId: number): string {
    const customerName = this.customerName.trim() || 'Sin nombre';
    const stickerLines = this.cart.items().map(({ sticker, quantity }) =>
      `• ${formatStickerSku(sticker.sku)} x${quantity} · ${getGroupName(sticker.grupo)} · ${sticker.nombre} · ${this.formatPrice(sticker.precio * quantity)}`
    );
    const message = [
      'Hola! Reservo:',
      ...stickerLines,
      `Total ${this.cart.totalItems()} figuritas — ${this.formatPrice(this.cart.subtotal())}`,
      `Cliente: (${customerName}) El pedido será validado por un admin antes de confirmar.`,
      `ID de pedido: ${orderId}`
    ].join('\n');

    return this.runtimeConfig.getWhatsappUrl(message);
  }

  private formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }
}
