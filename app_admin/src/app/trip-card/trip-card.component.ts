import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(Trip: Trip) {
    localStorage.removeItem('code');
    localStorage.setItem('code', this.trip.code);
    this.router.navigate(['edit-trip']);
  }
}
