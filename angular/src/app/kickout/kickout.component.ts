import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kickout',
  templateUrl: './kickout.component.html',
  styleUrls: ['./kickout.component.css']
})
export class KickoutComponent {
  username = '';

  constructor(private http: HttpClient) {}

  kickout() {
    this.http.post('http://localhost:3000/kickout', { username: this.username })
      .subscribe(
        response => console.log('User kicked out successfully', response),
        error => console.error('Error kicking out user', error)
      );
  }
}
