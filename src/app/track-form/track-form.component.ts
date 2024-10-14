import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TracksService } from '../services/tracks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTrackModel } from '../models/track';
import { GenreModel } from '../models/genre';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css',
})
export class TrackFormComponent implements OnInit {
  form: FormGroup;
  genres: GenreModel[] = [];
  selectedImageName: string = 'No image selected...';
  selectedTrackName: string = 'No track selected...';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private tracksService: TracksService
  ) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      track: [null, Validators.required],
      image: [null, Validators.required],
      isPublic: [false, Validators.required],
      isArchived: [false],
      description: ['', Validators.maxLength(1000)],
      additionalTags: ['', Validators.maxLength(40)],
      artistName: ['', Validators.maxLength(20)],
      genreId: [0, Validators.required],
      userId: [''],
    });
    this.form.controls['genreId'].setValue('1');
  }

  ngOnInit(): void {
    this.tracksService.getGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  back() {
    history.back();
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onImagePicked(event: Event) {
    const target = event.target as HTMLInputElement | null;

    if (target && target.files) {
      const file = target.files[0];
      this.selectedImageName = file.name;
      this.form.patchValue({ image: file });
    }
  }
  onTrackPicked(event: Event) {
    const target = event.target as HTMLInputElement | null;

    if (target && target.files) {
      const file = target.files[0];
      this.selectedTrackName = file.name;
      this.form.patchValue({ track: file });
    }
  }

  submit() {
    if (!this.form.valid) {
      this.openSnackBar('Invalid data.');
      return;
    }

    const entity = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      const value = this.form.get(key)?.value;
      entity.append(key, value);
    });

    if (this.form.get('image')?.value) {
      entity.append('image', this.form.get('image')?.value);
    }
    if (this.form.get('track')?.value) {
      entity.append('track', this.form.get('track')?.value);
    }

    this.tracksService.create(entity).subscribe(() => {
      this.openSnackBar('Track is created successfully.');
      this.back();
    });
  }
}
