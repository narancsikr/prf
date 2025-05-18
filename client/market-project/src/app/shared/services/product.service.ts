import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    return this.http.get<Product[]>('http://localhost:4000/app/getAllProducts', {withCredentials: true});
  }

   delete(id: string) {
    return this.http.delete('http://localhost:4000/app/deleteProduct?id=' + id, {withCredentials: true});
  }
}







