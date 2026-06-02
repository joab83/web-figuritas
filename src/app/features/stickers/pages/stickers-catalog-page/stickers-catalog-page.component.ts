import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Album } from '../../../../core/models/album.model';
import { CartCustomer } from '../../../../core/models/cart.model';
import { Sticker } from '../../../../core/models/sticker.model';
import { AlbumsApiService } from '../../../../core/services/albums-api.service';
import { CartService } from '../../../../core/services/cart.service';
import { RuntimeConfigService } from '../../../../core/services/runtime-config.service';
import { StickersApiService } from '../../../../core/services/stickers-api.service';
import { ReservationModalComponent } from '../../../cart/components/reservation-modal/reservation-modal.component';
import { StickerCardComponent } from '../../components/sticker-card/sticker-card.component';
import { StickerFiltersComponent } from '../../components/sticker-filters/sticker-filters.component';

@Component({
  selector: 'app-stickers-catalog-page',
  imports: [RouterLink, ReservationModalComponent, StickerCardComponent, StickerFiltersComponent],
  templateUrl: './stickers-catalog-page.component.html',
  styleUrl: './stickers-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickersCatalogPageComponent {
  private readonly albumId = 1;
  private readonly albumsApi = inject(AlbumsApiService);
  readonly cart = inject(CartService);
  readonly runtimeConfig = inject(RuntimeConfigService);
  private readonly stickersApi = inject(StickersApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  readonly stickers = signal<Sticker[]>([]);
  readonly groups = signal<string[]>([]);
  readonly album = signal<Album | null>(null);
  readonly searchTerm = signal('');
  readonly selectedGroup = signal('');
  readonly onlyAvailable = signal(false);
  readonly onlyFeatured = signal(false);
  readonly isLoading = signal(true);
  readonly hasError = signal(false);
  readonly pendingSticker = signal<Sticker | null>(null);

  readonly filteredStickers = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();
    return this.stickers()
      .filter((sticker) =>
        !searchTerm ||
        sticker.sku.toLocaleLowerCase().includes(searchTerm) ||
        sticker.nombre.toLocaleLowerCase().includes(searchTerm)
      )
      .filter((sticker) => !this.selectedGroup() || sticker.grupo === this.selectedGroup())
      .filter((sticker) => !this.onlyAvailable() || this.cart.availableStock(sticker) > 0)
      .filter((sticker) => !this.onlyFeatured() || sticker.destacada)
      .sort((first, second) => this.collator.compare(first.sku, second.sku));
  });

  readonly availableCount = computed(() => this.stickers().filter((sticker) => this.cart.availableStock(sticker) > 0).length);

  constructor() {
    this.loadAlbum();
    this.loadGroups();
    this.loadStickers();
  }

  loadAlbum(): void {
    this.albumsApi.getById(this.albumId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (album) => this.album.set(album),
        error: () => this.album.set(null)
      });
  }

  refreshCatalog(): void {
    this.loadAlbum();
    this.loadGroups();
    this.loadStickers();
  }

  loadGroups(): void {
    this.stickersApi.getGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (groups) => this.groups.set(groups),
        error: () => this.groups.set([])
      });
  }

  loadStickers(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.stickersApi.getByAlbum(this.albumId)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (stickers) => this.stickers.set(stickers),
        error: () => this.hasError.set(true)
      });
  }

  reserve(sticker: Sticker): void {
    if (!this.cart.customer()) {
      this.pendingSticker.set(sticker);
      return;
    }

    this.cart.add(sticker);
  }

  completeCustomer(customer: CartCustomer): void {
    this.cart.setCustomer(customer);
    const pendingSticker = this.pendingSticker();
    if (pendingSticker) {
      this.cart.add(pendingSticker);
    }
    this.pendingSticker.set(null);
  }
}
