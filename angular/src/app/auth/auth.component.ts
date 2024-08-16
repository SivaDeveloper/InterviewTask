import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username = '';
  password = '';
  link = '';
  token = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post<{ token: string }>('http://localhost:3000/auth/login', { username: this.username, password: this.password })
      .subscribe(
        response => this.token = response.token,
        error => console.error('Login error', error)
      );
  }

  generateOneTimeLink() {
    this.http.post<{ link: string }>('http://localhost:3000/auth/one-time-link', { username: this.username })
      .subscribe(
        response => this.link = response.link,
        error => console.error('Error generating link', error)
      );
  }
}
