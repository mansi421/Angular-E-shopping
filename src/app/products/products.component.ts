import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  products: Product[] = [];
  category: string;
  filteredProducts: Product[] = [];
  subscription:Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) { 
    productService.getAll()
    .snapshotChanges()
      .pipe(map(actions => actions.map(action =>{
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as Product};
        return data;
      }))).pipe(switchMap(pr => {
        this.products = this.filteredProducts = pr;
        return route.queryParamMap;
      }))

        .subscribe(params => {
          this.category = params.get('category');
  
          this.filteredProducts = (this.category)?
           this.products.filter(p => p.category === this.category) :
           this.products;
           console.log(this.category);
           console.log(this.filteredProducts);
        });
  }
}
