import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITrack } from '../tracks/track';

const api = 'https://localhost:7015/api/';
const musicController = 'Music/';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ITrack[]> {
    return this.httpClient.get<ITrack[]>(api + musicController + 'all');
  }
  deleteTrack(id: number): void {
    this.httpClient.delete<number>(api + musicController + 'delete/' + id);
  }
}
