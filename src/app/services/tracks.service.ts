import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITrack } from '../tracks/track';

const api = 'https://localhost:7015/api/';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  controller: string = api + 'music/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ITrack[]> {
    return this.httpClient.get<ITrack[]>(this.controller + 'all');
  }
  getId(id: number): Observable<ITrack> {
    return this.httpClient.get<ITrack>(this.controller + 'getTrack?id=' + id);
  }
  deleteTrack(id: number): Observable<any> {
    return this.httpClient.delete(this.controller + 'delete?id=' + id);
  }
}
