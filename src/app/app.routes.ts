import { Routes } from '@angular/router';
import { CartPageComponent } from './features/cart/pages/cart-page/cart-page.component';
import { HowToBuyPageComponent } from './features/how-to-buy/pages/how-to-buy-page/how-to-buy-page.component';
import { StickersCatalogPageComponent } from './features/stickers/pages/stickers-catalog-page/stickers-catalog-page.component';

export const routes: Routes = [
  { path: '', component: StickersCatalogPageComponent },
  { path: 'como-comprar', component: HowToBuyPageComponent },
  { path: 'carrito', component: CartPageComponent },
  { path: '**', redirectTo: '' }
];
