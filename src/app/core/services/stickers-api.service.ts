import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sticker } from '../models/sticker.model';

@Injectable({ providedIn: 'root' })
export class StickersApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/stickers';

  getByAlbum(albumId: number): Observable<Sticker[]> {
    const params = new HttpParams().set('id_album', albumId);
    return this.http.get<Sticker[]>(this.endpoint, { params });
  }

  getGroups(): Observable<string[]> {
    return this.http.get<string[]>(`${this.endpoint}/groups`);
  }
}
