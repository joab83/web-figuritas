import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sticker-filters',
  templateUrl: './sticker-filters.component.html',
  styleUrl: './sticker-filters.component.scss'
})
export class StickerFiltersComponent {
  readonly searchTerm = input('');
  readonly groups = input<string[]>([]);
  readonly selectedGroup = input('');
  readonly onlyAvailable = input(false);
  readonly onlyFeatured = input(false);
  readonly searchTermChange = output<string>();
  readonly selectedGroupChange = output<string>();
  readonly onlyAvailableChange = output<boolean>();
  readonly onlyFeaturedChange = output<boolean>();

  updateSearch(event: Event): void {
    this.searchTermChange.emit((event.target as HTMLInputElement).value);
  }

  updateGroup(event: Event): void {
    this.selectedGroupChange.emit((event.target as HTMLSelectElement).value);
  }

  updateAvailability(event: Event): void {
    this.onlyAvailableChange.emit((event.target as HTMLInputElement).checked);
  }

  updateFeatured(event: Event): void {
    this.onlyFeaturedChange.emit((event.target as HTMLInputElement).checked);
  }
}
