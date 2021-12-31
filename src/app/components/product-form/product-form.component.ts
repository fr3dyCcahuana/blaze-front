import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  exform: FormGroup;
  product: Product;
  status1 = false;
  idProduct = 0;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.exform = new FormGroup({
      name : new FormControl(null, Validators.required),
      categorie : new FormControl(null, Validators.required),
      unitPrice : new FormControl(null, Validators.required),
      status : new FormControl(null, Validators.required),
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.idProduct = params['cod'];
      console.log(this.idProduct);
    });
    if(this.idProduct != 0){
      this.getProductId(this.idProduct);
    }
  }

  clicksub() {

    
    this.status1 = this.status.value == '1' ? true: false;
    let myNumber : number = + this.exform.value.unitPrice;
    if(this.idProduct != 0){
      this.updatedProduct(this.idProduct);
    }else{
      this.createProduct();
    }
    
    this.exform.reset();
  }

  get name() {
    return this.exform.get('name');
  }
  get categorie() {
    return this.exform.get('categorie');
  }
  get unitPrice() {
    return this.exform.get('unitPrice');
  }
  get status() {
    return this.exform.get('status');
  }

  createProduct(){
    this.productsService.createProduct(this.name.value, this.categorie.value, this.unitPrice.value, this.status1)
      .subscribe(
        res => {
          
          this.product = res;
          console.log(this.product);
        },
        err => console.error(err)
      );
  }

  getProductId(id:number){
    this.productsService.getProductId(id)
      .subscribe(
        res => {
          this.product = res;
          console.log(this.product);
          this.name.setValue(this.product.name);
          this.categorie.setValue(this.product.categorie);
          this.unitPrice.setValue(this.product.unitPrice);
          this.status.setValue(this.product.status== true? 1:0);
        },
        err => console.error(err)
      );
  }

  updatedProduct(id:number) {
    this.productsService.updateProduct(id,this.name.value, this.categorie.value, this.unitPrice.value, this.status1)
      .subscribe(
        res => {
          
          this.product = res;
          this.router.navigate(['/products']);
        },
        err => console.error(err)
      );
  }
}
