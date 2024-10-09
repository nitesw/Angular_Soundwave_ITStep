import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ViewChild,
} from '@angular/core';
import { ITrack } from '../track';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TracksService } from '../../services/tracks.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  trackTitle: string;
  trackId: number;
}

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css',
})
export class TrackListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'title',
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
    const dialogRef = this.dialog.open(ConfirmDialog, {
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
@Component({
  selector: 'confirm-dialog',
  templateUrl: './delete-confirm-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatPaginatorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly id = model(this.data.trackId);
}
