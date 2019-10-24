import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(formValue) {
    this.http.post('http://localhost:8080/api/register', formValue)
      .subscribe({
        next: () => {
          this.router.navigate(['/user/list']);
        },
        error: error => {
          console.error(error);
        }
      });
  }
}
