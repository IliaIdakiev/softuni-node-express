import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(formValue) {
    this.http.post('http://localhost:8080/api/login', formValue, { withCredentials: true })
      .subscribe({
        next: () => this.router.navigate(['/'])
      });
  }
}
