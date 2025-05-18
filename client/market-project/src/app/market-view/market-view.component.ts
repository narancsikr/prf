import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../shared/model/Product';
import { ProductService } from '../shared/services/product.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-market-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './market-view.component.html',
  styleUrl: './market-view.component.scss'
})
export class MarketViewComponent {
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
}
