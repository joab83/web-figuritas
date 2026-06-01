import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Sticker } from '../../../../core/models/sticker.model';

@Component({
  selector: 'app-sticker-card',
  imports: [CurrencyPipe],
  templateUrl: './sticker-card.component.html',
  styleUrl: './sticker-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickerCardComponent {
  readonly sticker = input.required<Sticker>();
  readonly availableStock = input.required<number>();
  readonly reserve = output<Sticker>();

  get imageUrl(): string {
    const sticker = this.sticker();
    const imageSku = sticker.sku.replace(/^([A-Za-z]+)(\d+)$/, '$1_$2');
    return `/images/stickers/${imageSku}_${sticker.id_album}.jpg`;
  }

  hideMissingImage(event: Event): void {
    (event.target as HTMLImageElement).hidden = true;
  }
}
