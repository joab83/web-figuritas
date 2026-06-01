import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/albums';

  getById(albumId: number): Observable<Album> {
    const params = new HttpParams().set('id_album', albumId);
    return this.http.get<Album>(this.endpoint, { params });
  }
}
