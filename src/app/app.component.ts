import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrackListComponent } from './tracks/track-list/track-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrackListComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular_Soundwave_ITStep';
}
