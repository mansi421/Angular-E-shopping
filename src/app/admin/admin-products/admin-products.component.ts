import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription:Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .snapshotChanges()
      .pipe(map(actions => actions.map(action =>{
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as Product};
        return data;
      }))).subscribe(pr => this.products = this.filteredProducts = pr);
   }
 

   filter(query: string){
    this.filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
    this.products;
   }

   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }
  ngOnInit(): void {
  }

}
