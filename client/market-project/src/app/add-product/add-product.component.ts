
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
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      
      name: [''],
      description: [''],
      price: [''],
      producerId: [localStorage.getItem('userId') || ''] // Bejelentkezett user ID-ja
     
      
    })
   
  }

  onSub() {
    if (this.productForm.valid) {
      console.log('Form data:', this.productForm.value);

      this.authService.regprod(this.productForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/product-management');
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  goBack() {
    this.location.back();
  }

}