
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductFormComponent,
    AdminProductsComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ProductCardComponent,
  
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent ,canActivate: [AuthGuard]},
      { path: 'order-success', component: OrderSuccessComponent ,canActivate: [AuthGuard]},
      { path: 'my/orders', component: MyOrdersComponent ,canActivate: [AuthGuard]},

      { path: 'admin/products/new', 
        component: ProductFormComponent ,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/products/:id', 
        component: ProductFormComponent ,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/products', 
        component: AdminProductsComponent ,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/orders', 
        component: AdminOrdersComponent ,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ]),
     BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
