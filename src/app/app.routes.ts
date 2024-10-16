import { Routes } from '@angular/router';
import { TrackListComponent } from './track-list/track-list.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { TrackFormComponent } from './track-form/track-form.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'tracks', component: TrackListComponent },
  { path: 'tracks/create', component: TrackFormComponent },
  { path: 'tracks/edit/:id', component: TrackFormComponent },
  { path: 'playlists', component: PlaylistListComponent },
];
