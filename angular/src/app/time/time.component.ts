import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  token = '';
  currentTime = '';

  constructor(private http: HttpClient) {}

  getTime() {
    this.http.get<{ currentTime: string }>('http://localhost:3000/time', {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    .subscribe(
      response => this.currentTime = response.currentTime,
      error => console.error('Error fetching time', error)
    );
  }
}
