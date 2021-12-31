import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: any = [];
  p = 1;
  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  editOrder(id:number){
    console.log(id);
    
    this.router.navigate(['/orders/add'],{
      queryParams: {cod:id}
    });
  }

  getOrders() {
    this.ordersService.getOrders()
      .subscribe(
        res => {
          
          this.orders = res;
          console.log(this.orders);
        },
        err => console.error(err)
      );
  }
}
