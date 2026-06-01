import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sticker } from '../../../../core/models/sticker.model';
import { StickersCatalogPageComponent } from './stickers-catalog-page.component';

describe('StickersCatalogPageComponent', () => {
  let fixture: ComponentFixture<StickersCatalogPageComponent>;
  let component: StickersCatalogPageComponent;
  let httpTesting: HttpTestingController;

  const stickers: Sticker[] = [
    {
      id_album: 1,
      sku: 'ARG1',
      nombre: 'Lionel Messi',
      precio: 500,
      disponible: 1,
      grupo: 'ARG',
      destacada: true,
      habilitado: true
    },
    {
      id_album: 1,
      sku: 'BRA1',
      nombre: 'Vinicius Junior',
      precio: 500,
      disponible: 0,
      grupo: 'BRA',
      destacada: false,
      habilitado: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickersCatalogPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(StickersCatalogPageComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    httpTesting.expectOne('/api/albums?id_album=1').flush({
      id_album: 1,
      descripcion: 'Mundial FIFA 2026',
      habilitado: true
    });
    httpTesting.expectOne('/api/stickers/groups').flush(['ARG', 'BRA']);
    httpTesting.expectOne('/api/stickers?id_album=1').flush(stickers);
  });

  afterEach(() => httpTesting.verify());

  it('filters stickers by partial SKU', () => {
    component.searchTerm.set('arg');

    expect(component.filteredStickers()).toEqual([stickers[0]]);
  });

  it('filters stickers by partial name', () => {
    component.searchTerm.set('vinicius');

    expect(component.filteredStickers()).toEqual([stickers[1]]);
  });

  it('filters unavailable stickers when requested', () => {
    component.onlyAvailable.set(true);

    expect(component.filteredStickers()).toEqual([stickers[0]]);
    expect(component.availableCount()).toBe(1);
  });

  it('filters stickers by group', () => {
    component.selectedGroup.set('BRA');

    expect(component.filteredStickers()).toEqual([stickers[1]]);
  });

  it('filters stickers that are not featured when requested', () => {
    component.onlyFeatured.set(true);

    expect(component.filteredStickers()).toEqual([stickers[0]]);
  });
});
