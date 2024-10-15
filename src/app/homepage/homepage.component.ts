import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TracksService } from '../services/tracks.service';
import { ITrack } from '../models/track';
import { ServerUrlService } from '../services/server-url.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  tracks: ITrack[] = [];

  constructor(
    private tracksService: TracksService,
    private serverService: ServerUrlService
  ) {}

  ngOnInit(): void {
    this.tracksService.getAll().subscribe((data) => (this.tracks = data));
  }

  getServerUrl(): string {
    return this.serverService.getServerUrl();
  }
}
