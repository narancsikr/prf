import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoginResponse } from '../shared/model/login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    if (this.email && this.password) {
      this.errorMessage = '';
      this.authService.login(this.email, this.password).subscribe({
        next: (data: any) => {
          if (data) {
            // navigation
            console.log(data);
            console.log('API válasz:', data._id);
            localStorage.setItem('userId', data._id);
            console.log('Felhasználó szerepköre:', data.role);
            localStorage.setItem('userRole', data.role); 
            /*
            if (data && data.user) {
            localStorage.setItem('userId', data.user._id);
            }
            console.log('Ez az adat jelenik meg');
            */
           // this.router.navigateByUrl('/user-management');
            if (data.role === 'producer'){
            this.router.navigateByUrl('/add-product');
            } else if (data.role === 'buyer') {
              this.router.navigateByUrl('/market');
            }
          }
        }, error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.errorMessage = 'Form is empty.';
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
