import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = 'https://blaze-back.herokuapp.com';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}/products`);
  }

  getProductId(id:number) {
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  createProduct(name, categorie, unitPrice, status1){
    let myNumber : number = 112.2;
    return this.http.post(`${this.API_URI}/products`, {name, categorie, unitPrice, status1});
  }

  updateProduct(id,name, categorie, unitPrice, status1){
    let myNumber : number = 112.2;
    return this.http.post(`${this.API_URI}/products`, {id, name, categorie, unitPrice, status1});
  }
}
