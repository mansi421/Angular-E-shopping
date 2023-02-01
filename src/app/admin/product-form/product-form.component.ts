import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product: any = {};
  id: string;
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges();
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)  { this.productService.get(this.id).pipe(take(1)).subscribe(p => {
        this.product = p.payload.val();
        console.log(this.id);
        console.log(this.product);
    }); }
   

    else {
      this.product = {
          title: '',
          price: '',
          category: '',
          imageUrl: ''
      }
    }

  }
  save(product: any){
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(!confirm ('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products'])
  }

  ngOnInit(): void {

  }

}
