import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerUrlService {
  private serverUrl = 'https://localhost:7015';

  getServerUrl(): string {
    return this.serverUrl;
  }
  constructor() {}
}
