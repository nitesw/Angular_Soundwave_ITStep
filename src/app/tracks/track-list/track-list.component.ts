import { Component } from '@angular/core';
import { ITrack } from '../track';
import { MatTableModule } from '@angular/material/table';
import { TracksService } from '../../services/tracks.service';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css',
})
export class TrackListComponent {
  displayedColumns: string[] = ['id', 'title', 'isPublic', 'genreId'];
  dataSource: ITrack[] = [];

  constructor(private tracksService: TracksService) {
    this.tracksService.getAll().subscribe((data) => {
      this.dataSource = data;
    });
  }

  deleteTrack(id: number) {
    this.tracksService.deleteTrack(id);
  }
}
