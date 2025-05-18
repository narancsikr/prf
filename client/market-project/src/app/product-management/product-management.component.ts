import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../shared/model/Product';
import { ProductService } from '../shared/services/product.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.products = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    
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

  deleteProduct(id: string) {
      

       this.productService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
             
              this.products = [...this.products];
              console.log('Product deleted successfully.');
              this.router.navigateByUrl('/add-product');
            
            }, error: (err) => {
              console.log(err);
            }
          });

  }
}

