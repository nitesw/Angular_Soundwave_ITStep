import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ITrack } from '../models/track';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TracksService } from '../services/tracks.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { RouterLink } from '@angular/router';

export interface DialogData {
  trackTitle: string;
  trackId: number;
}

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css',
})
export class TrackListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'image',
    'isPublic',
    'genreName',
    'actions',
  ];
  dataSource = new MatTableDataSource<ITrack>([]);

  constructor(
    private tracksService: TracksService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.tracksService.getAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  deleteTrack(id: number) {
    this.tracksService.deleteTrack(id);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDeleteDialog(title: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        trackTitle: title,
        trackId: id,
      },
    });

    dialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.tracksService.deleteTrack(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id !== id
          );
          this.openSnackBar();
        });
      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Track deleted successfuly', 'Dismiss', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
