import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      address: [''],
      nickname: [''],
      role: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);

      this.authService.register(this.signupForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/login');
        
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  goBack() {
    this.location.back();
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
