import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URI = 'https://blaze-back.herokuapp.com';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${this.API_URI}/orders`);
  }

  getOrderId(id:number) {
    return this.http.get(`${this.API_URI}/orders/${id}`);
  }

  createOrder(state, customer, itemOrders){
    let myNumber : number = 112.2;
    return this.http.post(`${this.API_URI}/orders`, {state, customer, itemOrders});
  }

  updatedOrder(id,state, customer, itemOrders){
    let myNumber : number = 112.2;
    return this.http.post(`${this.API_URI}/orders`, {id,state, customer, itemOrders});
  }

}
