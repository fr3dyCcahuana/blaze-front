import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  p = 1;
  //products: Product[] = [];
  products: any = [];
  
  constructor(
    private productsService: ProductsService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(
        res => {
          
          this.products = res;
          console.log(this.products);
        },
        err => console.error(err)
      );
  }

  editProduct(id:number){
    console.log(id);
    
    this.router.navigate(['/products/add'],{
      queryParams: {cod:id}
    });
  }
}
