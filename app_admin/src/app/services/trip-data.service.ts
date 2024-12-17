import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/AuthResponse';
import { BROWSER_STORAGE } from '../storage';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    
    const token = this.storage.getItem('auth-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Trip>(this.tripUrl, formData, { headers });
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const token = this.storage.getItem('auth-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData, { headers });
  }
  

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd).pipe(
      tap((response: AuthResponse) => {
        if (response.token) {
          this.storage.setItem('auth-token', response.token);
        } else {
          console.error('No token in login response'); // Error log
        }
      })
    );
  }
  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }
  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string):
    Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.apiBaseUrl + '/' + endpoint,
      formData);
  }
}
