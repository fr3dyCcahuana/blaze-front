import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { NgForm } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  order: Order;
  customer = 'Joe Smith';
  state = '';
  date = '';
  product :any;
  itemOrders: any = [];
  itemOrder: any;
  productsList: any = [];
  view = 0;
  productSelect :any;
  quantity = 0;
  i=0;
  idOrder = 0;
  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 

  }

  async ngOnInit() {
    await this.getProducts();
    this.activatedRoute.queryParams.subscribe(params => {
      this.idOrder = params['cod'];
      console.log(this.idOrder);
    });
    if(this.idOrder != 0){
      this.getOrderId(this.idOrder);
    }
  }

  completeOrder(){
    this.state="Completed";
    if(this.idOrder != 0){
      this.updatedOrder(this.idOrder);
    }else{
      this.createOrder();
    }

  }

  backOrder(){
    this.state="Pending";
    if(this.idOrder != 0){
      this.updatedOrder(this.idOrder);
    }else{
      this.createOrder();
    }
  }

  rejectOrder(){
    this.state="Rejected";
    if(this.idOrder != 0){
      this.updatedOrder(this.idOrder);
    }else{
      this.createOrder();
    }
  }
  
  createOrder(){
    this.ordersService.createOrder(this.state,this.customer,this.itemOrders)
    .subscribe(
      res => {
        this.productsList = res;
        console.log(this.productsList);
        this.router.navigate(['/orders']);
      },
      err => console.error(err)
    );
  }
  updatedOrder(id:number){
    this.ordersService.updatedOrder(id, this.state,this.customer,this.itemOrders)
    .subscribe(
      res => {
        this.productsList = res;
        console.log(this.productsList);
        this.router.navigate(['/orders']);
      },
      err => console.error(err)
    );
  }

  editProduct(id:number){
    this.view = this.view == 0 ? 1: 1;
    this.itemOrder= this.itemOrders.filter(function (item) { return item.id == id; });
    console.log(this.itemOrder);
    
    this.productSelect = this.itemOrder[0].product;
    console.log(this.productSelect);
    this.quantity = this.itemOrder[0].quantity;
  }

  deleteProduct(id:number){
    this.itemOrders = this.itemOrders.filter(e => e.id!==id);
  }

  addItemOrden(){
    console.log(this.quantity);
    console.log(this.product);
    this.itemOrders.push({
      quantity:this.quantity,
      product: this.product
    })
    this.view = this.view == 1 ? 0: 0;
  }

  viewForm(){
    this.view = this.view == 0 ? 1: 1;
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(
        res => {
          
          this.productsList = res;
          console.log(this.productsList);
        },
        err => console.error(err)
      );
  }

  selectProduct(){
  
    console.log(this.productSelect.name);
    this.product= {
      id: this.productSelect.id,
      name : this.productSelect.name,
      categorie: this.productSelect.categorie,
      unitPrice: this.productSelect.unitPrice,
      status: this.productSelect.status,
    };
  }

  getOrderId(id:number){
    this.ordersService.getOrderId(id)
      .subscribe(
        res => {
          console.log(res); 
          this.order = res;
          this.state = this.order.state;
          this.date = this.order.date;
          this.itemOrders = this.order.itemOrders;
        },
        err => console.error(err)
      );
  }
}
