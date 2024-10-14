import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateTrackModel, ITrack } from '../models/track';
import { GenreModel } from '../models/genre';

const api = 'https://localhost:7015/api/';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  controller: string = api + 'music/';

  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<GenreModel[]> {
    return this.httpClient.get<GenreModel[]>(this.controller + 'genres');
  }
  getAll(): Observable<ITrack[]> {
    return this.httpClient.get<ITrack[]>(this.controller + 'all');
  }
  getById(id: number): Observable<ITrack> {
    return this.httpClient.get<ITrack>(this.controller + 'getTrack?id=' + id);
  }
  deleteTrack(id: number): Observable<any> {
    return this.httpClient.delete(this.controller + 'delete?id=' + id);
  }
  create(model: FormData): Observable<any> {
    return this.httpClient.post(this.controller + 'create', model);
  }
  edit(model: FormData): Observable<any> {
    return this.httpClient.put(this.controller + 'edit', model);
  }
}
