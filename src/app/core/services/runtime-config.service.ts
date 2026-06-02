import { Injectable } from '@angular/core';

declare global {
  interface Window {
    __APP_CONFIG__?: {
      whatsappPhone?: string;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private readonly defaultWhatsappPhone = '5493412018766';

  get whatsappPhone(): string {
    return window.__APP_CONFIG__?.whatsappPhone?.trim() || this.defaultWhatsappPhone;
  }

  getWhatsappUrl(message: string): string {
    return `https://api.whatsapp.com/send/?phone=${this.whatsappPhone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
  }
}
