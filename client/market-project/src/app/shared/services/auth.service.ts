import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // login
  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
    //body.set('role', role);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:4000/app/login', body, {headers: headers, withCredentials: true});
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('role', user.role);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:4000/app/register', body, {headers: headers});
  }

  regprod(product: Product) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', product.name);
    body.set('description', product.description);
    body.set('price', product.price);
    body.set('producerId', product.producerId);
    //body.set('role', user.role);
    //body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:4000/app/regprod', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:4000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:4000/app/checkAuth', {withCredentials: true});
  }
}
