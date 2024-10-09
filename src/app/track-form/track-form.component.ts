import { Component } from '@angular/core';
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
export class TrackFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      trackUrl: ['', Validators.required],
      imgUrl: ['', Validators.required],
      isPublic: [false, Validators.required],
      isArchived: [false],
      description: ['', Validators.maxLength(1000)],
      additionalTags: ['', Validators.maxLength(40)],
      artistName: ['', Validators.maxLength(20)],
      genreId: [0, Validators.required],
      userId: [''],
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
